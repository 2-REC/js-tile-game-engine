/* tileset.js */

class AnimationFrame {
    constructor(x, y, width, height, offset_x=0, offset_y=0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.offset_x = offset_x;
        this.offset_y = offset_y;
    }

}


/* Tileset */
// TODO: rename class (+file)?
export class Tileset {

    constructor(columns, tile_size) {
        this.columns = columns;
        this.tile_size = tile_size;

// TODO: change this and get it from data files
// TODO: remove carrots, grass, etc from here!
// SIZE_FACTOR
/*
        this.frames = [
            new AnimationFrame(115,  96, 13, 16, 0, -2), // idle-left
            new AnimationFrame( 50,  96, 13, 16, 0, -2), // jump-left
            new AnimationFrame(102,  96, 13, 16, 0, -2), new AnimationFrame(89, 96, 13, 16, 0, -2), new AnimationFrame(76, 96, 13, 16, 0, -2), new AnimationFrame(63, 96, 13, 16, 0, -2), // walk-left
            new AnimationFrame(  0, 112, 13, 16, 0, -2), // idle-right
            new AnimationFrame( 65, 112, 13, 16, 0, -2), // jump-right
            new AnimationFrame( 13, 112, 13, 16, 0, -2), new AnimationFrame(26, 112, 13, 16, 0, -2), new AnimationFrame(39, 112, 13, 16, 0, -2), new AnimationFrame(52, 112, 13, 16, 0, -2), // walk-right
            new AnimationFrame( 81, 112, 14, 16), new AnimationFrame(96, 112, 16, 16), // carrot
            new AnimationFrame(112, 115, 16,  4), new AnimationFrame(112, 124, 16, 4), new AnimationFrame(112, 119, 16, 4) // grass
        ];
*/
        this.frames = [
            new AnimationFrame(460,  384, 52, 64, 0, -8), // idle-left
            new AnimationFrame( 200,  384, 52, 64, 0, -8), // jump-left
            new AnimationFrame(408,  384, 52, 64, 0, -8), new AnimationFrame(356, 384, 52, 64, 0, -8), new AnimationFrame(304, 384, 52, 64, 0, -8), new AnimationFrame(252, 384, 52, 64, 0, -8), // walk-left
            new AnimationFrame(  0, 448, 52, 64, 0, -8), // idle-right
            new AnimationFrame( 260, 448, 52, 64, 0, -8), // jump-right
            new AnimationFrame( 52, 448, 52, 64, 0, -8), new AnimationFrame(104, 448, 52, 64, 0, -8), new AnimationFrame(156, 448, 52, 64, 0, -8), new AnimationFrame(208, 448, 52, 64, 0, -8), // walk-right
            new AnimationFrame( 324, 448, 56, 64), new AnimationFrame(384, 448, 64, 64), // chilli
            new AnimationFrame(448, 460, 64,  16), new AnimationFrame(448, 496, 64, 16), new AnimationFrame(448, 476, 64, 16) // grass
        ];

    }

}
