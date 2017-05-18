/* global fetch, m4, game, CELL_SIZE, Point, Image */

"use strict";

class WebglRenderer {
    constructor() {
        this.loaded = false;
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl");
        this._loaded = false;
    }

    async load(canvas) {
        const {gl} = this;

        const vs = await this.loadShader("draw-image.vs");
        const fs = await this.loadShader("draw-image.fs");

        const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vs);
        const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fs);

        const program = this.createProgram(gl, vertexShader, fragmentShader);
        this.program = program;

        this.positionLocation = gl.getAttribLocation(program, "a_position");
        this.matrixLocation = gl.getUniformLocation(program, "u_matrix");
        this.textureLocation = gl.getUniformLocation(program, "u_texture");
        this.minimapLocation = gl.getUniformLocation(program, "u_minimap");
        this.locationLocation = gl.getUniformLocation(program, "u_location");

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                0, 0,
                0, 1,
                1, 0,
                1, 0,
                0, 1,
                1, 1,
            ]),
            gl.STATIC_DRAW
        );

        this.mapTexture = await this.loadImageAndCreateTexture("assets/map/map.png");

        const tex = gl.createTexture();
        this.minimapTexture = tex;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, game.map.minimapCanvas);
    }

    async sync(canvas) {
        const {gl} = this;
        if (this._loaded) {
            this.updateMinimap(canvas);
        } else {
            this._loaded = true;
            this.load(canvas);
        }

    }

    updateMinimap(canvas) {
        const {gl} = this;
        gl.bindTexture(gl.TEXTURE_2D, this.minimapTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    }

    async loadImageAndCreateTexture(url) {
        const {gl} = this;
        return new Promise((resolve, reject) => {
            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            const img = new Image();
            img.onload = () => {
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                resolve(tex);
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    async loadShader(name, dir = "assets/shaders/") {
        return fetch(dir + name).then(res => res.text());
    }

    createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    };


    createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }

        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    updateMap() {
    }

    drawMap() {
        const {gl} = this;
        if (!this.mapTexture) {
            return;
        }
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.program);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.positionLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);

        var matrix = m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);
        const size = 2896.309375740099; //new Point(64*64).rotate(Math.PI/4);
        const loc = game.map.location;
        const p = loc.clone().toScreen();
        matrix = m4.translate(
            matrix,
            p.x - game.camera.x,
            p.y - game.camera.y,
            0
        );
        matrix = m4.scale(matrix, size, size/2, 1);
        matrix = m4.zRotate(matrix, Math.PI/4);
        gl.uniformMatrix4fv(this.matrixLocation, false, matrix);

        const texWidth = 128;
        const texHeight = 128;
        var texMatrix = m4.translation(0 / texWidth, 0 / texHeight, 0);
        texMatrix = m4.scale(texMatrix, size / texWidth, size / texHeight, 1);
        gl.uniformMatrix4fv(this.textureMatrixLocation, false, texMatrix);

        gl.uniform2fv(this.locationLocation, [loc.x/CELL_SIZE, loc.y/CELL_SIZE]);


        gl.uniform1i(this.textureLocation, 0);
        gl.uniform1i(this.minimapLocation, 1);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.mapTexture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.minimapTexture);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

}
