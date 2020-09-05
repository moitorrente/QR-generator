
function applyMask(num) {
    let masked = mask(num);
    matrix.forEach((x, index) => x.set = masked[index]);
}

function mask(number) {
    let tempMatrix = matrix.map(parseInMatrix);
    tempMatrix = window['mask' + number](tempMatrix);
    return tempMatrix = tempMatrix.map(parseOutMatrix);
}

const parseInMatrix = (element) => {
    let value = 'x'
    if (element.editable) {
        value = parseInt(element.set);
    }
    return value;
}

const parseOutMatrix = (element, index) => {
    let value = element;
    if (element == 'x') {
        value = parseInt(matrix[index].set);
    }
    return value;
}

function mask0(tempMatrix) {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((i + j) % 2 == 0) {
                if (tempMatrix[index(i, j, rows)] == 1) {
                    tempMatrix[index(i, j, rows)] = 0;
                } else if (tempMatrix[index(i, j, rows)] == 0) {
                    tempMatrix[index(i, j, rows)] = 1;
                }
            }
        }
    }
    return tempMatrix;
}

function mask1(tempMatrix) {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if (j % 2 == 0) {
                if (tempMatrix[index(i, j, rows)] == 1) {
                    tempMatrix[index(i, j, rows)] = 0;
                } else if (tempMatrix[index(i, j, rows)] == 0) {
                    tempMatrix[index(i, j, rows)] = 1;
                }
            }
        }
    }

    return tempMatrix;
}

function mask2(tempMatrix) {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if (i % 3 == 0) {
                if (tempMatrix[index(i, j, rows)] == 1) {
                    tempMatrix[index(i, j, rows)] = 0;
                } else if (tempMatrix[index(i, j, rows)] == 0) {
                    tempMatrix[index(i, j, rows)] = 1;
                }
            }
        }
    }

    return tempMatrix;
}

function mask3(tempMatrix) {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((i + j) % 3 == 0) {
                if (tempMatrix[index(i, j, rows)] == 1) {
                    tempMatrix[index(i, j, rows)] = 0;
                } else if (tempMatrix[index(i, j, rows)] == 0) {
                    tempMatrix[index(i, j, rows)] = 1;
                }
            }
        }
    }

    return tempMatrix;
}

function mask4(tempMatrix) {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((Math.floor(j / 2) + Math.floor(i / 3)) % 2 == 0) {
                if (tempMatrix[index(i, j, rows)] == 1) {
                    tempMatrix[index(i, j, rows)] = 0;
                } else if (tempMatrix[index(i, j, rows)] == 0) {
                    tempMatrix[index(i, j, rows)] = 1;
                }
            }
        }
    }

    return tempMatrix;
}

function mask5(tempMatrix) {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((((i * j) % 2) + ((i * j) % 3)) == 0) {
                if (tempMatrix[index(i, j, rows)] == 1) {
                    tempMatrix[index(i, j, rows)] = 0;
                } else if (tempMatrix[index(i, j, rows)] == 0) {
                    tempMatrix[index(i, j, rows)] = 1;
                }
            }
        }
    }

    return tempMatrix;
}

function mask6(tempMatrix) {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((((i * j) % 2) + ((i * j) % 3)) % 2 == 0) {
                if (tempMatrix[index(i, j, rows)] == 1) {
                    tempMatrix[index(i, j, rows)] = 0;
                } else if (tempMatrix[index(i, j, rows)] == 0) {
                    tempMatrix[index(i, j, rows)] = 1;
                }
            }
        }
    }

    return tempMatrix;
}

function mask7(tempMatrix) {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if ((((i + j) % 2) + ((i * j) % 3)) % 2 == 0) {
                if (tempMatrix[index(i, j, rows)] == 1) {
                    tempMatrix[index(i, j, rows)] = 0;
                } else if (tempMatrix[index(i, j, rows)] == 0) {
                    tempMatrix[index(i, j, rows)] = 1;
                }
            }
        }
    }

    return tempMatrix;
}