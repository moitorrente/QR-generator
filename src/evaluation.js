function evaluateMask(data) {
    let rowsP = evaluateRows(data);
    let colsP = evaluateCols(data);

    let penalty = rowsP.reduce((acc, item) => acc + item, 0);

    penalty = colsP.reduce((acc, item) => acc + item, penalty)

    penalty += parseInt(evaluateBoxes(data));
    penalty += parseInt(evaluatePatterns(data));
    penalty += parseInt(evaluateRatio(data));

    return penalty;
}

function evaluatePatterns(data) {
    let penalty = 0;
    const PATTERN_R = '10111010000';
    const PATTERN_L = '00001011101';

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows - PATTERN_R.length + 1; i++) {
            let temp = '';
            for (let t = 0; t < PATTERN_R.length; t++) {
                temp += data[index(i + t, j, rows)]
            }
            if (temp == PATTERN_R || temp == PATTERN_L) {
                penalty += 40;
            }
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols - PATTERN_R.length + 1; j++) {
            let temp = '';
            for (let t = 0; t < PATTERN_R.length; t++) {
                temp += data[index(i, j + t, rows)]
            }
            if (temp == PATTERN_R || temp == PATTERN_L) {
                penalty += 40;
            }
        }
    }

    return penalty;
}

function evaluateRows(data) {
    let temp = data[index(0, 0, rows)];
    let counter = 0;
    let penalty = 0;
    let rowPenalty = [];
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if (data[index(i, j, rows)] == temp) {
                counter++;
                if (counter == 5) {
                    penalty += 3;

                } else if (counter > 5) {
                    penalty++;

                }
            } else {
                counter = 1;
                temp = data[index(i, j, rows)];
            }
        }
        rowPenalty.push(penalty);
        penalty = 0;
        counter = 0;
    }

    return rowPenalty;
}

function evaluateCols(data) {
    let temp = data[index(0, 0, rows)];
    let counter = 0;
    let penalty = 0;
    let columnPenalty = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (data[index(i, j, rows)] == temp) {
                counter++;
                if (counter == 5) {
                    penalty += 3;

                } else if (counter > 5) {
                    penalty++;

                }
            } else {
                counter = 1;
                temp = data[index(i, j, rows)];
            }
        }
        columnPenalty.push(penalty);
        penalty = 0;
        counter = 0;
    }

    return columnPenalty;
}

function evaluateBoxes(data) {
    let penalty = 0;
    for (let j = 0; j < cols - 1; j++) {
        for (let i = 0; i < rows - 1; i++) {
            if (data[index(i, j, rows)] == data[index(i + 1, j, rows)] &&
                data[index(i, j, rows)] == data[index(i, j + 1, rows)] &&
                data[index(i, j, rows)] == data[index(i + 1, j + 1, rows)]) {
                penalty += 3;
            }
        }
    }
    return penalty;
}

function evaluateRatio(data) {
    let dark = 0;
    const total = cols * rows;
    for (let i = 0; i < data.length; i++) {
        if (data[i] == 1) {
            dark++;
        }
    }

    const perc = Math.floor((dark / total) * 100);
    let percL = perc;
    let percH = perc;

    while (percL % 5 != 0 && percL > 0) {
        percL--;
    }

    while (percH % 5 != 0 && percH < 100) {
        percH++;
    }

    const tempH = Math.abs(percH - 50) / 5;
    const tempL = Math.abs(percL - 50) / 5;
    let penalty = Math.min(tempH, tempL) * 10;

    return penalty;
}