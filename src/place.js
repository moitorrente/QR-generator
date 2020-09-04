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
            return false
        }
    }
    return true;
}