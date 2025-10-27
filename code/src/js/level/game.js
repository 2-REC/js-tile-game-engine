/* game.js */

import { Tileset } from "./tileset.js";
import { WorldCollisionManager } from "./worldcollisionmanager.js";
import { Player } from "./player.js";
import { Carrot, Door, Grass } from "./objects.js";


export class Game {

    constructor() {
        this.collider = new WorldCollisionManager();

        // TODO: get from config (where? how?) (with some other additional parameters)
        this.friction = 0.85;
        this.gravity = 2;

// SIZE_FACTOR
//        this.tile_set = new Game.Tileset(8, 16);
        this.tile_set = new Tileset(8, 64);
        // TODO: get size data from file (json?)
        this.columns = 12;
        this.rows = 9;

        this.height = this.tile_set.tile_size * this.rows;
        this.width = this.tile_set.tile_size * this.columns;

        // TODO: get as param...?
        this.zone_id   = "00";

// TODO: handle other objects ... (create from map data - other layers)
// SIZE_FACTOR
//        this.player = new Player(32, 76);
        this.player = new Player(128, 304);

// TODO: 'new' also here?
        this.carrots = new Array();
        this.carrot_count = 0;

        this.doors = new Array();
        this.door = undefined;

        this.grass = new Array();
    }

    setup(zone) {
        this.zone_id = zone.id;
        this.graphical_map = zone.graphical_map;
        this.collision_map = zone.collision_map;
        this.columns = zone.columns;
        this.rows = zone.rows;

        this.carrots = new Array();
        this.doors = new Array();
        this.grass = new Array();

        const tile_size = this.tile_set.tile_size;
// TODO: MAKE GENERIC!
// TODO: use foreach?
        if (typeof zone.carrots !== 'undefined') {
            for (let index = zone.carrots.length - 1; index > -1; -- index) {
                let carrot = zone.carrots[index];
// TODO: make functions 'spawnCarrot' (or 'spawn("carrot")')
// SIZE_FACTOR
//                this.carrots[index] = new Carrot(carrot[0] * tile_size + 5, carrot[1] * tile_size - 2);
                this.carrots[index] = new Carrot(carrot[0] * tile_size + 20, carrot[1] * tile_size - 8);
            }
        }

        for (let index = zone.doors.length - 1; index > -1; --index) {
            let door = zone.doors[index];
            this.doors[index] = new Door(door);
        }

        if (typeof zone.grass !== 'undefined') {
            for (let index = zone.grass.length - 1; index > -1; -- index) {
                let grass = zone.grass[index];
// SIZE_FACTOR
//                this.grass[index] = new Grass(grass[0] * tile_size, grass[1] * tile_size + 12);
                this.grass[index] = new Grass(grass[0] * tile_size, grass[1] * tile_size + 48);
            }
        }

        if (this.door) {
            if (this.door.destination_x != -1) {
                this.player.setCenterX(this.door.destination_x);
                this.player.setOldCenterX(this.door.destination_x);
            }
            if (this.door.destination_y != -1) {
                this.player.setCenterY(this.door.destination_y);
                this.player.setOldCenterY(this.door.destination_y);
            }
            this.door = undefined;
        }
    }

// TODO: adapt... (use collision tilemap)
    collideObject(object) {
        /* check collision with each corner of the object */
// TODO: use const/let
        var bottom, left, right, top, value;
        var tile_size = this.tile_set.tile_size;

        top = Math.floor(object.getTop() / tile_size);
        left = Math.floor(object.getLeft() / tile_size);
        value = this.collision_map[(top * this.columns) + left];
        this.collider.collide(value, object, left * tile_size, top * tile_size, tile_size);

        top = Math.floor(object.getTop() / tile_size);
        right = Math.floor(object.getRight() / tile_size);
        value = this.collision_map[(top * this.columns) + right];
        this.collider.collide(value, object, right * tile_size, top * tile_size, tile_size);

        bottom = Math.floor(object.getBottom() / tile_size);
        left = Math.floor(object.getLeft() / tile_size);
        value = this.collision_map[(bottom * this.columns) + left];
        this.collider.collide(value, object, left * tile_size, bottom * tile_size, tile_size);

        bottom = Math.floor(object.getBottom() / tile_size);
        right = Math.floor(object.getRight() / tile_size);
        value = this.collision_map[(bottom * this.columns) + right];
        this.collider.collide(value, object, right * tile_size, bottom * tile_size, tile_size);

    }

    update() {
        this.player.updatePosition(this.gravity, this.friction);

        this.collideObject(this.player);

// TODO: MAKE GENERIC (with list of objects, calling each "update" function)
        for (let index = this.carrots.length - 1; index > -1; -- index) {
            let carrot = this.carrots[index];
            carrot.updatePosition();
            carrot.animate();

            if (carrot.collideObject(this.player)) {
                this.carrots.splice(this.carrots.indexOf(carrot), 1);
                this.carrot_count++;
            }
        }

        for (let index = this.doors.length - 1; index > -1; --index) {
            let door = this.doors[index];
            if (door.collideObject(this.player)) {
                this.door = door;
            }
        }

        for (let index = this.grass.length - 1; index > -1; -- index) {
            let grass = this.grass[index];
            grass.animate();
        }

        this.player.updateAnimation();
    }

}
