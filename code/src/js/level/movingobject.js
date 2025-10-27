/* movingobject.js */

import { GameObject } from "./gameobject.js";


// TODO: rename (?)
/* MovingObject */
export class MovingObject extends GameObject {

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
