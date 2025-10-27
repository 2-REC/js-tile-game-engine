/* gameobject.js */

/* GameObject */
export class GameObject {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    collideObject(object) {
        return (
            (this.getRight() >= object.getLeft())
            && (this.getBottom() >= object.getTop())
            && (this.getLeft() <= object.getRight())
            && (this.getTop() <= object.getBottom())
        );
    }

    collideObjectCenter(object) {
        let center_x = object.getCenterX();
        let center_y = object.getCenterY();

        return (
            (center_x >= this.getLeft())
            && (center_x <= this.getRight())
            && (center_y >= this.getTop())
            && (center_y <= this.getBottom())
        );
    }

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
