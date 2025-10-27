/* player */

import { MovingObject } from "./movingobject.js";
import { Animator } from "./animator.js";


/* Player */
export class Player extends MovingObject {
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
