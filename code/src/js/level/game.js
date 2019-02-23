/**
 * GAME CLASS
 */

const Game = function() {

    this.world = {

        height: 150,
        width: 250,

        //// BEGIN
        //background_color: "rgba(40,48,56,0.25)",
        background_color: "#0000dd",

        friction: 0.75,
        gravity: 3,

        player: new Game.Player(),


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

    this.update = function() {
        this.world.update();
    };

};

Game.prototype.constructor = Game;


Game.Player = function(x, y) {
    this.width = 16;
    this.height = 16;
    //// BEGIN
    this.color = "#ff0000";

    this.x = 100;
    this.y = 50;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.jumping = true;
    //// END
};

Game.Player.prototype = {

    constructor : Game.Player,

    jump: function() {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= 20; // "-=" or just "-"?
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
