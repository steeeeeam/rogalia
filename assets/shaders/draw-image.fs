precision mediump float;

varying vec2 v_texcoord;
varying vec2 v_position;

uniform sampler2D u_texture;
uniform sampler2D u_minimap;

uniform mat4 u_matrix;

void main() {
    vec4 biom = texture2D(u_minimap, v_texcoord);
    float k = 4100.0; // 2898 size rotate 45
    vec2 p = vec2(v_position.x * k, v_position.y * k);
    p.x = mod(p.x, 64.0)/129.0;
    p.y = mod(p.y, 64.0)/129.0;
    if (abs(biom.r - 0.25) < 0.01) {
        gl_FragColor = texture2D(u_texture, p);
    } else if (abs(biom.r - 0.87) < 0.01) {
        p.y += 0.5;
        gl_FragColor = texture2D(u_texture, p);
    } else if (abs(biom.r - 0.83) < 0.01) {
        p.x += 0.5;
        gl_FragColor = texture2D(u_texture, p);
    } else if (abs(biom.r - 0.14) < 0.01) {
        p.x += 0.5;
        p.y += 0.5;
        gl_FragColor = texture2D(u_texture, p);
    } else {
        gl_FragColor = biom;
    }
}
