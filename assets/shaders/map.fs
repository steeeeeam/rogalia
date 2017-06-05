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

const ivec3 plowed_soil = ivec3(210, 0, 0);
const ivec3 soil = ivec3(211, 0, 1);
const ivec3 ground = ivec3(17, 0, 2);
const ivec3 sand = ivec3(221, 0, 3);
const ivec3 shallow_water = ivec3(36, 0, 4);
const ivec3 deep_water = ivec3(32, 0, 5);
const ivec3 rock = ivec3(226, 0, 6);
const ivec3 grass = ivec3(65, 0, 7);
const ivec3 leaf_forest = ivec3(13, 0, 8);
const ivec3 pine_forest = ivec3(23, 0, 9);
const ivec3 stone_tiles = ivec3(28, 37, 10);
const ivec3 light_stone_tiles = ivec3(119, 0, 11);
const ivec3 red_stone_tiles = ivec3(192, 0, 12);
const ivec3 solid_ground = ivec3(0, 0, 13);

const float transition_tile_size = 64.0;
const float transitions_biom_width = transition_tile_size * 4.0;
const float transitions_biom_height = transitions_biom_width + transition_tile_size;
const float transitions_size = transitions_biom_width * 8.0;
const float transitions_k = transition_tile_size / transitions_size;

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

    if (red == deep_water.r) {
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == shallow_water.r) {
        p.y += tex_map_offset(1.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == sand.r) {
        p.y += tex_map_offset(2.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == soil.r) {
        p.y += tex_map_offset(3.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == grass.r) {
        p.y += tex_map_offset(4.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == leaf_forest.r) {
        p.y += tex_map_offset(5.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == pine_forest.r) {
        p.y += tex_map_offset(6.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == rock.r) {
        p.y += tex_map_offset(7.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == plowed_soil.r) {
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
    } else if (red == stone_tiles.r && stone_tiles.b == 37) {
        p.y += tex_map_offset(17.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (light_stone_tiles.r == 119) {
        p.y += tex_map_offset(18.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == red_stone_tiles.r) {
        p.y += tex_map_offset(19.0);
        p.x += tex_map_variant(v_position, 4.0);
    } else if (red == ground.r) {
        p.y += tex_map_offset(20.0);
        p.x += tex_map_variant(v_position, 8.0);
    } else if (red == solid_ground.r && blue == solid_ground.b) {
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
        variant = vec2(1.0, 0.0);
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

ivec4 biom_to_ibiom(vec4 biom) {
    return ivec4(biom * 256.0);
}

vec2 ibiom_position_offset(vec2 variant, ivec4 ibiom) {
    const int bioms_per_row = int(transitions_size / transitions_biom_width);
    vec2 offset = variant * transitions_k;
    offset.x += float(ibiom.w) * (transitions_biom_width / transitions_size);
    offset.y += float(ibiom.w/bioms_per_row) * (transitions_biom_height / transitions_size);
    return offset;
}

vec2 ibiom_uv(vec2 v_position, vec2 variant, vec2 delta, ivec4 ibiom) {
    vec2 transitions_pos = ibiom_position_offset(variant, ibiom);

    vec2 p = v_position * map_size;
    p.x = mod(p.x, tile_size);
    p.y = mod(p.y, tile_size);
    p /= tile_size;
    p += delta;
    p *= transitions_k;

    return transitions_pos + p;
}

struct Aux {
    vec2 direction;
    vec4 biom;
    ivec4 ibiom;
};

Aux transition_biom(vec2 direction, vec2 v_position) {
    Aux aux;
    aux.direction = direction;
    aux.biom = neighbor_biom(v_position, direction.x, direction.y);
    aux.ibiom = biom_to_ibiom(aux.biom);
    return aux;
}

vec4 transition_aux_color(Aux aux, vec4 biom, ivec4 ibiom, vec4 color, vec2 v_position, vec4 offset, vec2 delta) {
    if (aux.biom == biom) {
        return color;
    }

    if (ibiom.z > aux.ibiom.z) {
        return color;
    }

    if (aux.ibiom.w == -1) {
        return color;
    }

    int neighbors = calc_neighbors(aux.ibiom.xy, v_position, offset);
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


    if (variant == vec2(0.0, 0.0)) {
        return color;
    }

    vec4 transition = texture2D(u_transitions, ibiom_uv(v_position, variant, delta, aux.ibiom));
    return mix(color, transition, transition.a);
}

vec4 transition_main_color(vec2 v_position, vec4 offset, vec2 delta) {
    vec4 biom = texture2D(u_minimap, v_position);
    ivec4 ibiom = biom_to_ibiom(biom);
    vec4 color;
    if (ibiom.w == -1) {
        color = biom_color(texture2D(u_minimap, v_position), tex_map_point(v_position));
    } else {
        int neighbors = calc_neighbors(ibiom.xy, v_position, offset);
        vec2 variant = vec2(0.0, 0.0);
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


        if (variant == vec2(0.0, 0.0)) {
            delta = vec2(0.0, 0.0);
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

        color = texture2D(u_transitions, ibiom_uv(v_position, variant, delta, ibiom));
    }

    Aux dir0 = transition_biom(vec2(offset.x, 0.0), v_position);
    Aux dir1 = transition_biom(vec2(offset.x, offset.z), v_position);
    Aux dir2 = transition_biom(vec2(0.0, offset.w), v_position);
    Aux tmp;
    if (dir0.ibiom.z > dir1.ibiom.z) {
        tmp = dir0;
        dir0 = dir1;
        dir1 = tmp;
    }
    if (dir1.ibiom.z > dir2.ibiom.z) {
        tmp = dir1;
        dir1 = dir2;
        dir2 = tmp;
    }
    if (dir0.ibiom.z > dir1.ibiom.z) {
        tmp = dir0;
        dir0 = dir1;
        dir1 = tmp;
    }


    color = transition_aux_color(dir0, biom, ibiom, color, v_position, offset, delta);
    color = transition_aux_color(dir1, biom, ibiom, color, v_position, offset, delta);
    color = transition_aux_color(dir2, biom, ibiom, color, v_position, offset, delta);

    //color.a = 1.0; // fix transparent tiles
    return color;
}

void main() {
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
