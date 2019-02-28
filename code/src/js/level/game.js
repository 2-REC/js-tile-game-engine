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
 * GAME.ANIMATOR CLASS
 */

Game.Animator = function(frame_set, delay) {
    this.count = 0;
    this.delay = (delay >= 1) ? delay : 1;
    this.frame_set = frame_set;
    this.frame_index = 0;
    this.frame_value = frame_set[0];
    this.mode = "pause";
};

Game.Animator.prototype = {

    constructor: Game.Animator,

    animate: function() {
        switch(this.mode) {
            case "loop" :
                this.loop();
                break;
            case "pause":
                break;
        }
    },

// TODO: why not defined as "function"?
    changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) {
        if (this.frame_set === frame_set) {
            return;
        }

        this.count = 0;
        this.delay = delay;
        this.frame_set = frame_set;
        this.frame_index = frame_index;
        this.frame_value = frame_set[frame_index];
        this.mode = mode;
    },

    loop: function() {
        this.count++;
        while(this.count > this.delay) {
            this.count -= this.delay;
            this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;
            this.frame_value = this.frame_set[this.frame_index];
        }
    }

};


/**
 * GAME.COLLIDER CLASS
 */

Game.Collider = function() {

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
                if (this.collidePlatformBottom(object, tile_y + tile_size)) {
                    return;
                }
                this.collidePlatformRight(object, tile_x + tile_size);
                break;
            case  7:
                if (this.collidePlatformTop(object, tile_y)) {
                    return;
                }
                if (this.collidePlatformBottom(object, tile_y + tile_size)) {
                    return;
                }
                this.collidePlatformRight(object, tile_x + tile_size);
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
                if (this.collidePlatformBottom(object, tile_y + tile_size)) {
                    return;
                }
                this.collidePlatformLeft(object, tile_x);
                break;
            case 13:
                if (this.collidePlatformTop(object, tile_y)) {
                    return;
                }
                if (this.collidePlatformBottom(object, tile_y + tile_size)) {
                    return;
                }
                this.collidePlatformLeft(object, tile_x);
                break;
            case 14:
                if (this.collidePlatformBottom(object, tile_y + tile_size)) {
                    return;
                }
                if (this.collidePlatformLeft(object, tile_x)) {
                    return;
                }
                this.collidePlatformRight(object, tile_x);
                break;
            case 15:
                if (this.collidePlatformTop(object, tile_y)) {
                    return;
                }
                if (this.collidePlatformBottom(object, tile_y + tile_size)) {
                    return;
                }
                if (this.collidePlatformLeft(object, tile_x)) {
                    return;
                }
                this.collidePlatformRight(object, tile_x + tile_size);
                break;
        }
    }

};

Game.Collider.prototype = {

    constructor: Game.Collider,

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
 * GAME.FRAME CLASS
 */

Game.Frame = function(x, y, width, height, offset_x, offset_y) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offset_x = offset_x;
    this.offset_y = offset_y;
};

Game.Frame.prototype.constructor = Game.Frame;


/**
 * GAME.OBJECT CLASS
 */

Game.Object = function(x, y, width, height) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

};

Game.Object.prototype = {

    constructor: Game.Object,

    getCenterX: function() {
        return (this.x + (this.width  * 0.5));
    },

    getCenterY: function() {
        return (this.y + (this.height * 0.5));
    },

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

    setCenterX: function(x) {
        this.x = x - (this.width  * 0.5);
    },

    setCenterY: function(y) {
        this.y = y - (this.height * 0.5);
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
    }

};


/**
 * GAME.MOVINGOBJECT CLASS
 */

Game.MovingObject = function(x, y, width, height, velocity_max = 15) {

    Game.Object.call(this, x, y, width, height);

    this.jumping = false;
    this.velocity_max = velocity_max;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.x_old = x;
    this.y_old = y;

};

Game.MovingObject.prototype = {

    getOldBottom: function() {
        return (this.y_old + this.height);
    },

    getOldCenterX: function() {
        return (this.x_old + (this.width  * 0.5));
    },

    getOldCenterY: function() {
        return (this.y_old + (this.height * 0.5));
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

    setOldBottom: function(y) {
        this.y_old = y - this.height;
    },

    setOldCenterX: function(x) {
        this.x_old = x - (this.width  * 0.5);
    },

    setOldCenterY: function(y) {
        this.y_old = y - (this.height * 0.5);
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

Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;


/**
 * GAME.DOOR CLASS
 */

Game.Door = function(door) {

    Game.Object.call(this, door.x, door.y, door.width, door.height);

    this.destination_x = door.destination_x;
    this.destination_y = door.destination_y;
    this.destination_zone = door.destination_zone;

};

Game.Door.prototype = {

    collideObject(object) {
        let center_x = object.getCenterX();
        let center_y = object.getCenterY();

        if ((center_x < this.getLeft()) || (center_x > this.getRight())
                || (center_y < this.getTop())  || (center_y > this.getBottom())) {
            return false;
        }

        return true;
    }

};

Object.assign(Game.Door.prototype, Game.Object.prototype);
Game.Door.prototype.constructor = Game.Door;


/**
 * GAME.PLAYER CLASS
 */

Game.Player = function(x, y) {

    Game.MovingObject.call(this, x, y, 7, 12);
    Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-left"], 10);

    this.jumping = true;
    this.direction_x = -1;
    this.velocity_x = 0;
    this.velocity_y = 0;
};

Game.Player.prototype = {

// TODO: get this from files and generate dynamically
    frame_sets: {
        "idle-left": [0],
        "jump-left": [1],
        "move-left": [2, 3, 4, 5],
        "idle-right": [6],
        "jump-right": [7],
        "move-right": [8, 9, 10, 11]
    },

    jump: function() {
// TODO: keep hardcoded 10?
        if (!this.jumping && (this.velocity_y < 10)) {
            this.jumping = true;
// TODO: "-=" or just "-"?
// TODO: should adapt, and fix tunneling issue...
            this.velocity_y -= 13;
        }
    },

    moveLeft: function() {
    	this.direction_x = -1;
        this.velocity_x -= 0.55;
    },

    moveRight: function() {
    	this.direction_x = 1;
        this.velocity_x += 0.55;
    },

    updateAnimation: function() {
        if (this.velocity_y < 0) {
            if (this.direction_x < 0) {
                this.changeFrameSet(this.frame_sets["jump-left"], "pause");
            }
            else {
                this.changeFrameSet(this.frame_sets["jump-right"], "pause");
            }
        }
        else if (this.direction_x < 0) {
            if (this.velocity_x < -0.1) {
                this.changeFrameSet(this.frame_sets["move-left"], "loop", 5);
            }
            else {
                this.changeFrameSet(this.frame_sets["idle-left"], "pause");
            }
        }
        else if (this.direction_x > 0) {
            if (this.velocity_x > 0.1) {
                this.changeFrameSet(this.frame_sets["move-right"], "loop", 5);
            }
            else {
                this.changeFrameSet(this.frame_sets["idle-right"], "pause");
            }
        }
        this.animate();
    },

    updatePosition: function(gravity, friction) {
        this.x_old = this.x;
        this.y_old = this.y;

        this.velocity_x *= friction;
        this.velocity_y += gravity;

        if (Math.abs(this.velocity_x) > this.velocity_max) {
            this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);
        }

        if (Math.abs(this.velocity_y) > this.velocity_max) {
            this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);
        }

        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

};

Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;


/**
 * GAME.TILESET CLASS
 */

Game.TileSet = function(columns, tile_size) {

    this.columns = columns;
    this.tile_size = tile_size;

    let frame = Game.Frame;

// TODO: change this and get it from data files
    this.frames = [new frame(115,  96, 13, 16, 0, -2), // idle-left
                             new frame( 50,  96, 13, 16, 0, -2), // jump-left
                             new frame(102,  96, 13, 16, 0, -2), new frame(89, 96, 13, 16, 0, -2), new frame(76, 96, 13, 16, 0, -2), new frame(63, 96, 13, 16, 0, -2), // walk-left
                             new frame(  0, 112, 13, 16, 0, -2), // idle-right
                             new frame( 65, 112, 13, 16, 0, -2), // jump-right
                             new frame( 13, 112, 13, 16, 0, -2), new frame(26, 112, 13, 16, 0, -2), new frame(39, 112, 13, 16, 0, -2), new frame(52, 112, 13, 16, 0, -2) // walk-right
                             ];

};

Game.TileSet.prototype = {
    constructor: Game.TileSet
};


/**
 * GAME.WORLD CLASS
 */
 
Game.World = function() {

    this.collider = new Game.Collider();

    //// BEGIN
// TODO: get from config (where? how?) (with some other additional parameters)
    this.friction = 0.85;
    this.gravity = 2;

// TODO: get size data from file (json?)
    this.columns = 12;
    this.rows = 9;

    this.tile_set = new Game.TileSet(8, 16);

// TODO: handle other objects ... (create from map data - other layers)
    this.player = new Game.Player(32, 76);

    this.zone_id   = "00";
    //// END

    this.doors = [];
    this.door = undefined;

    this.height = this.tile_set.tile_size * this.rows;
    this.width = this.tile_set.tile_size * this.columns;

};

Game.World.prototype = {

    constructor: Game.World,

// TODO: adapt... (use collision tilemap)
    collideObject: function(object) {

        /* check collision with each corner of the object */
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

    },

    setup: function(zone) {

        this.graphical_map = zone.graphical_map;
        this.collision_map = zone.collision_map;
        this.columns = zone.columns;
        this.rows = zone.rows;
        this.doors = new Array();
        this.zone_id = zone.id;

        for (let index = zone.doors.length - 1; index > -1; --index) {
            let door = zone.doors[index];
            this.doors[index] = new Game.Door(door);
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
    },

    update: function() {
        this.player.updatePosition(this.gravity, this.friction);

        this.collideObject(this.player);

        for (let index = this.doors.length - 1; index > -1; --index) {
            let door = this.doors[index];
            if (door.collideObject(this.player)) {
                this.door = door;
            }
        }
        this.player.updateAnimation();
    }

};






