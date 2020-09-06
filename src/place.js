let placeIndex = 0;

function left(num) {
    x -= num;
}

function hor(x, y) {
    let ind = index(x, y, rows);
    matrix[ind].setVal(inData[placeIndex]);
    placeIndex++;
    ind = index(x - 1, y, rows);
    matrix[ind].setVal(inData[placeIndex]);
    placeIndex++;
}

function up() {
    hor(x, y, inData[placeIndex]);
    y--;
}

function down() {
    hor(x, y, inData[placeIndex]);
    y++;
}

function vertical(pos) {
    matrix[index(pos, y, rows)].setVal(inData[placeIndex]);
    y--;
    placeIndex++;
}

function placeUp() {
    continueLine = checkNextCol(x, true);

    while (!matrix[index(x, y, rows)].setted && (continueLine || continueLine == 0)) {
        up();
        continueLine = checkNextCol(x, true);
        if (y < 0) {
            y = 0;
            continueLine = false;
        }
    }
    y++;
}

function placeDown() {
    continueLine = checkNextCol(x, false);
    while (!matrix[index(x, y, rows)].setted && (continueLine || continueLine == 0)) {
        down();
        continueLine = checkNextCol(x, false);
        if (y >= rows - 1) {
            y = rows - 1;
            down(1);
            y--;
            continueLine = false;
        }
    }
}

function placeGlobal() {
    let count = 0;
    while (x > 2) {
        step(count);
        count++;
        count = count % 4;
    }
    placeLast();
}

function placeLast() {
    while (!matrix[index(x, y, rows)].setted) {
        down();
    }
}

function step(num) {
    switch (num) {
        case 0:
            placeUp();
            break;
        case 1:
            left(2);
            break;
        case 2:
            placeDown();
            break;
        case 3:
            left(2);
            break;
    }
}

function checkNextCol(col, up) {
    if (up) {
        for (let i = rows - 1; i > 0; i--) {
            if (!matrix[index(col, i, rows)].setted && !matrix[index(col - 1, i, rows)].setted) {
                y = i;
                return true;
            } else if (matrix[index(col, i, rows)].setted && !matrix[index(col - 1, i, rows)].setted) {
                if (shouldSkip(col)) {
                    x--;
                    return true;
                } else {
                    vertical(col - 1);
                }
            }
        }
    } else {
        for (let i = 0; i < rows; i++) {
            if (!matrix[index(col, i, rows)].setted && !matrix[index(col - 1, i, rows)].setted) {
                y = i;
                return true;
            } else if (matrix[index(col, i, rows)].setted && !matrix[index(col - 1, i, rows)].setted) {
                if (col == 6) {
                    x--;
                    return true;
                } else {
                    matrix[index(col - 1, i, rows)].set = 3;
                    if (shouldSkip(col)) {
                        x--;
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function shouldSkip(col) {
    for (let i = rows - 1; i > 0; i--) {
        if (!matrix[index(col, i, rows)].setted && !matrix[index(col - 1, i, rows)].setted) {
            return false;
        }
    }
    return true;
}

function formatBits(mask, correction) {
    let bits = FORMATINFORMATION[mask][correction];

    for (let i = 1; i < 8; i++) {
        matrix[index(8, cols - i, cols)].unlock();
        matrix[index(8, cols - i, cols)].setVal(bits[i - 1]);
        matrix[index(8, cols - i, cols)].lock();
    }

    for (let i = 0; i < 9; i++) {
        if (i != 6) {
            matrix[index(8, i, cols)].unlock();
            matrix[index(8, i, cols)].setVal(bits[14 - i]);
            matrix[index(8, i, cols)].lock();
        }
    }

    for (let i = 0; i < 8; i++) {
        let p = i;
        if (i != 6) {
            matrix[index(i, 8, cols)].unlock();
            if (i > 6) {
                p--;
            }
            matrix[index(i, 8, cols)].setVal(bits[p]);
            matrix[index(i, 8, cols)].lock();
        }
    }

    for (let i = 1; i < 9; i++) {
        matrix[index(cols - i, 8, cols)].unlock();
        matrix[index(cols - i, 8, cols)].setVal(bits[15 - i]);
        matrix[index(cols - i, 8, cols)].lock();
    }
}

function finderPatterns(ioff, joff) {
    const PATTERN = '0000000011111001000100100010010001001111100000000';

    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 7; i++) {
            if (PATTERN[index(i, j, 7)] == '1') {
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
    const PATTERN = '1111110001101011000111111';
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
            if (PATTERN[index(i, j, 5)] == '0') {
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