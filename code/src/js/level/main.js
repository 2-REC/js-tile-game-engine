/**
 * MAIN CLASS
 */

window.addEventListener("load", function(event) {

    "use strict";


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
        display.drawMap(game.world.map, game.world.columns);

        //// BEGIN
// TODO: should have an array of objects to display
        display.drawPlayer(game.world.player, game.world.player.color);
        //// END

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


    var game = new Game();
    var display = new Display(document.querySelector("canvas"));
    var controller = new Controller();
// TODO: set time step as configurable param?
    var engine = new Engine(1000/30, render, update);


    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

// TODO: change to wait until everything is loaded, not just the tilesheet
    display.tile_sheet.image.addEventListener("load", function(event) {
        resize();
        engine.start();
    }, { once:true });

// TODO: get filename from level config & path from game config?
var image_path = "../../res/images/level/";
    display.tile_sheet.image.src = image_path + "tilesheet.png";


    window.addEventListener("resize", resize);
// TODO: separate key up/down?
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);

});
