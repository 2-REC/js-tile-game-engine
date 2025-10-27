/* game.js */

// TODO: split in files




/* GameFrame */
// TODO: rename to AnimationFrame?
class GameFrame {
    constructor(x, y, width, height, offset_x=0, offset_y=0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.offset_x = offset_x;
        this.offset_y = offset_y;
    }

}


/* Tileset */

class Tileset {

    constructor(columns, tile_size) {
        this.columns = columns;
        this.tile_size = tile_size;

// TODO: change this and get it from data files
// TODO: remove carrots, grass, etc from here!
// SIZE_FACTOR
/*
        this.frames = [new GameFrame(115,  96, 13, 16, 0, -2), // idle-left
                                new GameFrame( 50,  96, 13, 16, 0, -2), // jump-left
                                new GameFrame(102,  96, 13, 16, 0, -2), new GameFrame(89, 96, 13, 16, 0, -2), new GameFrame(76, 96, 13, 16, 0, -2), new GameFrame(63, 96, 13, 16, 0, -2), // walk-left
                                new GameFrame(  0, 112, 13, 16, 0, -2), // idle-right
                                new GameFrame( 65, 112, 13, 16, 0, -2), // jump-right
                                new GameFrame( 13, 112, 13, 16, 0, -2), new GameFrame(26, 112, 13, 16, 0, -2), new GameFrame(39, 112, 13, 16, 0, -2), new GameFrame(52, 112, 13, 16, 0, -2), // walk-right
                                new GameFrame( 81, 112, 14, 16), new GameFrame(96, 112, 16, 16), // carrot
                                new GameFrame(112, 115, 16,  4), new GameFrame(112, 124, 16, 4), new GameFrame(112, 119, 16, 4) // grass
                                ];
*/
        this.frames = [new GameFrame(460,  384, 52, 64, 0, -8), // idle-left
                                new GameFrame( 200,  384, 52, 64, 0, -8), // jump-left
                                new GameFrame(408,  384, 52, 64, 0, -8), new GameFrame(356, 384, 52, 64, 0, -8), new GameFrame(304, 384, 52, 64, 0, -8), new GameFrame(252, 384, 52, 64, 0, -8), // walk-left
                                new GameFrame(  0, 448, 52, 64, 0, -8), // idle-right
                                new GameFrame( 260, 448, 52, 64, 0, -8), // jump-right
                                new GameFrame( 52, 448, 52, 64, 0, -8), new GameFrame(104, 448, 52, 64, 0, -8), new GameFrame(156, 448, 52, 64, 0, -8), new GameFrame(208, 448, 52, 64, 0, -8), // walk-right
                                new GameFrame( 324, 448, 56, 64), new GameFrame(384, 448, 64, 64), // chilli
                                new GameFrame(448, 460, 64,  16), new GameFrame(448, 496, 64, 16), new GameFrame(448, 476, 64, 16) // grass
                                ];

    }

}



// TODO: rename to CollisionManager
/* GameCollider */
// TODO: doesn't need to be a class...(?)
class GameCollider {

    collide(value, object, tile_x, tile_y, tile_size) {

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

    collidePlatformBottom(object, tile_bottom) {
        if ((object.getTop() < tile_bottom) && (object.getOldTop() >= tile_bottom)) {
            object.setTop(tile_bottom);
            object.velocity_y = 0;
            return true;
        }
        return false;
    }

    collidePlatformLeft(object, tile_left) {
        if ((object.getRight() > tile_left) && (object.getOldRight() <= tile_left)) {
// TODO: keep rounding?
            object.setRight(tile_left - 0.01); // -0.01 is to fix a small problem with rounding
            object.velocity_x = 0;
            return true;
        }
        return false;
    }

    collidePlatformRight(object, tile_right) {
        if ((object.getLeft() < tile_right) && (object.getOldLeft() >= tile_right)) {
            object.setLeft(tile_right);
            object.velocity_x = 0;
            return true;
        }
        return false;
    }

    collidePlatformTop(object, tile_top) {
        if ((object.getBottom() > tile_top) && (object.getOldBottom() <= tile_top)) {
// TODO: keep rounding?
            object.setBottom(tile_top - 0.01);
            object.velocity_y = 0;
            object.jumping = false;
            return true;
        }
        return false;
    }

}




/* GameObject */

class GameObject {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    collideObject(object) {
        if ((this.getRight() < object.getLeft())
                || (this.getBottom() < object.getTop())
                || (this.getLeft() > object.getRight())
                || (this.getTop() > object.getBottom())) {
            return false;
        }
        return true;
    }

    collideObjectCenter(object) {
        let center_x = object.getCenterX();
        let center_y = object.getCenterY();

        if ((center_x < this.getLeft()) || (center_x > this.getRight())
                || (center_y < this.getTop()) || (center_y > this.getBottom())) {
            return false;
        }
        return true;
    }

// TODO: change to get/set methods
    getCenterX() {
        return (this.x + (this.width  * 0.5));
    }

    getCenterY() {
        return (this.y + (this.height * 0.5));
    }

    getBottom() {
        return (this.y + this.height);
    }

    getLeft() {
        return this.x;
    }

    getRight() {
        return (this.x + this.width);
    }

    getTop() {
        return this.y;
    }

    setCenterX(x) {
        this.x = x - (this.width  * 0.5);
    }

    setCenterY(y) {
        this.y = y - (this.height * 0.5);
    }

    setBottom(y) {
        this.y = y - this.height;
    }

    setLeft(x) {
        this.x = x;
    }

    setRight(x) {
        this.x = x - this.width;
    }

    setTop(y) {
        this.y = y;
    }

}



// TODO: rename (?)
/* MovingObject */

class MovingObject extends GameObject {

// SIZE_FACTOR
//    constructor(x, y, width, height, velocity_max = 15) {
    constructor(x, y, width, height, velocity_max = 60) {
        super(x, y, width, height);

        this.x_old = x;
        this.y_old = y;

        this.velocity_max = velocity_max;
        this.velocity_x = 0;
        this.velocity_y = 0;

        this.jumping = false;
    }

// TODO:change to getters/setters
    getOldBottom() {
        return (this.y_old + this.height);
    }

    getOldCenterX() {
        return (this.x_old + (this.width  * 0.5));
    }

    getOldCenterY() {
        return (this.y_old + (this.height * 0.5));
    }

    getOldLeft() {
        return this.x_old;
    }

    getOldRight() {
        return (this.x_old + this.width);
    }

    getOldTop() {
        return this.y_old;
    }

    setOldBottom(y) {
        this.y_old = y - this.height;
    }

    setOldCenterX(x) {
        this.x_old = x - (this.width  * 0.5);
    }

    setOldCenterY(y) {
        this.y_old = y - (this.height * 0.5);
    }

    setOldLeft(x) {
        this.x_old = x;
    }

    setOldRight(x) {
        this.x_old = x - this.width;
    }

    setOldTop(y) {
        this.y_old = y;
    }

}




/* Animator */

class Animator {

    constructor(frame_set, delay, mode = "loop") {
        this.frame_set = frame_set;
        this.frame_index = 0;
        this.frame_value = frame_set[0];

        this.count = 0;
        this.delay = (delay >= 1) ? delay : 1;

        this.mode = mode;
    }

    animate() {
        switch(this.mode) {
            case "loop" :
                this.loop();
                break;
            case "pause":
                break;
        }
    }

    // TODO: delay 10?
    changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) {
        if (this.frame_set === frame_set) {
            return;
        }

        this.frame_set = frame_set;
        this.frame_index = frame_index;
        this.frame_value = frame_set[frame_index];
        this.count = 0;
        this.delay = delay;
        this.mode = mode;
    }

    loop() {
        this.count++;
        while(this.count > this.delay) {
            this.count -= this.delay;
            this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;
            this.frame_value = this.frame_set[this.frame_index];
        }
    }

}




/* Player */

class Player extends MovingObject {

// TODO: get this from files and generate dynamically
    frame_sets = {
        "idle-left": [0],
        "jump-left": [1],
        "move-left": [2, 3, 4, 5],
        "idle-right": [6],
        "jump-right": [7],
        "move-right": [8, 9, 10, 11]
    }


    constructor(x, y) {
// SIZE_FACTOR
//        super(x, y, 7, 12);
        super(x, y, 28, 48);

        this.direction_x = -1;
        this.velocity_x = 0;
        this.velocity_y = 0;

        // start by 'falling'
        this.jumping = true;

        this.animator = new Animator(this.frame_sets["idle-left"], 10);
    }

    jump() {
// TODO: velocity_y not 0?
// TODO: keep hardcoded?
// SIZE_FACTOR
//        if (!this.jumping && (this.velocity_y < 10)) {
        if (!this.jumping && (this.velocity_y < 20)) {
            this.jumping = true;
// TODO: "-=" or just "-"?
// TODO: should adapt, and fix tunneling issue...
// SIZE_FACTOR
//            this.velocity_y -= 13;
            this.velocity_y -= 26;
        }
    }

// TODO: remove hardcoded values
    moveLeft() {
// SIZE_FACTOR
//    	this.direction_x = -1;
//        this.velocity_x -= 0.55;
    	this.direction_x = -4;
        this.velocity_x -= 2.2;
    }

    moveRight() {
// SIZE_FACTOR
//    	this.direction_x = 1;
//        this.velocity_x += 0.55;
    	this.direction_x = 4;
        this.velocity_x += 2.2;
    }

    updatePosition(gravity, friction) {
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

    updateAnimation() {
        if (this.velocity_y < 0) {
            if (this.direction_x < 0) {
                this.animator.changeFrameSet(this.frame_sets["jump-left"], "pause");
            }
            else {
                this.animator.changeFrameSet(this.frame_sets["jump-right"], "pause");
            }
        }
        else if (this.direction_x < 0) {
            if (this.velocity_x < -0.1) {
                this.animator.changeFrameSet(this.frame_sets["move-left"], "loop", 5);
            }
            else {
                this.animator.changeFrameSet(this.frame_sets["idle-left"], "pause");
            }
        }
        else if (this.direction_x > 0) {
            if (this.velocity_x > 0.1) {
                this.animator.changeFrameSet(this.frame_sets["move-right"], "loop", 5);
            }
            else {
                this.animator.changeFrameSet(this.frame_sets["idle-right"], "pause");
            }
        }
        this.animator.animate();
    }

}





/* game World */
class GameWorld {

    constructor() {
        this.collider = new GameCollider();

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







export class Game {

    constructor() {
        this.world = new GameWorld();

    }

    update() {
        this.world.update();
    }

}








// TODO: CHANGE!
// => First to "chilli", then more generic...
/* Carrot */

// TODO: make AnimatedObject
class Carrot extends GameObject {
    frame_sets = {
        "twirl":[12, 13]
    };


    constructor(x, y) {
// SIZE_FACTOR
//        super(x, y, 7, 14);
        super(x, y, 28, 56);

        this.animator = new Animator(this.frame_sets["twirl"], 15);
        this.frame_index = Math.floor(Math.random() * 2);

// TODO2: why remove?
// TODO: remove that...
        this.base_x = x;
        this.base_y = y;
        this.position_x = Math.random() * Math.PI * 2;
        this.position_y = this.position_x * 2;
    }

// TODO: no animator update?
    updatePosition() {
// SIZE_FACTOR
//        this.position_x += 0.1;
//        this.position_y += 0.2;
        this.position_x += 0.4;
        this.position_y += 0.2;

        this.x = this.base_x + Math.cos(this.position_x) * 2;
        this.y = this.base_y + Math.sin(this.position_y);
    }

    animate() {
        this.animator.animate();
    }

}



/* grass */

class Grass extends GameObject {
    frame_sets = {
        "wave":[14, 15, 16, 15]
    };


// TODO: width/height!?
    constructor(x, y) {
        super(x, y, 0, 0);

        this.animator = new Animator(this.frame_sets["wave"], 25);

    }

    animate() {
        this.animator.animate();
    }

}



/* Door */

class Door extends GameObject {

    constructor(door) {
        super(door.x, door.y, door.width, door.height);

        this.destination_x = door.destination_x;
        this.destination_y = door.destination_y;
        this.destination_zone = door.destination_zone;
    }

}
