/* global fetch, m4, game, CELL_SIZE, Point */

"use strict";

class WebglRenderer {
    constructor() {
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl");
    }

    async load(gl) {
        const vs = await this.loadShader("draw-image.vs");
        const fs = await this.loadShader("draw-image.fs");

        const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vs);
        const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fs);

        const program = this.createProgram(gl, vertexShader, fragmentShader);
        this.program = program;

        this.positionLocation = gl.getAttribLocation(program, "a_position");
        this.texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

        this.matrixLocation = gl.getUniformLocation(program, "u_matrix");
        // this.textureMatrixLocation = gl.getUniformLocation(program, "u_textureMatrix");
        this.textureLocation = gl.getUniformLocation(program, "u_texture");
        this.minimapLocation = gl.getUniformLocation(program, "u_minimap");

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        // Put a unit quad in the buffer
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

        this.texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);

        // Put texcoords in the buffer
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

        this.textureInfos = [
            await this.loadImageAndCreateTextureInfo("assets/map/map.png"),
        ];

        const tex = gl.createTexture();
        this.minimapTex = tex;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        // let's assume all images are not a power of 2
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, game.map.minimapCanvas);

    }

    async loadImageAndCreateTextureInfo(url) {
        const {gl} = this;
        return new Promise((resolve, reject) => {
            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            // let's assume all images are not a power of 2
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            const img = new Image();
            img.onload = function() {
                const textureInfo = {
                    width: img.width,
                    height: img.height,
                    texture: tex,
                };
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                resolve(textureInfo);
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
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }

        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    initTiles(tiles) {
        // tiles.forEach((tile) => {
        //     var offset = (tile.height > CELL_SIZE) ? 15 : 0;
        //     this.tiles[tile.alt] = _.range(tile.width / (2*CELL_SIZE)).map(function(x) {
        //         return [
        //             x * 2*CELL_SIZE,
        //             offset * CELL_SIZE,
        //             2*CELL_SIZE,
        //             CELL_SIZE
        //         ];
        //     });
        // });
    }

    updateMap() {
    }

    drawMap() {
        const {gl} = this;
        if (!this.textureInfos) {
            return;
        }
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.program);

        // Tell WebGL to use our shader program pair
        gl.useProgram(this.program);

        // Setup the attributes to pull data from our buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(this.positionLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        gl.enableVertexAttribArray(this.texcoordLocation);
        gl.vertexAttribPointer(this.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

        // this matirx will convert from pixels to clip space
        var matrix = m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);

        // this matrix will translate our quad to dstX, dstY
        // matrix = m4.translate(matrix, dstX, dstY, 0);
        // const size = 1.5*game.map.width;
        const size = 2898;
        const p = new Point(game.map.location).toScreen();
        matrix = m4.translate(
            matrix,
            p.x - game.camera.x,
            p.y - game.camera.y,
            0
        );

        // this matrix will scale our 1 unit quad
        // from 1 unit to texWidth, texHeight units
        // matrix = m4.scale(matrix, dstWidth, dstHeight, 1);
        //matrix = m4.scale(matrix, gl.canvas.width, gl.canvas.height, 1);
        matrix = m4.scale(matrix, size, size, 1);

        // Set the matrix.
        // let matrix = m4.identity();
        matrix = m4.scale(matrix, 1, 0.5, 1);
        matrix = m4.zRotate(matrix, Math.PI/4);
        // matrix = m4.translate(matrix, -0.5, -0.5, 0);
        gl.uniformMatrix4fv(this.matrixLocation, false, matrix);

        // Because texture coordinates go from 0 to 1
        // and because our texture coordinates are already a unit quad
        // we can select an area of the texture by scaling the unit quad
        // down
        const texWidth = 128;
        const texHeight = 128;
        var texMatrix = m4.translation(0 / texWidth, 0 / texHeight, 0);
        texMatrix = m4.scale(texMatrix, size / texWidth, size / texHeight, 1);
        // var texMatrix = m4.translation(0, 0, 0);

        // Set the texture matrix.
        gl.uniformMatrix4fv(this.textureMatrixLocation, false, texMatrix);

        // Tell the shader to get the texture from texture unit 0
        gl.uniform1i(this.textureLocation, 0);
        gl.uniform1i(this.minimapLocation, 1);

        // Set each texture unit to use a particular texture.
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.textureInfos[0].texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.minimapTex);

        // draw the quad (2 triangles, 6 vertices)
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    drawImage(
        tex,
        texWidth,
        texHeight,
        srcX = 0,
        srcY = 0,
        srcWidth = texWidth,
        srcHeight = texHeight,
        dstX = srcX,
        dstY = srcY,
        dstWidth = srcWidth,
        dstHeight = srcHeight
    ) {

    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

}
