/* display.js */

export class Display {

    buffer;
    context;

// TODO: change double buffering stuff...
    constructor(document, canvas) {
        this.buffer  = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");

    }

    drawMap(tilesheet, tilesheet_nb_columns, map, map_nb_columns, tile_size) {
// TODO: why from last to first?
        for (let index = map.length - 1; index >= 0; -- index) {
            let value = map[index];

            let source_x = (value % tilesheet_nb_columns) * tile_size;
            let source_y = Math.floor(value / tilesheet_nb_columns) * tile_size;

            let destination_x = (index % map_nb_columns) * tile_size;
            let destination_y = Math.floor(index / map_nb_columns) * tile_size;

            this.buffer.drawImage(
                tilesheet,
                source_x, source_y, tile_size, tile_size,
                destination_x, destination_y, tile_size, tile_size
            );
        }
    };

    drawObject(sprite_sheet, source_x, source_y, destination_x, destination_y, width, height) {
        this.buffer.drawImage(
            sprite_sheet,
            source_x, source_y, width, height,
            Math.round(destination_x), Math.round(destination_y), width, height
        );
    };

    resize(width, height, height_width_ratio) {
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

    render() {
        this.context.drawImage(
            this.buffer.canvas,
            0, 0, this.buffer.canvas.width, this.buffer.canvas.height,
            0, 0, this.context.canvas.width, this.context.canvas.height
        );
    }

}



