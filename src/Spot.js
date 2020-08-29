class Spot {
    constructor(x, y, w, set, shape) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.set = set;
        this.shape = shape;
        this.mainColor;
        this.editable = true;
    }

    show() {
        let background;

        if (this.set == 1) {
            background = this.mainColor;
        } else if (this.set == 0) {
            background = 255;

        } else if (this.set == 2) {
            background = [0, 0, 255];
        }
        else {
            background = 120;
        }

        fill(background);
        stroke(background);

        switch (this.shape) {
            case "square":
                rect(this.x, this.y, this.w, this.w);
                break;
            case "circle":
                ellipse(this.x, this.y, this.w, this.w);
                break;

            case "rounded-square":
                rect(this.x, this.y, this.w, this.w, 5);
                break;
            case "grid":
                strokeWeight(0.5);
                stroke(255);
                rect(this.x, this.y, this.w, this.w);
                break;
        }

    }

    checkOver(x, y) {
        if (x < this.x + this.w && x > this.x && y < this.y + this.w && y > this.y) {
            console.log(this.set);
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
            this.set = value;
        }
    }

    lock() {
        this.editable = false;
    }

    unlock() {
        this.editable = true;
    }

}