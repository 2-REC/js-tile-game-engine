/**
 * MAIN CLASS
 */

window.addEventListener("load", function(event) {

    "use strict";


    var render = function() {
        //// BEGIN
        display.update(game.color);
        //// END

        display.render();
    };

    var update = function() {
        game.update();
    };


    var game = new Game();
    var display = new Display(document.querySelector("canvas"));
    var controller = new Controller();
// TODO: set time step as configurable param?
    var engine = new Engine(1000/30, render, update);


    window.addEventListener("resize", display.handleResize);
// TODO: separate key up/down?
    window.addEventListener("keydown", controller.handleKeyDownUp);
    window.addEventListener("keyup", controller.handleKeyDownUp);

    display.resize();
    engine.start();

});
