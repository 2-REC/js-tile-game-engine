/* main.js */

import { config } from "./config.js";
import { AssetManager } from "./assetmanager.js";
import { Game } from "./game.js";
import { Display } from "./display.js";
import { Controller } from "./controller.js";
import { Engine } from "./engine.js";


class Main {
    #asset_manager;
    #game;
    #display;
    #controller;
    #engine;
    // TODO: horrible! => use sprites instead
    #p;


    constructor() {
        this.#asset_manager = new AssetManager();
    }

    loadLevel() {
        this.#game = new Game();
        this.#display = new Display(document, document.querySelector("canvas"));
        this.#controller = new Controller();
        // TODO: set time step as configurable param?
        this.#engine = new Engine(1000/config.FPS, this);

        // TODO: CHANGE!
        this.#p = document.createElement("p");
        this.#p.setAttribute("style", "color:#000000; font-size:2.0em; margin:0; position:fixed;");
        this.#p.innerHTML = "Carrots: 0";
        document.body.appendChild(this.#p);

        // TODO: move to Display class init function... + set buffer as private!
        this.#display.buffer.canvas.height = this.#game.height;
        this.#display.buffer.canvas.width = this.#game.width;
        this.#display.buffer.imageSmoothingEnabled = false;

        const zone_config = config.ZONE_PREFIX + this.#game.zone_id + config.ZONE_SUFFIX;
        this.#asset_manager.requestJSON(zone_config, (zone) => {
            this.#game.setup(zone);
            // TODO: get filename from level config
            const image_path = config.TILESHEET_PATH;
            if (this.#asset_manager.tile_set_image_path !== image_path) {
                this.#asset_manager.tile_set_image_path = image_path;
                this.#asset_manager.requestImage(image_path, (image) => {
                    this.#asset_manager.tile_set_image = image;
                    this.resize();
                    this.#engine.start();
                });
            }
        });
    }

    resize(event) {
        this.#display.resize(
            document.documentElement.clientWidth - 32,
            document.documentElement.clientHeight - 32,
            this.#game.height / this.#game.width
        );
        this.#display.render();

        // TODO: CHANGE! => use sprites!
        const rectangle = this.#display.context.canvas.getBoundingClientRect();
        this.#p.style.left = rectangle.left + "px";
        this.#p.style.top  = rectangle.top + "px";
        this.#p.style.fontSize = ((this.#game.tile_set.tile_size * rectangle.height / 2.0) / this.#game.height) + "px";
    }

// TODO: split key up/down + do as in other engine
    keyDownUp(event) {
        this.#controller.keyDownUp(event.type, event.keyCode);
    }

    
    update() {
        if (this.#controller.left.active) {
            this.#game.player.moveLeft();
        }
        if (this.#controller.right.active) {
            this.#game.player.moveRight();
        }
        if (this.#controller.up.active) {
            this.#game.player.jump();
            this.#controller.up.active = false;
        }

        this.#game.update();

        if (this.#game.door) {
            // TODO: stop? could pause instead? (stop when other level)
            this.#engine.stop();
            const zone_config = config.ZONE_PREFIX + this.#game.door.destination_zone + config.ZONE_SUFFIX;
            this.#asset_manager.requestJSON(zone_config, (zone) => {
                this.#game.setup(zone);
                this.#engine.start();
            });
            return;
        }

    }

// TODO: move to world? or display?
    render() {
        let frame = undefined;

        this.#display.drawMap(
            this.#asset_manager.tile_set_image,
            this.#game.tile_set.columns,
            this.#game.graphical_map,
            this.#game.columns,
            this.#game.tile_set.tile_size
        );

        // TODO: CHANGE (MAKE GENERIC!)
        for (let index = this.#game.carrots.length - 1; index > -1; -- index) {
            let carrot = this.#game.carrots[index];
            frame = this.#game.tile_set.frames[carrot.animator.frame_value];

            this.#display.drawObject(
                this.#asset_manager.tile_set_image,
                frame.x,
                frame.y,
                carrot.x + Math.floor(carrot.width * 0.5 - frame.width * 0.5) + frame.offset_x,
                carrot.y + frame.offset_y,
                frame.width,
                frame.height
            );
        }

        frame = this.#game.tile_set.frames[this.#game.player.animator.frame_value];

        this.#display.drawObject(
            this.#asset_manager.tile_set_image,
            frame.x,
            frame.y,
            this.#game.player.x + Math.floor(this.#game.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
            this.#game.player.y + frame.offset_y,
            frame.width,
            frame.height
        );

        for (let index = this.#game.grass.length - 1; index > -1; -- index) {
            const grass = this.#game.grass[index];
            frame = this.#game.tile_set.frames[grass.animator.frame_value];

            this.#display.drawObject(
                this.#asset_manager.tile_set_image,
                frame.x,
                frame.y,
                grass.x + frame.offset_x,
                grass.y + frame.offset_y,
                frame.width,
                frame.height
            );
        }

        // TODO: CHANGE!
        this.#p.innerHTML = "Chillis: " + this.#game.carrot_count;

        this.#display.render();
    }

}


// TODO: move to other file?
window.addEventListener("load", function(event) {

    const main = new Main();

    // TODO: throttle event
    window.addEventListener("resize", (event) => { main.resize(event) });

    // TODO: separate key up/down
    window.addEventListener("keydown", (event) => { main.keyDownUp(event) });
    window.addEventListener("keyup", (event) => { main.keyDownUp(event) });

    main.loadLevel();

});
