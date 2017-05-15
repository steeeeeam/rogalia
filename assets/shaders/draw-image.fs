precision mediump float;

varying vec2 v_texcoord;

uniform sampler2D u_texture;
uniform sampler2D u_minimap;

void main() {
    // vec2 p = vec2(mod(v_texcoord.x, 64.0)/64.0, mod(v_texcoord.y, 64.0)/64.0);
    vec4 biom = texture2D(u_minimap, v_texcoord);
    vec2 p = v_texcoord;
    gl_FragColor = biom;
    // if (biom.x > 0.0) {
    //     // p.x += 0.5;
    //     gl_FragColor = biom;
    // } else {
    //     gl_FragColor = texture2D(u_texture, p);
    // }
    // if (v_texcoord.x > 0.1 && v_texcoord.y > 0.1) {
    //     gl_FragColor = vec4(0.9, 0.4, 0.1, 1);
    // } else {
    //     gl_FragColor = vec4(0.1, 0.4, 0.8, 1);
    // }
}
