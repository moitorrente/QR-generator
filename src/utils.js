function index(i, j, z) {
    return i + j * z;
}

function mouseClicked() {
    let x = mouseX;
    let y = mouseY;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].checkOver(x, y)) {

            console.log(matrix[index(x, y, rows)]);
            console.log(i)
            //   if (matrix[i].set == 1) {
            //      matrix[i].setVal(0);
            //    } else {
            //        matrix[i].setVal(1);
            //    }
        };
    }
}

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
