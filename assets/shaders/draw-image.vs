precision mediump float;

attribute vec4 a_position;
attribute vec2 a_texcoord;

uniform mat4 u_matrix;
uniform mat4 u_textureMatrix;

varying vec2 v_texcoord;

void main() {
    gl_Position = u_matrix * a_position;
    //v_texcoord = vec2(gl_Position.x+0.5, gl_Position.y);
    v_texcoord = vec2(a_position.x/2.0, a_position.y);
    //v_texcoord = (u_matrix * u_textureMatrix * vec4(a_texcoord, 0, 1)).xy;
}
