let matrix = [];
let rows = 21;
let cols = 21;

const NOTSET = 99;

let dupla = [];
let x = rows - 1;
let y = cols - 1;
let duplaIndex = 0;
let placeIndex = 0;

let inData = [];


function setup() {
    let canvas = createCanvas(300, 300);
    canvas.parent("canvas");

    let w = height / rows;

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            let spot = new Spot(i * w, j * w, w, 0);
            matrix.push(spot);
        }
    }
}

function updateMatrix(version) {
    let mat = MATRIX[version];

    if (rows - mat != 0) {
        rows = mat;
        cols = mat;
        matrix.length = 0;
        let w = height / rows;
        for (let j = 0; j < cols; j++) {
            for (let i = 0; i < rows; i++) {
                let spot = new Spot(i * w, j * w, w, 0);
                matrix.push(spot);
            }
        }
    }
}

function draw() {
    background(255);

    rectMode(CORNER);
    ellipseMode(CORNER);
    angleMode(RADIANS);
    noStroke();
    fill(255);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i].show();
    }
}

function restart(size) {
    let newSize = mapRange(size, 1, 70, 100, 400);
    

    resizeCanvas(newSize, newSize);
    let w = height / rows;


    for (let i = 0; i < matrix.length; i++) {
        matrix[i].set = 0;
        matrix[i].updateWidth(w);
    }

    x = rows - 1;
    y = cols - 1;
    placeIndex = 0;

}


function place(data, version, shape, mainColor, size) {
    let maskN = parseInt(data.mask);

    updateMatrix(version);
    restart(size);
    inData = Array.from(data.data)


    if (version == 1) {
        placeVersion1();
    } else if (version == 2) {
        placeVersion2();
    } else if (version == 3) {
        placeVersion3();
    }

    mask(maskN);

    if (version == 2) {
        alignmentPatterns(16, 16);
    } else if (version == 3) {
        alignmentPatterns(20, 20);
    }

    finderPatterns(0, 0);
    finderPatterns(rows - 7, 0);
    finderPatterns(0, rows - 7);
    separators();
    timing();
    darkModule(version);
    formatBits(maskN, data.correction);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i].updateShape(shape);
        matrix[i].updateColor(mainColor);
    }

}

function placeVersion3() {
    up(20);
    left(2);
    down(20);
    left(2);
    up(4);
    upSkip(6);
    up(11);
    left(2);
    down(11);
    downSkip(6);
    down(4);
    left(2);

    up(4);

    left(1);
    ver(5);
    upSkip(1);
    right(1);

    up(13);

    upSkip(2);
    up(6);
    left(2);
    down(6);
    downSkip(2);
    down(22);
    left(2);
    up(22);
    upSkip(2);

    up(6);
    left(2);
    down(6);
    downSkip(2);
    down(22);
    left(2);

    up(22);

    upSkip(2);
    up(6);
    left(2);
    down(6);
    downSkip(2);
    down(22);

    left(2);
    upSkip(8);
    up(12);

    left(3);
    down(12);

    left(2);
    up(12);
    left(2);
    down(8);
}

function placeVersion2() {
    up(16);

    left(2);

    down(16);
    left(2);
    up(4);

    upSkip(6);
    up(7);

    left(2);
    down(7);

    downSkip(6);
    down(4);

    left(2);
    up(4);

    left(1);
    ver(5);
    upSkip(1);
    right(1);


    up(9);

    upSkip(2);

    up(6);

    left(2);

    down(6);

    downSkip(2)

    down(18)

    left(2);

    up(18);

    upSkip(2);
    up(6);

    left(2);

    down(6);

    downSkip(2)

    down(18);

    left(2);

    upSkip(8);
    up(8);

    left(3);

    down(8);

    left(2);

    up(8);
    left(2);

    //Ajustar este último a la longitud de array entrada (ej: 2-L --> 352)
    down(4);


}


function placeVersion1() {
    up(12);

    left(2)
    down(12);

    left(2)
    up(12);

    left(2)
    down(12);

    left(2)
    up(14);

    upSkip(2);
    up(6);

    left(2);

    down(6);

    downSkip(2)

    down(14)

    left(2);

    upSkip(8);
    up(4);

    left(3);

    down(4);

    left(2);

    up(4);
    left(2);
    down(4);
}


function mask(number) {
    window["mask" + number]();
}

function mask0() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((i + j) % 2 == 0) {
                if (matrix[index(i, j, rows)].set == 1) {
                    matrix[index(i, j, rows)].set = 0;
                } else if (matrix[index(i, j, rows)].set == 0) {
                    matrix[index(i, j, rows)].set = 1;
                }
            }
        }
    }
}


function mask1() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if (j % 2 == 0) {
                if (matrix[index(i, j, rows)].set == 1) {
                    matrix[index(i, j, rows)].set = 0;
                } else if (matrix[index(i, j, rows)].set == 0) {
                    matrix[index(i, j, rows)].set = 1;
                }
            }
        }
    }
}

function mask2() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if (i % 3 == 0) {
                if (matrix[index(i, j, rows)].set == 1) {
                    matrix[index(i, j, rows)].set = 0;
                } else if (matrix[index(i, j, rows)].set == 0) {
                    matrix[index(i, j, rows)].set = 1;
                }
            }
        }
    }
}

function mask3() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((i + j) % 3 == 0) {
                if (matrix[index(i, j, rows)].set == 1) {
                    matrix[index(i, j, rows)].set = 0;
                } else if (matrix[index(i, j, rows)].set == 0) {
                    matrix[index(i, j, rows)].set = 1;
                }
            }
        }
    }
}

function mask4() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((Math.floor(j / 2) + Math.floor(i / 3)) % 2 == 0) {
                if (matrix[index(i, j, rows)].set == 1) {
                    matrix[index(i, j, rows)].set = 0;
                } else if (matrix[index(i, j, rows)].set == 0) {
                    matrix[index(i, j, rows)].set = 1;
                }
            }
        }
    }
}

function mask5() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((((i * j) % 2) + ((i * j) % 3)) == 0) {
                if (matrix[index(i, j, rows)].set == 1) {
                    matrix[index(i, j, rows)].set = 0;
                } else if (matrix[index(i, j, rows)].set == 0) {
                    matrix[index(i, j, rows)].set = 1;
                }
            }
        }
    }
}

function mask6() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((((i * j) % 2) + ((i * j) % 3)) % 2 == 0) {
                if (matrix[index(i, j, rows)].set == 1) {
                    matrix[index(i, j, rows)].set = 0;
                } else if (matrix[index(i, j, rows)].set == 0) {
                    matrix[index(i, j, rows)].set = 1;
                }
            }
        }
    }
}

function mask7() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((((i + j) % 2) + ((i * j) % 3)) % 2 == 0) {
                if (matrix[index(i, j, rows)].set == 1) {
                    matrix[index(i, j, rows)].set = 0;
                } else if (matrix[index(i, j, rows)].set == 0) {
                    matrix[index(i, j, rows)].set = 1;
                }
            }
        }
    }
}


function formatBits(mask, correction) {
    let bits = FORMATINFORMATION[mask][correction];
    // if (mask == 0) {
    //     bits = FORMATINFORMATION[mask][correction]
    // } else if (mask == 1) {
    //     bits = FORMATINFORMATION1[correction]
    // }

    matrix[index(8, cols - 1, cols)].set = bits[0];
    matrix[index(8, cols - 2, cols)].set = bits[1];
    matrix[index(8, cols - 3, cols)].set = bits[2];
    matrix[index(8, cols - 4, cols)].set = bits[3];
    matrix[index(8, cols - 5, cols)].set = bits[4];
    matrix[index(8, cols - 6, cols)].set = bits[5];
    matrix[index(8, cols - 7, cols)].set = bits[6];
    matrix[index(8, 8, cols)].set = bits[7];
    matrix[index(8, 7, cols)].set = bits[8];
    matrix[index(8, 5, cols)].set = bits[9];
    matrix[index(8, 4, cols)].set = bits[10];
    matrix[index(8, 3, cols)].set = bits[11];
    matrix[index(8, 2, cols)].set = bits[12];
    matrix[index(8, 1, cols)].set = bits[13];
    matrix[index(8, 0, cols)].set = bits[14];



    matrix[index(0, 8, cols)].set = bits[0];
    matrix[index(1, 8, cols)].set = bits[1];
    matrix[index(2, 8, cols)].set = bits[2];
    matrix[index(3, 8, cols)].set = bits[3];
    matrix[index(4, 8, cols)].set = bits[4];
    matrix[index(5, 8, cols)].set = bits[5];
    matrix[index(7, 8, cols)].set = bits[6];
    matrix[index(cols - 8, 8, cols)].set = bits[7];
    matrix[index(cols - 7, 8, cols)].set = bits[8];
    matrix[index(cols - 6, 8, cols)].set = bits[9];
    matrix[index(cols - 5, 8, cols)].set = bits[10];
    matrix[index(cols - 4, 8, cols)].set = bits[11];
    matrix[index(cols - 3, 8, cols)].set = bits[12];
    matrix[index(cols - 2, 8, cols)].set = bits[13];
    matrix[index(cols - 1, 8, cols)].set = bits[14];

}

function upSkip(num) {
    y -= num;
}

function downSkip(num) {
    y += num;
}

function left(num) {
    x -= num;
}

function right(num) {
    x += num;
}

function up(num) {
    for (let i = 0; i < num; i++) {
        hor(x, y, inData[placeIndex]);
        y--;
    }
    y++;
}

function ver(num) {
    for (let i = 0; i < num; i++) {
        y--;
        matrix[index(x, y, rows)].set = inData[placeIndex];
        placeIndex++;
    }
}

function down(num) {
    for (let i = 0; i < num; i++) {
        hor(x, y, inData[placeIndex]);
        y++;
    }
    y--;

}

function hor(x, y) {
    let ind = index(x, y, rows);
    matrix[ind].set = inData[placeIndex];
    placeIndex++;
    ind = index(x - 1, y, rows);
    matrix[ind].set = inData[placeIndex];
    placeIndex++;
}

function finderPatterns(ioff, joff) {
    const pattern = "0000000011111001000100100010010001001111100000000";

    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 7; i++) {
            if (pattern[index(i, j, 7)] == "1") {
                matrix[index(i + ioff, j + joff, rows)].set = 0;
            } else {
                matrix[index(i + ioff, j + joff, rows)].set = 1;
            }
        }
    }
}


function alignmentPatterns(x, y) {
    const pattern = "1111110001101011000111111";
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
            if (pattern[index(i, j, 5)] == "0") {
                matrix[index(i + x, j + y, rows)].set = 0;
            } else {
                matrix[index(i + x, j + y, rows)].set = 1;
            }
        }
    }

}

function separators() {
    separator(7, 0, 'vertical');
    separator(7, 0, 'horizontal');
    separator(cols - 8, 0, 'vertical');
    separator(cols - 8, 0, 'horizontal');
    separator(7, cols - 8, 'vertical');
    separator(7, cols - 8, 'horizontal');
    reservedArea(8, 0, 9, 'vertical');
    reservedArea(8, 0, 9, 'horizontal');


    reservedArea(8, cols - 8, 8, 'horizontal');
    reservedArea(8, cols - 8, 8, 'vertical');
}

function timing() {
    let off = cols - 16;
    for (let i = 0; i < off; i++) {
        if (i % 2 == 0) {
            matrix[index(i + 8, 6, rows)].set = 1;
            matrix[index(6, i + 8, rows)].set = 1;
        } else {
            matrix[index(i + 8, 6, rows)].set = 0;
            matrix[index(6, i + 8, rows)].set = 0;
        }

    }
}

function separator(ioff, joff, dir) {
    if (dir == 'vertical') {
        for (let j = 0; j < 8; j++) {
            matrix[index(ioff, j + joff, rows)].set = 0;
        }
    } else {
        for (let j = 0; j < 8; j++) {
            matrix[index(j + joff, ioff, rows)].set = 0;
        }
    }
}

function darkModule(ver) {
    let pos = 4 * ver + 9;
    matrix[index(8, pos, rows)].set = 1;
}


function reservedArea(ioff, joff, len, dir) {
    if (dir == 'vertical') {
        for (let j = 0; j < len; j++) {
            matrix[index(ioff, j + joff, rows)].set = 2;
        }
    } else {
        for (let j = 0; j < len; j++) {
            matrix[index(j + joff, ioff, rows)].set = 2;
        }
    }
}

function index(i, j, z) {
    return i + j * z;
}


class Spot {
    constructor(x, y, w, set, shape) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.set = set;
        this.shape = shape;
        this.mainColor;
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
        noStroke();

        switch (this.shape){
            case "square":
                rect(this.x, this.y, this.w, this.w);
                break;
            case "circle":
                ellipse(this.x, this.y, this.w, this.w);
                break;

            case "rounded-square":
                rect(this.x, this.y, this.w, this.w, 5);
                break;
        }

        if (this.shape == "square") {
            rect(this.x, this.y, this.w, this.w);
        } else if (this.shape == "circle") {
            ellipse(this.x, this.y, this.w, this.w);
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

    updateColor(mainColor){
        this.mainColor = mainColor;
    }

    updateWidth(w){
        this.x = this.x/this.w * w;
        this.y = this.y/this.w * w;
        this.w = w;
        
    }

}

function mouseClicked() {
    let x = mouseX;
    let y = mouseY;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].checkOver(x, y)) {

            console.log(matrix[index(x, y, rows)]);
            console.log(i)
            //   if (matrix[i].set == 1) {
            //      matrix[i].set = 0;
            //    } else {
            //        matrix[i].set = 1;
            //    }
        };
    }
}

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
