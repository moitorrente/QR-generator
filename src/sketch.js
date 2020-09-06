let matrix = [];
let rows = 21;
let cols = 21;
const NOTSET = 99;
let x = rows - 1;
let y = cols - 1;
let inData = [];

const devmode = document.getElementById('devmode');

function setup() {
    let canvas = createCanvas(420, 420);
    canvas.parent('canvas');

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

    matrix.forEach(x => x.show());
}

function restart(size) {
    const newSize = mapRange(size, 1, 70, 100, 400);

    resizeCanvas(newSize, newSize);
    let w = height / rows;

    for (let square of matrix) {
        square.setVal(NOTSET);
        square.updateWidth(w);
        square.setted = false;
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


function setAlignment(version) {
    if(version > 1){
        let position = 8 + 4 * version;
        alignmentPatterns(position, position);
    }
}

function place(data, version, shape, mainColor, size, inputMask) {
    updateMatrix(version);
    restart(size);
    inData = Array.from(data.data)


    setAlignment(version);

    finderPatterns(0, 0);
    finderPatterns(rows - 7, 0);
    finderPatterns(0, rows - 7);
    separators();
    timing();
    darkModule(version);
    formatBits(parseInt(0), 'L');

    placeGlobal();

    let maskToApply;
    if (inputMask == 'auto') {
        let penaltyes = [];
        for (let i = 0; i < 8; i++) {
            formatBits(parseInt(i), data.correction);
            let maskedData = mask(parseInt(i));
            penaltyes.push(evaluateMask(maskedData));
        }

        maskToApply = penaltyes.indexOf((penaltyes.reduce((acc, item) => acc > item ? acc = item : acc)));

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