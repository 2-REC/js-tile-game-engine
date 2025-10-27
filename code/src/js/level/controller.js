/* controller.js */

// TODO: separate key up/down

class ButtonInput {

    active = false;
    down = false;

    // TODO: rename method
    getInput(down) {
        if (this.down != down) {
            this.active = down;
        }
        this.down = down;
    }

}


export class Controller {

    left = new ButtonInput();
    right = new ButtonInput();
    up = new ButtonInput();

    /*
    constructor(){
    }
    */

    keyDownUp(type, key_code) {
        const down = (type === "keydown") ? true : false;
        switch (key_code) {
            case 37:
                this.left.getInput(down);
                break;
            case 38:
                this.up.getInput(down);
                break;
            case 39:
                this.right.getInput(down);
                break;
        }
    }

}
