/**
 * DISPLAY CLASS
 */

const Display = function(canvas) {

    this.buffer  = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");

    //// BEGIN
    //// END

    this.render = function() {
        this.context.drawImage(this.buffer.canvas,
            0, 0, this.buffer.canvas.width, this.buffer.canvas.height,
            0, 0, this.context.canvas.width, this.context.canvas.height);
    };

    this.resize = function(event) {
        var height = document.documentElement.clientHeight;
        var width  = document.documentElement.clientWidth;

        this.context.canvas.height = height - 32;
        this.context.canvas.width = width - 32;

        this.render();
    };


    //// BEGIN
    this.update = function(color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    };
    //// END


    this.handleResize = (event) => { this.resize(event); };

};

// TODO: necessary?
Display.prototype.constructor = Display;
