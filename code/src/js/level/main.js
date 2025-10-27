/* main.js */

// TODO: use URL
import { AssetManager } from "./assetmanager.js";
import { Game } from "./game.js";
import { Display } from "./display.js";
import { Controller } from "./controller.js";
import { Engine } from "./engine.js";


// TODO: get from somewhere...
// TODO: replace by regex
const ZONE_PREFIX = "../../res/json/levels/zone";
const ZONE_SUFFIX = ".json";


class Main {
    #asset_manager;
    #game;
    #display;
    #controller;
    #engine;
// TODO: horrible!
    #p;

    constructor() {
        this.#asset_manager = new AssetManager();
    }

// TODO: pass zone_id here...?
    loadLevel() {
        this.#game = new Game();
        this.#display = new Display(document, document.querySelector("canvas"));
        this.#controller = new Controller();
        // TODO: set time step as configurable param?
        this.#engine = new Engine(1000/30, this);

        // TODO: CHANGE!
//        const p = document.createElement("p");
        this.#p = document.createElement("p");
        this.#p.setAttribute("style", "color:#000000; font-size:2.0em; margin:0; position:fixed;");
        this.#p.innerHTML = "Carrots: 0";
        document.body.appendChild(this.#p);

// TODO: move to Display class init function... + set buffer as private!
        this.#display.buffer.canvas.height = this.#game.world.height;
        this.#display.buffer.canvas.width = this.#game.world.width;
        this.#display.buffer.imageSmoothingEnabled = false;

        this.#asset_manager.requestJSON(ZONE_PREFIX + this.#game.world.zone_id + ZONE_SUFFIX, (zone) => {
            this.#game.world.setup(zone);
        // TODO: get filename from level config & path from game config?
        const image_path = "../../res/images/levels/tilesheet.png";
            this.#asset_manager.requestImage(image_path, (image) => {
                this.#asset_manager.tile_set_image = image;
                this.resize();
                this.#engine.start();
            });
        });

    }

    resize(event) {
        this.#display.resize(document.documentElement.clientWidth - 32,
                document.documentElement.clientHeight - 32,
                this.#game.world.height / this.#game.world.width);
        this.#display.render();

        // TODO: CHANGE! => use sprites!
        const rectangle = this.#display.context.canvas.getBoundingClientRect();
        this.#p.style.left = rectangle.left + "px";
        this.#p.style.top  = rectangle.top + "px";
        this.#p.style.fontSize = ((this.#game.world.tile_set.tile_size * rectangle.height / 2.0) / this.#game.world.height) + "px";

    }

// TODO: split key up/down + do as in other engine
    keyDownUp(event) {
        this.#controller.keyDownUp(event.type, event.keyCode);
    }

    
    update() {
        if (this.#controller.left.active) {
            this.#game.world.player.moveLeft();
        }
        if (this.#controller.right.active) {
            this.#game.world.player.moveRight();
        }
        if (this.#controller.up.active) {
            this.#game.world.player.jump();
            this.#controller.up.active = false;
        }

        this.#game.update();

        if (this.#game.world.door) {
// TODO: stop? could pause instead? (stop when other level)
            this.#engine.stop();
            this.#asset_manager.requestJSON(ZONE_PREFIX + this.#game.world.door.destination_zone + ZONE_SUFFIX, (zone) => {
                this.#game.world.setup(zone);
                this.#engine.start();
            });
            return;
        }

    }

// TODO: move to world? or display?
    render() {
        let frame = undefined;

        this.#display.drawMap(this.#asset_manager.tile_set_image,
                this.#game.world.tile_set.columns, this.#game.world.graphical_map,
                this.#game.world.columns, this.#game.world.tile_set.tile_size);

        // TODO: CHANGE (MAKE GENERIC!)
        for (let index = this.#game.world.carrots.length - 1; index > -1; -- index) {
            let carrot = this.#game.world.carrots[index];
            frame = this.#game.world.tile_set.frames[carrot.animator.frame_value];

            this.#display.drawObject(this.#asset_manager.tile_set_image,
                    frame.x, frame.y,
                    carrot.x + Math.floor(carrot.width * 0.5 - frame.width * 0.5) + frame.offset_x,
                    carrot.y + frame.offset_y, frame.width, frame.height);
        }

        frame = this.#game.world.tile_set.frames[this.#game.world.player.animator.frame_value];

        this.#display.drawObject(this.#asset_manager.tile_set_image,
                frame.x, frame.y,
                this.#game.world.player.x + Math.floor(this.#game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
                this.#game.world.player.y + frame.offset_y,
                frame.width, frame.height);

        for (let index = this.#game.world.grass.length - 1; index > -1; -- index) {
            let grass = this.#game.world.grass[index];
            frame = this.#game.world.tile_set.frames[grass.animator.frame_value];

            this.#display.drawObject(this.#asset_manager.tile_set_image,
                    frame.x, frame.y,
                    grass.x + frame.offset_x,
                    grass.y + frame.offset_y, frame.width, frame.height);
        }

    // TODO: CHANGE!
        this.#p.innerHTML = "Chillis: " + this.#game.world.carrot_count;

        this.#display.render();
    }



}



window.addEventListener("load", function(event) {

    const main = new Main();

    // TODO: throttle event
    window.addEventListener("resize", (event) => { main.resize(event) });

    // TODO: separate key up/down
    window.addEventListener("keydown", (event) => { main.keyDownUp(event) });
    window.addEventListener("keyup", (event) => { main.keyDownUp(event) });


    main.loadLevel();

});
