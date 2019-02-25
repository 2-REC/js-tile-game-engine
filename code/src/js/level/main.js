/**
 * MAIN - GAME STARTING POINT
 */

window.addEventListener("load", function(event) {

    "use strict";


    /*
     * CLASSES
     */

    /**
     * ASSETSMANAGER CLASS
     */
    const AssetsManager = function() {
        this.tile_set_image = undefined;
    };

    AssetsManager.prototype = {

        constructor: Game.AssetsManager,

        loadTileSetImage: function(url, callback) {
            this.tile_set_image = new Image();
            this.tile_set_image.addEventListener("load", function(event) {
                callback();
            }, { once : true});

            this.tile_set_image.src = url;
        }
    };


    /*
     * FUNCTIONS
     */

    var keyDownUp = function(event) {
        controller.keyDownUp(event.type, event.keyCode);
    };

    var resize = function(event) {
        display.resize(document.documentElement.clientWidth - 32,
                document.documentElement.clientHeight - 32,
                game.world.height / game.world.width);
        display.render();
    };

    var render = function() {
        display.drawMap(assets_manager.tile_set_image,
                game.world.tile_set.columns, game.world.map,
                game.world.columns, game.world.tile_set.tile_size);

        let frame = game.world.tile_set.frames[game.world.player.frame_value];

        display.drawObject(assets_manager.tile_set_image,
                frame.x, frame.y,
                game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
                game.world.player.y + frame.offset_y,
                frame.width, frame.height);

        display.render();
    };

    var update = function() {
        if (controller.left.active) {
            game.world.player.moveLeft();
        }
        if (controller.right.active) {
            game.world.player.moveRight();
        }
        if (controller.up.active) {
            game.world.player.jump();
            controller.up.active = false;
        }

        game.update();
    };


    /*
     * INITIALISATIONS
     */

    var assets_manager = new AssetsManager();
    var game = new Game();
    var display = new Display(document.querySelector("canvas"));
    var controller = new Controller();
// TODO: set time step as configurable param?
    var engine = new Engine(1000/30, render, update);


// TODO: move to Display class init function...
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
    display.buffer.imageSmoothingEnabled = false;


// TODO: get filename from level config & path from game config?
var image_path = "../../res/images/level/tilesheet.png";
// TODO: change to wait until everything is loaded, not just the tilesheet
    assets_manager.loadTileSetImage(image_path, () => {
        resize();
        engine.start();
    });

    window.addEventListener("resize", resize);
// TODO: separate key up/down?
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);

});
