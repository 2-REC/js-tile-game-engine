/**
 * CONTROLLER CLASS
 */

// TODO: separate key up/down?

const Controller = function() {

    //// BEGIN
    this.left  = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up    = new Controller.ButtonInput();
    //// END


    this.keyDownUp = function(type, key_code) {
        //// BEGIN
        var down = (type == "keydown") ? true : false;
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
        //// END
    };

};

// TODO: necessary?
Controller.prototype.constructor = Controller;


/**
 * CONTROLLER.BUTTONINPUT CLASS
 */

 // TODO: rewrite?
Controller.ButtonInput = function() {
    this.active = false;
    this.down = false;
};

Controller.ButtonInput.prototype = {

    constructor : Controller.ButtonInput,

    getInput : function(down) {
        if (this.down != down) {
            this.active = down;
        }
        this.down = down;
    }

};
