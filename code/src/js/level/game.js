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


/**
 * GAME.WORLD CLASS
 */
 
Game.World = function() {

    //// BEGIN
// TODO: get from config (where? how?)
    this.friction = 0.9;
    this.gravity = 3;

// TODO: get data from file (json?)
    this.columns = 12;
    this.rows = 9;
    this.tile_size = 16;
    this.map = [48,17,17,17,49,48,18,19,16,17,35,36,
                10,39,39,39,16,18,39,31,31,31,39,07,
                10,31,39,31,31,31,39,12,05,05,28,01,
                35,06,39,39,31,39,39,19,39,39,08,09,
                02,31,31,47,39,47,39,31,31,04,36,25,
                10,39,39,31,39,39,39,31,31,31,39,37,
                10,39,31,04,14,06,39,39,03,39,00,42,
                49,02,31,31,11,39,39,31,11,00,42,09,
                08,40,27,13,37,27,13,03,22,34,09,24];

// TODO: use system as in Replica Island (more complex shapes allowed)
    /* These collision values correspond to collision functions in the Collider class.
     Except 00 that corresponds to nothing.
        0000 = 0  tile 0:    0    tile 1:   1     tile 2:    0    tile 15:    1
        0001 = 1           0   0          0   0            0   1            1   1
        0010 = 2             0              0                0                1
        1111 = 15        No walls     Wall on top      Wall on Right      four walls
      Each bit represents a side: 0 0 0 0 = l b r t (left bottom right top).
    */
    this.collision_map = [00,04,04,04,00,00,04,04,04,04,04,00,
                          02,00,00,00,12,06,00,00,00,00,00,08,
                          02,00,00,00,00,00,00,09,05,05,01,00,
                          00,07,00,00,00,00,00,14,00,00,08,00,
                          02,00,00,01,00,01,00,00,00,13,04,00,
                          02,00,00,00,00,00,00,00,00,00,00,08,
                          02,00,00,13,01,07,00,00,11,00,09,00,
                          00,03,00,00,10,00,00,00,08,01,00,00,
                          00,00,01,01,00,01,01,01,00,00,00,00];
    //// END


    this.height = this.tile_size * this.rows;
    this.width = this.tile_size * this.columns;

    this.collider = new Game.World.Collider();

    //// BEGIN
// TODO: handle other objects ... (create from map data - other layers)
    this.player = new Game.World.Player();
    //// END

};

Game.World.prototype = {

    constructor: Game.World,

// TODO: adapt... (use collision tilemap)
    collideObject: function(object) {

        /* stay inside the world */
        if (object.getLeft() < 0) {
            object.setLeft(0);
            object.velocity_x = 0;
        }
        else if (object.getRight() > this.width) {
            object.setRight(this.width);
            object.velocity_x = 0;
        }

        if (object.getTop() < 0) {
            object.setTop(0);
            object.velocity_y = 0;
        }
        else if (object.getBottom() > this.height) {
            object.setBottom(this.height);
            object.velocity_y = 0;
            object.jumping = false;
        }

        /* check collision with each corner of the object */
        var bottom, left, right, top, value;

        top = Math.floor(object.getTop() / this.tile_size);
        left = Math.floor(object.getLeft() / this.tile_size);
        value = this.collision_map[(top * this.columns) + left];
        this.collider.collide(value, object, left * this.tile_size, top * this.tile_size, this.tile_size);

        top = Math.floor(object.getTop() / this.tile_size);
        right = Math.floor(object.getRight() / this.tile_size);
        value = this.collision_map[(top * this.columns) + right];
        this.collider.collide(value, object, right * this.tile_size, top * this.tile_size, this.tile_size);

        bottom = Math.floor(object.getBottom() / this.tile_size);
        left = Math.floor(object.getLeft() / this.tile_size);
        value = this.collision_map[(bottom * this.columns) + left];
        this.collider.collide(value, object, left * this.tile_size, bottom * this.tile_size, this.tile_size);

        bottom = Math.floor(object.getBottom() / this.tile_size);
        right = Math.floor(object.getRight() / this.tile_size);
        value = this.collision_map[(bottom * this.columns) + right];
        this.collider.collide(value, object, right * this.tile_size, bottom * this.tile_size, this.tile_size);
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


/**
 * GAME.WORLD.COLLIDER CLASS
 */

Game.World.Collider = function() {

    this.collide = function(value, object, tile_x, tile_y, tile_size) {

        switch(value) {

/* All 15 tile types can be described with only 4 collision methods. These
methods are mixed and matched for each unique tile. */

            case 1:
                this.collidePlatformTop(object, tile_y);
                break;
            case 2:
                this.collidePlatformRight(object, tile_x + tile_size);
                break;
            case  3:
                if (this.collidePlatformTop(object, tile_y)) {
                    return;
                }
                this.collidePlatformRight(object, tile_x + tile_size);
                break;
            case  4:
                this.collidePlatformBottom(object, tile_y + tile_size);
                break;
            case  5:
                if (this.collidePlatformTop(object, tile_y)) {
                    return;
                }
                this.collidePlatformBottom(object, tile_y + tile_size);
                break;
            case  6:
                if (this.collidePlatformRight(object, tile_x + tile_size)) {
                    return;
                }
                this.collidePlatformBottom(object, tile_y + tile_size);
                break;
            case  7:
                if (this.collidePlatformTop(object, tile_y)) {
                    return;
                }
                if (this.collidePlatformRight(object, tile_x + tile_size)) {
                    return;
                }
                this.collidePlatformBottom(object, tile_y + tile_size);
                break;
            case  8:
                this.collidePlatformLeft(object, tile_x);
                break;
            case  9:
                if (this.collidePlatformTop(object, tile_y)) {
                    return;
                }
                this.collidePlatformLeft(object, tile_x);
                break;
            case 10:
                if (this.collidePlatformLeft(object, tile_x)) {
                    return;
                }
                this.collidePlatformRight(object, tile_x + tile_size);
                break;
            case 11:
                if (this.collidePlatformTop(object, tile_y)) {
                    return;
                }
                if (this.collidePlatformLeft(object, tile_x)) {
                    return;
                }
                this.collidePlatformRight(object, tile_x + tile_size);
                break;
            case 12:
                if (this.collidePlatformLeft(object, tile_x)) {
                    return;
                }
                this.collidePlatformBottom(object, tile_y + tile_size);
                break;
            case 13:
                if (this.collidePlatformTop(object, tile_y)) {
                    return;
                }
                if (this.collidePlatformLeft(object, tile_x)) {
                    return;
                }
                this.collidePlatformBottom(object, tile_y + tile_size);
                break;
            case 14:
                if (this.collidePlatformLeft(object, tile_x)) {
                    return;
                }
                if (this.collidePlatformRight(object, tile_x)) {
                    return;
                }
                this.collidePlatformBottom(object, tile_y + tile_size);
                break;
            case 15:
                if (this.collidePlatformTop(object, tile_y)) {
                    return;
                }
                if (this.collidePlatformLeft(object, tile_x)) {
                    return;
                }
                if (this.collidePlatformRight(object, tile_x + tile_size)) {
                    return;
                }
                this.collidePlatformBottom(object, tile_y + tile_size);
                break;
        }
    }

};

Game.World.Collider.prototype = {

    constructor: Game.World.Collider,

    collidePlatformBottom:function(object, tile_bottom) {
        if ((object.getTop() < tile_bottom) && (object.getOldTop() >= tile_bottom)) {
            object.setTop(tile_bottom);
            object.velocity_y = 0;
            return true;
        }
        return false;
    },

    collidePlatformLeft:function(object, tile_left) {
        if ((object.getRight() > tile_left) && (object.getOldRight() <= tile_left)) {
// TODO: keep rounding?
            object.setRight(tile_left - 0.01); // -0.01 is to fix a small problem with rounding
            object.velocity_x = 0;
            return true;
        }
        return false;
    },

    collidePlatformRight:function(object, tile_right) {
        if ((object.getLeft() < tile_right) && (object.getOldLeft() >= tile_right)) {
            object.setLeft(tile_right);
            object.velocity_x = 0;
            return true;
        }
        return false;
    },

    collidePlatformTop:function(object, tile_top) {
        if ((object.getBottom() > tile_top) && (object.getOldBottom() <= tile_top)) {
// TODO: keep rounding?
            object.setBottom(tile_top - 0.01);
            object.velocity_y = 0;
            object.jumping = false;
            return true;
        }
        return false;
    }

};


/**
 * GAME.WORLD.OBJECT CLASS
 */

Game.World.Object = function(x, y, width, height) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.x_old = x;
    this.y = y;
    this.y_old = y;

};

Game.World.Object.prototype = {

    constructor:Game.World.Object,

    getBottom: function() {
        return (this.y + this.height);
    },

    getLeft: function() {
        return this.x;
    },

    getRight: function() {
        return (this.x + this.width);
    },

    getTop: function() {
        return this.y;
    },

    getOldBottom: function() {
        return (this.y_old + this.height);
    },

    getOldLeft: function() {
        return this.x_old;
    },

    getOldRight: function() {
        return (this.x_old + this.width);
    },

    getOldTop: function() {
        return this.y_old;
    },

    setBottom: function(y) {
        this.y = y - this.height;
    },

    setLeft: function(x) {
        this.x = x;
    },

    setRight: function(x) {
        this.x = x - this.width;
    },

    setTop: function(y) {
        this.y = y;
    },

    setOldBottom: function(y) {
        this.y_old = y - this.height;
    },

    setOldLeft: function(x) {
        this.x_old = x;
    },

    setOldRight: function(x) {
        this.x_old = x - this.width;
    },

    setOldTop: function(y) {
        this.y_old = y;
    }

};


/**
 * GAME.WORLD.PLAYER CLASS
 */

Game.World.Player = function(x, y) {
    //// BEGIN
    Game.World.Object.call(this, 100, 100, 12, 12);

    this.color = "#ff0000";

    this.jumping    = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    //// END
};

Game.World.Player.prototype = {

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
        this.x_old = this.x;
        this.y_old = this.y;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

};

Object.assign(Game.World.Player.prototype, Game.World.Object.prototype);
Game.World.Player.prototype.constructor = Game.World.Player;
