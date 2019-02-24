/**
 * DISPLAY CLASS
 */

const Display = function(canvas) {

    this.buffer  = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");

// TODO: get size from somewhere (not hardcoded)
    this.tile_sheet = new Display.TileSheet(16, 8);


    this.drawMap = function(map, columns) {
// TODO: why from last to first?
        for (let index = map.length - 1; index >= 0; -- index) {
            let value = map[index] - 1;

            let source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_size;
            let source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_size;

            let destination_x = (index % columns) * this.tile_sheet.tile_size;
            let destination_y = Math.floor(index / columns) * this.tile_sheet.tile_size;

            this.buffer.drawImage(this.tile_sheet.image,
                    source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size,
                    destination_x, destination_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size);
        }
    };

    //// BEGIN
// TODO: should have array of objects to draw
    this.drawPlayer = function(rectangle, color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(rectangle.x), Math.floor(rectangle.y), rectangle.width, rectangle.height);
    };
    //// END

// TODO: OK here? or should be in prototype?
    this.render = function() {
        this.context.drawImage(this.buffer.canvas,
            0, 0, this.buffer.canvas.width, this.buffer.canvas.height,
            0, 0, this.context.canvas.width, this.context.canvas.height);
    };

    this.resize = function(width, height, height_width_ratio) {
        if ((height / width) > height_width_ratio) {
            this.context.canvas.height = width * height_width_ratio;
            this.context.canvas.width = width;
        }
        else {
            this.context.canvas.height = height;
            this.context.canvas.width = height / height_width_ratio;
        }

        this.context.imageSmoothingEnabled = false;
    };

};

// TODO: necessary?
Display.prototype.constructor = Display;


Display.TileSheet = function(tile_size, columns) {
    this.image = new Image();
    this.tile_size = tile_size;
    this.columns = columns;
};

// TODO: necessary? why?
Display.TileSheet.prototype = {};
