class Spot {
    constructor(x, y, w, set, shape) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.set = set;
        this.shape = shape;
        this.mainColor = 0;
        this.editable = true;
        this.setted = false;
    }

    show() {
        let background;

        switch (this.set) {
            case 0:
                background = 255;
                break;
            case 1:
                background = this.mainColor;
                break;
            case 3:
                background = [0, 0, 255];
                break;
            default:
                background = 120;
                break;
        }

        fill(background);
        stroke(background);

        switch (this.shape) {
            case 'square':
                rect(this.x, this.y, this.w, this.w);
                break;
            case 'circle':
                ellipse(this.x, this.y, this.w, this.w);
                break;
            case 'rounded-square':
                rect(this.x, this.y, this.w, this.w, 5);
                break;
            case 'grid':
                strokeWeight(0.5);
                stroke(255);
                rect(this.x, this.y, this.w, this.w);
                break;
        }

    }

    checkOver(x, y) {
        if (x < this.x + this.w && x > this.x && y < this.y + this.w && y > this.y) {
            return true;
        }
    }

    updateShape(shape) {
        this.shape = shape;
    }

    updateColor(mainColor) {
        this.mainColor = mainColor;
    }

    updateWidth(w) {
        this.x = this.x / this.w * w;
        this.y = this.y / this.w * w;
        this.w = w;
    }

    setVal(value) {

        if (this.editable) {
            this.set = value.toString();
            if (this.set == 1 || this.set == 0) {
                this.setted = true;
            }
        }
    }

    lock() {
        this.editable = false;
        this.setted = true;
    }

    unlock() {
        this.editable = true;
    }
}