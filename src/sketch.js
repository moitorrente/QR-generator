let matrix = [];
let rows = 21;
let cols = 21;
const NOTSET = 99;
let x = rows - 1;
let y = cols - 1;
let inData = [];
let factor = 0.8;

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
    translate(width/2, height /2)
    scale(factor)
    translate(-width/2, -height /2)

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

function place(data, version, shape, mainColor, secondaryColor, size, inputMask) {
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

    let maskToApply = determineMask(inputMask, data.correction);

    formatBits(parseInt(maskToApply), data.correction);
    applyMask(maskToApply);

    matrix.forEach(x => x.updateShape(shape))

    matrix.forEach(x => x.updateColor(mainColor, secondaryColor));

    // for (let i = 0; i < matrix.length; i++) {
    //     matrix[i].updateShape(shape);
    //     matrix[i].updateColor(mainColor, secondaryColor);
    // }

    return maskToApply;
}

function updateShape(shape){
    matrix.forEach(x => x.updateShape(shape))
}

function updateColor(mainColor, secondaryColor){
    matrix.forEach(x => x.updateColor(mainColor, secondaryColor));
}