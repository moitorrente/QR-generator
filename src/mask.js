
function applyMask(num){
    let masked = mask(num);

    for(let i = 0; i < matrix.length; i++){
        matrix[i].set = masked[i];
    }
}

function mask(number) {
    return window["mask" + number]();
}

function mask0() {
    let tempMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        if(matrix[i].editable){
            tempMatrix.push(parseInt(matrix[i].set));
        } else {
            tempMatrix.push("x");
        }
    }

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

    for (let i = 0; i < tempMatrix.length; i++) {
        if(tempMatrix[i] == 'x'){
            tempMatrix[i] = parseInt(matrix[i].set);
        }
    }

    return tempMatrix;
}


function mask1() {
    let tempMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        if(matrix[i].editable){
            tempMatrix.push(parseInt(matrix[i].set));
        } else {
            tempMatrix.push("x");
        }
    }

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

    for (let i = 0; i < tempMatrix.length; i++) {
        if(tempMatrix[i] == 'x'){
            tempMatrix[i] = parseInt(matrix[i].set);
        }
    }
    return tempMatrix;
}

function mask2() {
    let tempMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        if(matrix[i].editable){
            tempMatrix.push(parseInt(matrix[i].set));
        } else {
            tempMatrix.push("x");
        }
    }

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

    for (let i = 0; i < tempMatrix.length; i++) {
        if(tempMatrix[i] == 'x'){
            tempMatrix[i] = parseInt(matrix[i].set);
        }
    }
    return tempMatrix;
}

function mask3() {
    let tempMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        if(matrix[i].editable){
            tempMatrix.push(parseInt(matrix[i].set));
        } else {
            tempMatrix.push("x");
        }
    }

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

    for (let i = 0; i < tempMatrix.length; i++) {
        if(tempMatrix[i] == 'x'){
            tempMatrix[i] = parseInt(matrix[i].set);
        }
    }
    return tempMatrix;
}

function mask4() {
    let tempMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        if(matrix[i].editable){
            tempMatrix.push(parseInt(matrix[i].set));
        } else {
            tempMatrix.push("x");
        }
    }

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

    for (let i = 0; i < tempMatrix.length; i++) {
        if(tempMatrix[i] == 'x'){
            tempMatrix[i] = parseInt(matrix[i].set);
        }
    }
    return tempMatrix;
}

function mask5() {
    let tempMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        if(matrix[i].editable){
            tempMatrix.push(parseInt(matrix[i].set));
        } else {
            tempMatrix.push("x");
        }
    }

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

    for (let i = 0; i < tempMatrix.length; i++) {
        if(tempMatrix[i] == 'x'){
            tempMatrix[i] = parseInt(matrix[i].set);
        }
    }
    return tempMatrix;
}

function mask6() {
    let tempMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        if(matrix[i].editable){
            tempMatrix.push(parseInt(matrix[i].set));
        } else {
            tempMatrix.push("x");
        }
    }

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

    for (let i = 0; i < tempMatrix.length; i++) {
        if(tempMatrix[i] == 'x'){
            tempMatrix[i] = parseInt(matrix[i].set);
        }
    }
    return tempMatrix;
}

function mask7() {
    let tempMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        if(matrix[i].editable){
            tempMatrix.push(parseInt(matrix[i].set));
        } else {
            tempMatrix.push("x");
        }
    }

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

    for (let i = 0; i < tempMatrix.length; i++) {
        if(tempMatrix[i] == 'x'){
            tempMatrix[i] = parseInt(matrix[i].set);
        }
    }
    return tempMatrix;
}