/**
 * CONTROLLER CLASS
 */

// TODO: separate key up/down?

const Controller = function() {

    //// BEGIN
    this.down  = new Controller.ButtonInput();
    this.left  = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up    = new Controller.ButtonInput();
    //// END


    this.keyDownUp = function(event) {
        //// BEGIN
        var down = (event.type == "keydown") ? true : false;
        switch (event.keyCode) {
            case 37:
                this.left.getInput(down);
                break;
            case 38:
                this.up.getInput(down);
                break;
            case 39:
                this.right.getInput(down);
                break;
            case 40:
                this.down.getInput(down);
                break;
        }
        alert("Key " + event.keyCode + " pressed");
        //// END
    };


    this.handleKeyDownUp = (event) => { this.keyDownUp(event); };

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
