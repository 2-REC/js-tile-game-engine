/**
 * GAME CLASS
 */

const Game = function() {

    this.world = new Game.World();

    this.update = function() {
        this.world.update();
    };

};

Game.prototype.constructor = Game;


Game.World = function() {

    //// BEGIN
// TODO: get from config (where? how?)
    this.friction = 0.9;
    this.gravity = 3;

// TODO: get data from file (json?)
    this.columns = 12;
    this.rows = 9;
    this.tile_size = 16;
    this.map = [49, 18, 18, 18, 50, 49, 19, 20, 17, 18, 36, 37,
                11, 40, 40, 40, 17, 19, 40, 32, 32, 32, 40, 08,
                11, 32, 40, 32, 32, 32, 40, 13, 06, 06, 29, 02,
                36, 07, 40, 40, 32, 40, 40, 20, 40, 40, 09, 10,
                03, 32, 32, 48, 40, 48, 40, 32, 32, 05, 37, 26,
                11, 40, 40, 32, 40, 40, 40, 32, 32, 32, 40, 38,
                11, 40, 32, 05, 15, 07, 40, 40, 04, 40, 01, 43,
                50, 03, 32, 32, 12, 40, 40, 32, 12, 01, 43, 10,
                09, 41, 28, 14, 38, 28, 14, 04, 23, 35, 10, 25];
    //// END


    this.height = this.tile_size * this.rows;
    this.width = this.tile_size * this.columns;

    //// BEGIN
// TODO: handle other objects ... (create from map data - other layers)
    this.player = new Game.World.Player();
    //// END

};

Game.World.prototype = {

    constructor: Game.World,

// TODO: adapt... (use collision tilemap)
    collideObject: function(object) {
        if (object.x < 0) {
            object.x = 0;
            object.velocity_x = 0;
        }
        else if ((object.x + object.width) > this.width) {
            object.x = this.width - object.width;
            object.velocity_x = 0;
        }

        if (object.y < 0) {
            object.y = 0;
            object.velocity_y = 0;
        }
        else if ((object.y + object.height) > this.height) {
            object.jumping = false;
            object.y = this.height - object.height;
            object.velocity_y = 0;
        }
    },

    update: function() {
        this.player.velocity_y += this.gravity;
        this.player.update();

        this.player.velocity_x *= this.friction;
        this.player.velocity_y *= this.friction;

        this.collideObject(this.player);
    }
    //// END

};


Game.World.Player = function(x, y) {
    //// BEGIN
    this.width = 12;
    this.height = 12;
    this.color = "#ff0000";

    this.x = 100;
    this.y = 50;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.jumping = true;
    //// END
};

Game.World.Player.prototype = {

    constructor : Game.Player,

    jump: function() {
        if (!this.jumping) {
            this.jumping = true;
// TODO: "-=" or just "-"?
            this.velocity_y -= 20;
        }
    },

    moveLeft: function() {
        this.velocity_x -= 0.5;
    },

    moveRight: function() {
        this.velocity_x += 0.5;
    },

    update:function() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

};
