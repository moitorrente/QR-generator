let matrix = [];
const rows = 21;
const cols = 21;

const prueba = "0010000001011011000010110111100011010001011100101101110001001101010000110100000011101100000100011110110000010001111011000001000111000100001000110010011101110111111010111101011111100111111000100101110100010111";

const NOTSET = 99;

let dupla = [];
let x = rows - 1;
let y = cols - 1;
let duplaIndex = 0;


function setup() {
    createCanvas(420, 420);
    let w = height / rows;

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            let spot = new Spot(i * w, j * w, w, NOTSET);
            matrix.push(spot);
        }
    }

    //place(prueba);

}


function mask() {
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

function draw() {
    background(100);

    rectMode(CORNER);
    fill(255);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i].show();
    }
}

function restart() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            matrix[index(i, j, cols)].set = NOTSET;
        }
    }

    dupla.length = 0;
    x = rows - 1;
    y = cols - 1;
    duplaIndex = 0;
}


function place(data) {

    restart();
    let inData = Array.from(data)

    while (inData.length > 0) {
        dupla.push(inData.splice(0, 2).join(""));
    }

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




    mask();

    finderPatterns(0, 0);
    finderPatterns(rows - 7, 0);
    finderPatterns(0, rows - 7);
    separators();
    timing();
    darkModule(1);
    formatBits("101010000010010");             
}

function formatBits(bits){
    matrix[index(8,20, cols)].set = bits[0];
    matrix[index(8,19, cols)].set = bits[1];
    matrix[index(8,18, cols)].set = bits[2];
    matrix[index(8,17, cols)].set = bits[3];
    matrix[index(8,16, cols)].set = bits[4];
    matrix[index(8,15, cols)].set = bits[5];   
    matrix[index(8,14, cols)].set = bits[6];   
    matrix[index(8,8, cols)].set = bits[7];
    matrix[index(8,7, cols)].set = bits[8];
    matrix[index(8,5, cols)].set = bits[9];
    matrix[index(8,4, cols)].set = bits[10];
    matrix[index(8,3, cols)].set = bits[11];
    matrix[index(8,2, cols)].set = bits[12];
    matrix[index(8,1, cols)].set = bits[13];
    matrix[index(8,0, cols)].set = bits[14];
    


    matrix[index(0,8, cols)].set = bits[0];
    matrix[index(1,8, cols)].set = bits[1];
    matrix[index(2,8, cols)].set = bits[2];
    matrix[index(3,8, cols)].set = bits[3];
    matrix[index(4,8, cols)].set = bits[4];
    matrix[index(5,8, cols)].set = bits[5];


    matrix[index(7,8, cols)].set = bits[6];
    matrix[index(13,8, cols)].set = bits[7];
    matrix[index(14,8, cols)].set = bits[8];
    matrix[index(15,8, cols)].set = bits[9];
    matrix[index(16,8, cols)].set = bits[10];
    matrix[index(17,8, cols)].set = bits[11];
    matrix[index(18,8, cols)].set = bits[12];
    matrix[index(19,8, cols)].set = bits[13];
    matrix[index(20,8, cols)].set = bits[14];
    
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

function up(num) {
    for (let i = 0; i < num; i++) {
        // console.log(duplaIndex);

        hor(x, y, dupla[duplaIndex]);
        y--;
        duplaIndex++;
    }
    y++;
}

function down(num) {
    for (let i = 0; i < num; i++) {
        //  console.log(duplaIndex);

        hor(x, y, dupla[duplaIndex]);
        y++;
        duplaIndex++;
    }
    y--;

}

function hor(x, y, values) {
    let ind = index(x, y, rows);
    matrix[ind].set = values[0];
    ind = index(x - 1, y, rows);
    matrix[ind].set = values[1];
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
    constructor(x, y, w, set) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.set = set;
    }

    show() {
        let background;

        if (this.set == 1) {
            background = 0;
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

        //ellipse(this.x, this.y, this.w, this.w);
        rect(this.x, this.y, this.w, this.w);
    }

    checkOver(x, y) {

        if (x < this.x + this.w && x > this.x && y < this.y + this.w && y > this.y) {
            return true;
        }
    }

}

function mouseClicked() {
    let x = mouseX;
    let y = mouseY;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].checkOver(x, y)) {
            console.log(i)
            if (matrix[i].set == 1) {
                matrix[i].set = 0;
            } else {
                matrix[i].set = 1;
            }
        };
    }
}

