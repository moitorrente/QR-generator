let matrix = [];
let rows = 21;
let cols = 21;
const NOTSET = 99;
let x = rows - 1;
let y = cols - 1;
let inData = [];

const devmode = document.getElementById("devmode");

function setup() {
    let canvas = createCanvas(420, 420);
    canvas.parent("canvas");

    let w = height / rows;

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            let spot = new Spot(i * w, j * w, w, NOTSET);
            matrix.push(spot);
        }
    }
}

function draw() {
    background(255);
    rectMode(CORNER);
    ellipseMode(CORNER);
    angleMode(RADIANS);
    noStroke();

    for (let i = 0; i < matrix.length; i++) {
        matrix[i].show();
    }
}

function restart(size) {
    let newSize = mapRange(size, 1, 70, 100, 400);


    resizeCanvas(newSize, newSize);
    let w = height / rows;

    for (let i = 0; i < matrix.length; i++) {
        matrix[i].setVal(NOTSET);
        matrix[i].updateWidth(w);
        matrix[i].setted = false;
    }
    x = rows - 1;
    y = cols - 1;
    placeIndex = 0;
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

function place(data, version, shape, mainColor, size, inputMask) {
    updateMatrix(version);
    restart(size);
    inData = Array.from(data.data)

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
    formatBits(parseInt(0), 'L');

    placeGlobal();

    let maskToApply;
    if (inputMask == "auto") {
        let penaltyes = [];
        for (let i = 0; i < 8; i++) {
            formatBits(parseInt(i), data.correction);
            let maskedData = mask(parseInt(i));
            penaltyes.push(evaluateMask(maskedData));
        }
        maskToApply = findLowestPenalty(penaltyes);
        console.log("evalua máscara")
    } else {
        maskToApply = parseInt(inputMask);
    }

    formatBits(parseInt(maskToApply), data.correction);
    applyMask(maskToApply);


    for (let i = 0; i < matrix.length; i++) {
        matrix[i].updateShape(shape);
        matrix[i].updateColor(mainColor);
    }

    return maskToApply;
}

function formatBits(mask, correction) {
    let bits = FORMATINFORMATION[mask][correction];

    matrix[index(8, cols - 1, cols)].unlock();
    matrix[index(8, cols - 2, cols)].unlock();
    matrix[index(8, cols - 3, cols)].unlock();
    matrix[index(8, cols - 4, cols)].unlock();
    matrix[index(8, cols - 5, cols)].unlock();
    matrix[index(8, cols - 6, cols)].unlock();
    matrix[index(8, cols - 7, cols)].unlock();
    matrix[index(8, 8, cols)].unlock();
    matrix[index(8, 7, cols)].unlock();
    matrix[index(8, 5, cols)].unlock();
    matrix[index(8, 4, cols)].unlock();
    matrix[index(8, 3, cols)].unlock();
    matrix[index(8, 2, cols)].unlock();
    matrix[index(8, 1, cols)].unlock();
    matrix[index(8, 0, cols)].unlock();

    matrix[index(0, 8, cols)].unlock();
    matrix[index(1, 8, cols)].unlock();
    matrix[index(2, 8, cols)].unlock();
    matrix[index(3, 8, cols)].unlock();
    matrix[index(4, 8, cols)].unlock();
    matrix[index(5, 8, cols)].unlock();
    matrix[index(7, 8, cols)].unlock();
    matrix[index(cols - 8, 8, cols)].unlock();
    matrix[index(cols - 7, 8, cols)].unlock();
    matrix[index(cols - 6, 8, cols)].unlock();
    matrix[index(cols - 5, 8, cols)].unlock();
    matrix[index(cols - 4, 8, cols)].unlock();
    matrix[index(cols - 3, 8, cols)].unlock();
    matrix[index(cols - 2, 8, cols)].unlock();
    matrix[index(cols - 1, 8, cols)].unlock();

    matrix[index(8, cols - 1, cols)].setVal(bits[0]);
    matrix[index(8, cols - 2, cols)].setVal(bits[1]);
    matrix[index(8, cols - 3, cols)].setVal(bits[2]);
    matrix[index(8, cols - 4, cols)].setVal(bits[3]);
    matrix[index(8, cols - 5, cols)].setVal(bits[4]);
    matrix[index(8, cols - 6, cols)].setVal(bits[5]);
    matrix[index(8, cols - 7, cols)].setVal(bits[6]);
    matrix[index(8, 8, cols)].setVal(bits[7]);
    matrix[index(8, 7, cols)].setVal(bits[8]);
    matrix[index(8, 5, cols)].setVal(bits[9]);
    matrix[index(8, 4, cols)].setVal(bits[10]);
    matrix[index(8, 3, cols)].setVal(bits[11]);
    matrix[index(8, 2, cols)].setVal(bits[12]);
    matrix[index(8, 1, cols)].setVal(bits[13]);
    matrix[index(8, 0, cols)].setVal(bits[14]);

    matrix[index(0, 8, cols)].setVal(bits[0]);
    matrix[index(1, 8, cols)].setVal(bits[1]);
    matrix[index(2, 8, cols)].setVal(bits[2]);
    matrix[index(3, 8, cols)].setVal(bits[3]);
    matrix[index(4, 8, cols)].setVal(bits[4]);
    matrix[index(5, 8, cols)].setVal(bits[5]);
    matrix[index(7, 8, cols)].setVal(bits[6]);
    matrix[index(cols - 8, 8, cols)].setVal(bits[7]);
    matrix[index(cols - 7, 8, cols)].setVal(bits[8]);
    matrix[index(cols - 6, 8, cols)].setVal(bits[9]);
    matrix[index(cols - 5, 8, cols)].setVal(bits[10]);
    matrix[index(cols - 4, 8, cols)].setVal(bits[11]);
    matrix[index(cols - 3, 8, cols)].setVal(bits[12]);
    matrix[index(cols - 2, 8, cols)].setVal(bits[13]);
    matrix[index(cols - 1, 8, cols)].setVal(bits[14]);

    matrix[index(8, cols - 1, cols)].lock();
    matrix[index(8, cols - 2, cols)].lock();
    matrix[index(8, cols - 3, cols)].lock();
    matrix[index(8, cols - 4, cols)].lock();
    matrix[index(8, cols - 5, cols)].lock();
    matrix[index(8, cols - 6, cols)].lock();
    matrix[index(8, cols - 7, cols)].lock();
    matrix[index(8, 8, cols)].lock();
    matrix[index(8, 7, cols)].lock();
    matrix[index(8, 5, cols)].lock();
    matrix[index(8, 4, cols)].lock();
    matrix[index(8, 3, cols)].lock();
    matrix[index(8, 2, cols)].lock();
    matrix[index(8, 1, cols)].lock();
    matrix[index(8, 0, cols)].lock();

    matrix[index(0, 8, cols)].lock();
    matrix[index(1, 8, cols)].lock();
    matrix[index(2, 8, cols)].lock();
    matrix[index(3, 8, cols)].lock();
    matrix[index(4, 8, cols)].lock();
    matrix[index(5, 8, cols)].lock();
    matrix[index(7, 8, cols)].lock();
    matrix[index(cols - 8, 8, cols)].lock();
    matrix[index(cols - 7, 8, cols)].lock();
    matrix[index(cols - 6, 8, cols)].lock();
    matrix[index(cols - 5, 8, cols)].lock();
    matrix[index(cols - 4, 8, cols)].lock();
    matrix[index(cols - 3, 8, cols)].lock();
    matrix[index(cols - 2, 8, cols)].lock();
    matrix[index(cols - 1, 8, cols)].lock();
}



function finderPatterns(ioff, joff) {
    const pattern = "0000000011111001000100100010010001001111100000000";

    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 7; i++) {
            if (pattern[index(i, j, 7)] == "1") {
                matrix[index(i + ioff, j + joff, rows)].setVal(0);
                matrix[index(i + ioff, j + joff, rows)].lock();
            } else {
                matrix[index(i + ioff, j + joff, rows)].setVal(1);
                matrix[index(i + ioff, j + joff, rows)].lock();
            }
        }
    }
}


function alignmentPatterns(x, y) {
    const pattern = "1111110001101011000111111";
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
            if (pattern[index(i, j, 5)] == "0") {
                matrix[index(i + x, j + y, rows)].setVal(0);
                matrix[index(i + x, j + y, rows)].lock();
            } else {
                matrix[index(i + x, j + y, rows)].setVal(1);
                matrix[index(i + x, j + y, rows)].lock();
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
}

function timing() {
    let off = cols - 16;
    for (let i = 0; i < off; i++) {
        if (i % 2 == 0) {
            matrix[index(i + 8, 6, rows)].setVal(1);
            matrix[index(i + 8, 6, rows)].lock();
            matrix[index(6, i + 8, rows)].setVal(1);
            matrix[index(6, i + 8, rows)].lock();
        } else {
            matrix[index(i + 8, 6, rows)].setVal(0);
            matrix[index(i + 8, 6, rows)].lock();
            matrix[index(6, i + 8, rows)].setVal(0);
            matrix[index(6, i + 8, rows)].lock();
        }

    }
}

function separator(ioff, joff, dir) {
    if (dir == 'vertical') {
        for (let j = 0; j < 8; j++) {
            matrix[index(ioff, j + joff, rows)].setVal(0);
            matrix[index(ioff, j + joff, rows)].lock();
        }
    } else {
        for (let j = 0; j < 8; j++) {
            matrix[index(j + joff, ioff, rows)].setVal(0);
            matrix[index(j + joff, ioff, rows)].lock();
        }
    }
}

function darkModule(ver) {
    let pos = 4 * ver + 9;
    matrix[index(8, pos, rows)].setVal(1);
    matrix[index(8, pos, rows)].lock();
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