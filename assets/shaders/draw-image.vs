precision mediump float;

attribute vec4 a_position;

uniform mat4 u_matrix;

varying vec2 v_position;

void main() {
    gl_Position = u_matrix * a_position;
    v_position = a_position.xy;
}
