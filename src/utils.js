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

function isNumeric(message) {
    return /^-?\d+$/.test(message);
}

function isAlphanumeric(message) {
    for (const character of message) {
        if (CONVERSIONTABLE[character] == undefined) return false;
    }
    return true;
}

function toBin(number, length) {
    let num = parseInt(number);
    let binaryNum = num.toString(2);
    return binaryNum.padStart(length, '0');
}

function toHex(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
}
