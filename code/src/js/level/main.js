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
        //// BEGIN
        display.drawLevel(game.world.background_color);
        display.drawPlayer(game.world.player.x, game.world.player.y,
                game.world.player.width, game.world.player.height,
                game.world.player.color);
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


    window.addEventListener("resize", resize);
// TODO: separate key up/down?
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);

    resize();
    engine.start();

});
