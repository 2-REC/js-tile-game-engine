/* objects.js */

// TODO: rename file...

import { GameObject } from "./gameobject.js";
import { Animator } from "./animator.js";


// TODO: CHANGE!
// => First to "chilli", then more generic...
/* Carrot */
export class Carrot extends GameObject {
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
export class Grass extends GameObject {
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
export class Door extends GameObject {

    constructor(door) {
        super(door.x, door.y, door.width, door.height);

        this.destination_x = door.destination_x;
        this.destination_y = door.destination_y;
        this.destination_zone = door.destination_zone;
    }

}
