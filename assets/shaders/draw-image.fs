precision mediump float;

varying vec2 v_position;

uniform sampler2D u_texture;
uniform sampler2D u_minimap;
uniform vec2 u_location;

const float tile_size = 64.0;
const float map_size = 4096.0; // 64 * 64
const float map_tex_size = 258.0; // why 256 + 2?

float tex_map_coord(float coord) {
    return ceil(mod(coord * map_size, tile_size))/map_tex_size;
}

vec2 tex_map_point(vec2 pos) {
    return vec2(tex_map_coord(pos.x), tex_map_coord(pos.y));
}

void main() {
    vec2 texcoord = vec2(v_position.x/2.0, v_position.y);
    vec4 biom = texture2D(u_minimap, texcoord);
    vec2 p = tex_map_point(v_position);

    if (abs(biom.r - 0.25) < 0.01) {
        gl_FragColor = texture2D(u_texture, p); // grass
    } else if (abs(biom.r - 0.87) < 0.01) {
        p.y += 0.25;
        gl_FragColor = texture2D(u_texture, p); // sand
    } else if (abs(biom.r - 0.83) < 0.01) {
        vec2 q = v_position*map_size + u_location;
        q.x = floor(q.x/64.0);
        q.y = floor(q.y/64.0);
        if (sin(q.x * q.y) > 0.0) {
            p.x += 0.5;
        }
        p.x += 0.25;
        gl_FragColor = texture2D(u_texture, p); // soil
    } else if (abs(biom.r - 0.14) < 0.01) {
        p.x += 0.25;
        p.y += 0.25;
        gl_FragColor = texture2D(u_texture, p); // shallow-water
    } else {
        gl_FragColor = biom;
    }
}
