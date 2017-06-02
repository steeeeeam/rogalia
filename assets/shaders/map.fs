precision mediump float;

varying vec2 v_position;

uniform sampler2D u_texture;
uniform sampler2D u_minimap;
uniform sampler2D u_transitions;
uniform vec2 u_location;

const float tile_size = 64.0;
const float map_size = 4096.0; // 64 * 64

const float map_tex_width = 512.0;
const float map_tex_height = 1536.0;

const float transition_tile_size = 128.0;
const float transitions_size = 640.0;
const float transitions_width = 3.0 * transitions_size;
const float transitions_height = transitions_size;

const ivec2 grass = ivec2(65, 0);
const ivec2 sand = ivec2(221, 0);
const ivec2 soil = ivec2(211, 0);

const int bioms_num = 3;
ivec2 bioms[bioms_num];

void init_bioms() {
    bioms[0] = grass;
    bioms[1] = sand;
    bioms[2] = soil;
}


float tex_map_coord(float coord, float size) {
    float fix = size / tile_size;
    return ceil(mod(coord * map_size, tile_size))/(size + fix);
}

vec2 tex_map_point(vec2 pos) {
    return vec2(tex_map_coord(pos.x, map_tex_width), tex_map_coord(pos.y, map_tex_height));
}

vec2 tex_map_point_in_tile(vec2 pos) {
    vec2 p = tex_map_point(pos) * vec2(map_tex_width, map_tex_height);
    p.x = mod(p.x, tile_size);
    p.y = mod(p.y, tile_size);
    return p;
}

float tex_map_offset(float index) {
    return index*tile_size/map_tex_height;
}

float tex_map_variant(vec2 position, float variants) {
    vec2 p = floor(position*map_size / tile_size) + u_location;
    const float total_variants_num = (map_tex_width / tile_size);
    float rand = (1.0 + sin(p.x * p.y)) / 2.0; // [0 .. 1]
    // min() is a hack for mac/win
    return min(variants - 1.0, floor(rand * variants)) / total_variants_num;
}

vec4 biom_color(vec4 biom, vec2 p) {
    int red = int(biom.r * 256.0);
    int blue = int(biom.b * 256.0);

    if (red == 32) {
        // deep water
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == 36) {
        // shallow-water
        p.y += tex_map_offset(1.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == sand.r) {
        // sand
        p.y += tex_map_offset(2.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == soil.r) {
        // soil
        p.y += tex_map_offset(3.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == grass.r) {
        // grass
        p.y += tex_map_offset(4.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == 13) {
        // leaf forest
        p.y += tex_map_offset(5.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == 23) {
        // pine forest
        p.y += tex_map_offset(6.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == 226) {
        // rock
        p.y += tex_map_offset(7.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == 210) {
        // plowed soil
        p.y += tex_map_offset(8.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == 28 && blue == 0) {
        // white stone floor
        p.y += tex_map_offset(9.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 28 && blue == 1) {
        // painter floor
        p.y += tex_map_offset(10.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 28 && blue == 2) {
        // wooden floor
        p.y += tex_map_offset(11.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 28 && blue == 3) {
        // imperial floor
        p.y += tex_map_offset(12.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 28 && blue == 4) {
        // brick floor
        p.y += tex_map_offset(13.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 28 && blue == 5) {
        // parquet floor
        p.y += tex_map_offset(14.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 28 && blue == 6) {
        // pavement floor
        p.y += tex_map_offset(15.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 28 && blue == 7) {
        // tile floor
        p.y += tex_map_offset(16.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 28 && blue == 37) {
        // stone tiles
        p.y += tex_map_offset(17.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 119) {
        // light stone tiles
        p.y += tex_map_offset(18.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 192) {
        // red stone tiles
        p.y += tex_map_offset(19.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == 17) {
        // ground
        p.y += tex_map_offset(20.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == 0 && blue == 0) {
        // solid ground
        p.y += tex_map_offset(21.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == 0 && blue == 1) {
        // space
        p.y += tex_map_offset(22.0);
    } else {
        // must not be here
        return biom;
    }

    return texture2D(u_texture, p);
}

vec4 blend(vec4 background, vec4 foreground) {
    return (foreground.rgba * foreground.a) + background.rgba * (1.0 - foreground.a);
}

vec4 neighbor_biom(vec2 pos, float dx, float dy) {
    pos.x += tile_size/map_size * dx;
    pos.y += tile_size/map_size * dy;
    return texture2D(u_minimap, pos);
}

bool transition_same_neighbor(ivec2 ibiom, vec2 pos, float dx, float dy) {
    vec4 transition_biom = neighbor_biom(pos, dx, dy);
    return int(transition_biom.r * 256.0) == ibiom.r;
}

vec2 top_left_variant(int neighbors) {
    vec2 variant;
    if (neighbors == 110) {
        variant = vec2(2.0, 2.0);
    } else if (neighbors == 100) {
        variant = vec2(0.0, 2.0);
    } else if (neighbors == 0) {
        variant = vec2(1.0, 0.0);
    } else if (neighbors == 10) {
        variant = vec2(3.0, 3.0);
    } else if (neighbors == 101) {
        variant = vec2(1.0, 2.0);
    } else if (neighbors == 1) {
        variant = vec2(1.0, 1.0);
    } else if (neighbors == 11) {
        variant = vec2(1.0, 3.0);
    } else {
        variant = vec2(0.0, 0.0);
    }
    return variant;
}


vec2 top_right_variant(int neighbors) {
    vec2 variant;
    if (neighbors == 110) {
        variant = vec2(1.0, 2.0);
    } else if (neighbors == 100) {
        variant = vec2(0.0, 2.0);
    } else if (neighbors == 0) {
        variant = vec2(2.0, 0.0);
    } else if (neighbors == 10) {
        variant = vec2(3.0, 2.0);
    } else if (neighbors == 101) {
        variant = vec2(2.0, 2.0);
    } else if (neighbors == 1) {
        variant = vec2(2.0, 1.0);
    } else if (neighbors == 11) {
        variant = vec2(2.0, 3.0);
    } else {
        variant = vec2(0.0, 0.0);
    }
    return variant;
}

vec2 bottom_left_variant(int neighbors) {
    vec2 variant;
    if (neighbors == 110) {
        variant = vec2(2.0, 3.0);
    } else if (neighbors == 100) {
        variant = vec2(0.0, 3.0);
    } else if (neighbors == 0) {
        variant = vec2(1.0, 4.0);
    } else if (neighbors == 10) {
        variant = vec2(3.0, 2.0);
    } else if (neighbors == 101) {
        variant = vec2(1.0, 3.0);
    } else if (neighbors == 1) {
        variant = vec2(1.0, 1.0);
    } else if (neighbors == 11) {
        variant = vec2(1.0, 2.0);
    } else {
        variant = vec2(0.0, 0.0);
    }
    return variant;
}

vec2 bottom_right_variant(int neighbors) {
    vec2 variant;
    if (neighbors == 110) {
        variant = vec2(1.0, 3.0);
    } else if (neighbors == 100) {
        variant = vec2(0.0, 3.0);
    } else if (neighbors == 0) {
        variant = vec2(2.0, 4.0);
    } else if (neighbors == 10) {
        variant = vec2(3.0, 3.0);
    } else if (neighbors == 101) {
        variant = vec2(2.0, 2.0);
    } else if (neighbors == 1) {
        variant = vec2(2.0, 1.0);
    } else if (neighbors == 11) {
        variant = vec2(2.0, 3.0);
    } else {
        variant = vec2(0.0, 0.0);
    }

    return variant;
}



int calc_neighbors(ivec2 ibiom, vec2 v_position, vec4 offset) {
    int neighbors = 0;
    if (transition_same_neighbor(ibiom, v_position, offset.x, 0.0)) {
        neighbors += 1 * 100;
    }
    if (transition_same_neighbor(ibiom, v_position, offset.y, offset.z)) {
        neighbors += 1 * 10;
    }
    if (transition_same_neighbor(ibiom, v_position, 0.0, offset.w)) {
        neighbors += 1;
    }
    return neighbors;
}

vec2 top_left_aux(int neighbors) {
    vec2 variant;
    if (neighbors == 110) {
        variant = vec2(2.0, 1.0);
    } else if (neighbors == 100) {
        variant = vec2(2.0, 0.0);
    } else if (neighbors == 111) {
        variant = vec2(2.0, 3.0);
    } else if (neighbors == 10) {
        variant = vec2(2.0, 4.0);
    } else if (neighbors == 101) {
        variant = vec2(3.0, 2.0);
    } else if (neighbors == 1) {
        variant = vec2(1.0, 4.0);
    } else if (neighbors == 11) {
        variant = vec2(0.0, 3.0);
    } else {
        variant = vec2(0.0, 0.0);
    }
    return variant;
}

vec2 top_right_aux(int neighbors) {
    vec2 variant;
    if (neighbors == 110) {
        variant = vec2(1.0, 1.0);
    } else if (neighbors == 100) {
        variant = vec2(1.0, 1.0);
    } else if (neighbors == 0) {
        variant = vec2(2.0, 0.0);
    } else if (neighbors == 10) {
        variant = vec2(1.0, 4.0);
    } else if (neighbors == 101) {
        variant = vec2(3.0, 3.0);
    } else if (neighbors == 1) {
        variant = vec2(2.0, 4.0);
    } else if (neighbors == 11) {
        variant = vec2(0.0, 3.0);
    } else if (neighbors == 111) {
        variant = vec2(1.0, 3.0);
    } else {
        variant = vec2(0.0, 0.0);
    }
    return variant;
}

vec2 bottom_left_aux(int neighbors) {
    vec2 variant;
    if (neighbors == 110) {
        variant = vec2(2.0, 1.0);
    } else if (neighbors == 100) {
        variant = vec2(2.0, 4.0);
    } else if (neighbors == 0) {
        variant = vec2(1.0, 4.0);
    } else if (neighbors == 10) {
        variant = vec2(2.0, 0.0);
    } else if (neighbors == 101) {
        variant = vec2(3.0, 3.0);
    } else if (neighbors == 1) {
        variant = vec2(1.0, 0.0);
    } else if (neighbors == 11) {
        variant = vec2(0.0, 2.0);
    } else if (neighbors == 111) {
        variant = vec2(2.0, 2.0);
    } else {
        variant = vec2(0.0, 0.0);
    }
    return variant;
}

vec2 bottom_right_aux(int neighbors) {
    vec2 variant;
    if (neighbors == 110) {
        variant = vec2(1.0, 1.0);
    } else if (neighbors == 100) {
        variant = vec2(1.0, 4.0);
    } else if (neighbors == 0) {
        variant = vec2(2.0, 4.0);
    } else if (neighbors == 10) {
        variant = vec2(1.0, 0.0);
    } else if (neighbors == 101) {
        variant = vec2(3.0, 2.0);
    } else if (neighbors == 1) {
        variant = vec2(2.0, 0.0);
    } else if (neighbors == 11) {
        variant = vec2(0.0, 2.0);
    } else if (neighbors == 111) {
        variant = vec2(1.0, 2.0);
    } else {
        variant = vec2(0.0, 0.0);
    }

    return variant;
}

ivec2 biom_to_ibiom(vec4 biom) {
    int red = int(biom.r * 256.0);
    return ivec2(red, 0);
}

int ibiom_layer_index(ivec2 ibiom) {
    for (int i = 0; i < bioms_num; i++) {
        if (ibiom == bioms[i]) {
            return i;
        }
    }
    return -1;
}

vec4 transition_aux_color(vec2 direction, vec4 color, vec2 v_position, vec4 offset, vec2 delta) {
    vec4 biom = texture2D(u_minimap, v_position);
    vec4 transition_biom = neighbor_biom(v_position, direction.x, direction.y);
    if (transition_biom == biom) {
        return color;
    }

    ivec2 ibiom = biom_to_ibiom(biom);
    ivec2 itransition_biom = biom_to_ibiom(transition_biom);

    int ibiom_index = ibiom_layer_index(ibiom);
    int itransition_biom_index = ibiom_layer_index(itransition_biom);

    if (ibiom_index < itransition_biom_index) {
        return color;
    }

    if (itransition_biom_index == -1) {
        return color;
    }

    int neighbors = calc_neighbors(itransition_biom, v_position, offset);
    if (neighbors == 0) {
        return color;
    }
    vec2 variant = vec2(0.0, 0.0);
    if (delta.x == 0.5) {
        if (delta.y == 0.5) {
            variant = top_left_aux(neighbors);
        } else {
            variant = bottom_left_aux(neighbors);
        }
    } else {
        if (delta.y == 0.5) {
            variant = top_right_aux(neighbors);
        } else {
            variant = bottom_right_aux(neighbors);
        }
    }

    variant; // HACK to terminate if?

    if (variant == vec2(0.0, 0.0)) {
        return color;
    }

    vec2 transitions_pos = vec2(variant.x * transition_tile_size / transitions_width,
                                variant.y * transition_tile_size / transitions_height);

    if (itransition_biom.r == 221) {
        transitions_pos.x += 1.0 * (transitions_size / transitions_width);
    }

    vec2 p;
    p.x = mod(v_position.x * map_size, tile_size)/tile_size+delta.x;
    p.y = mod(v_position.y * map_size, tile_size)/tile_size+delta.y;
    transitions_pos.x += (p.x * transition_tile_size)/transitions_width;
    transitions_pos.y += (p.y * transition_tile_size)/transitions_height;

    vec4 transition = texture2D(u_transitions, transitions_pos);
    return blend(color, transition);
}

vec4 transition_main_color(vec2 v_position, vec4 offset, vec2 delta) {
    vec4 biom = texture2D(u_minimap, v_position);
    vec4 color = biom_color(texture2D(u_minimap, v_position), tex_map_point(v_position));
    ivec2 ibiom = biom_to_ibiom(biom);
    int ibiom_index = ibiom_layer_index(ibiom);
    if (ibiom_index != -1) {
        int neighbors = calc_neighbors(ibiom, v_position, offset);
        vec2 variant;
        if (delta.x == 0.5) {
            if (delta.y == 0.5) {
                variant = top_left_variant(neighbors);
            } else {
                variant = bottom_left_variant(neighbors);
            }
        } else {
            if (delta.y == 0.5) {
                variant = top_right_variant(neighbors);
            } else {
                variant = bottom_right_variant(neighbors);
            }
        }

        if (variant == vec2(+0.0, +0.0)) {
            delta = vec2(0.0);
            vec2 p = floor(v_position*map_size / tile_size) + u_location;
            float rand = sin(p.x * p.y) / 2.0; // [0 .. 1]
            if (rand > 0.3) {
                delta.y = 1.0;
            } else if (rand < -0.3) {
                delta.y = 4.0;
            }

            if (cos(p.x * p.y) > 0.0) {
                delta.x = 3.0;
            }
        }

        const vec2 k = vec2(transition_tile_size / transitions_width, transition_tile_size / transitions_height);
        vec2 transitions_pos = variant * k;

        vec2 p = v_position * map_size;
        p.x = mod(p.x, tile_size);
        p.y = mod(p.y, tile_size);
        p /= tile_size;
        p += delta;
        p *= k;

        transitions_pos.x += float(ibiom_index) * (transitions_size / transitions_width);
        color = texture2D(u_transitions, transitions_pos + p);
    }

    color = transition_aux_color(vec2(offset.x, 0.0), color, v_position, offset, delta);
    color = transition_aux_color(vec2(offset.y, offset.z), color, v_position, offset, delta);
    color = transition_aux_color(vec2(0.0, offset.w), color, v_position, offset, delta);
    return color;
}

void main() {
    init_bioms();

    vec2 p = tex_map_point_in_tile(v_position);
    if (p.y < tile_size/2.0) {
        if (p.x < tile_size/2.0) {
            gl_FragColor = transition_main_color(v_position, vec4(-1.0, -1.0, -1.0, -1.0), vec2(0.5, 0.5));
        } else {
            gl_FragColor = transition_main_color(v_position, vec4(1.0, 1.0, -1.0, -1.0), vec2(-0.5, 0.5));
        }
    } else {
        if (p.x < tile_size/2.0) {
            gl_FragColor = transition_main_color(v_position, vec4(-1.0, -1.0, 1.0, 1.0), vec2(0.5, -0.5));
        } else {
            gl_FragColor = transition_main_color(v_position, vec4(1.0, 1.0, 1.0, 1.0), vec2(-0.5, -0.5));
        }
    }
}
