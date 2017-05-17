precision mediump float;

varying vec2 v_position;

uniform sampler2D u_texture;
uniform sampler2D u_minimap;
uniform vec2 u_location;

const float tile_size = 64.0;
const float map_size = 4096.0; // 64 * 64

const float map_tex_width = 512.0;
const float map_tex_height = 1536.0 + 0.0;

float tex_map_coord(float coord, float size) {
    float fix = size / tile_size;
    return ceil(mod(coord * map_size, tile_size))/(size + fix);
}

vec2 tex_map_point(vec2 pos) {
    return vec2(tex_map_coord(pos.x, map_tex_width), tex_map_coord(pos.y, map_tex_height));
}

float tex_map_offset(float index) {
    return index*tile_size/map_tex_height;
}

float tex_map_variant(vec2 position, float variants) {
    vec2 p = floor(position*map_size / tile_size) + u_location;
    float total_variants_num = (map_tex_width / tile_size);
    float rand = (1.0 + sin(p.x * p.y)) / 2.0; // [0 .. 1]
    return floor(rand * (variants)) / total_variants_num;
}

void main() {
    vec2 texcoord = vec2(v_position.x/2.0, v_position.y);
    vec4 biom = texture2D(u_minimap, texcoord);
    vec2 p = tex_map_point(v_position);

    int red = int(biom.r * 256.0);
    int blue = int(biom.b * 256.0);

    if (red == 32) {
        // deep water
    } else if (red == 36) {
        // shallow-water
        p.y += tex_map_offset(1.0);
    } else if (red == 221) {
        // sand
        p.y += tex_map_offset(2.0);
    } else if (red == 211) {
        // soil
        p.y += tex_map_offset(3.0);
        p.x += tex_map_variant(v_position, 1.0);
    } else if (red == 65) {
        // grass
        p.y += tex_map_offset(4.0);
        p.x += tex_map_variant(v_position, 2.0);
    } else if (red == 13) {
        // leaf forest
        p.y += tex_map_offset(5.0);
    } else if (red == 23) {
        // pine forest
        p.y += tex_map_offset(6.0);
    } else if (red == 226) {
        // rock
        p.y += tex_map_offset(7.0);
    } else if (red == 210) {
        // plowed soil
        p.y += tex_map_offset(8.0);
    } else if (red == 28 && blue == 0) {
        // white stone floor
        p.y += tex_map_offset(9.0);
    } else if (red == 28 && blue == 1) {
        // painter floor
        p.y += tex_map_offset(10.0);
    } else if (red == 28 && blue == 2) {
        // wooden floor
        p.y += tex_map_offset(11.0);
    } else if (red == 28 && blue == 3) {
        // imperial floor
        p.y += tex_map_offset(12.0);
    } else if (red == 28 && blue == 4) {
        // brick floor
        p.y += tex_map_offset(13.0);
    } else if (red == 28 && blue == 5) {
        // parquet floor
        p.y += tex_map_offset(14.0);
    } else if (red == 28 && blue == 6) {
        // pavement floor
        p.y += tex_map_offset(15.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 28 && blue == 7) {
        // tile floor
        p.y += tex_map_offset(16.0);
    } else if (red == 28 && blue == 37) {
        // stone tiles
        p.y += tex_map_offset(17.0);
    } else if (red == 119) {
        // light stone tiles
        p.y += tex_map_offset(18.0);
    } else if (red == 192) {
        // red stone tiles
        p.y += tex_map_offset(19.0);
    } else if (red == 17) {
        // ground
        p.y += tex_map_offset(20.0);
    } else if (red == 0 && blue == 0) {
        // solid ground
        p.y += tex_map_offset(21.0);
    } else if (red == 0 && blue == 1) {
        // space
        p.y += tex_map_offset(22.0);
    } else {
        // must not be here
        gl_FragColor = biom;
        return;
    }
    gl_FragColor = texture2D(u_texture, p);
}
