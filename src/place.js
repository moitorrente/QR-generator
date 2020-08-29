function upSkip(num) {
    y -= num;
}

function downSkip(num) {
    y += num;
}

function left(num) {
    x -= num;
}

function right(num) {
    x += num;
}

function up(num) {
    for (let i = 0; i < num; i++) {
        hor(x, y, inData[placeIndex]);
        y--;
    }
    y++;
}

function ver(num) {
    for (let i = 0; i < num; i++) {
        y--;
        matrix[index(x, y, rows)].setVal(inData[placeIndex]);
        placeIndex++;
    }
}

function down(num) {
    for (let i = 0; i < num; i++) {
        hor(x, y, inData[placeIndex]);
        y++;
    }
    y--;

}

function hor(x, y) {
    let ind = index(x, y, rows);
    matrix[ind].setVal(inData[placeIndex]);
    placeIndex++;
    ind = index(x - 1, y, rows);
    matrix[ind].setVal(inData[placeIndex]);
    placeIndex++;
}

function placeVersion1() {
    up(12);
    left(2)
    down(12);
    left(2)
    up(12);
    left(2)
    down(12);
    left(2)
    up(14);
    upSkip(2);
    up(6);
    left(2);
    down(6);
    downSkip(2)
    down(14)
    left(2);
    upSkip(8);
    up(4);
    left(3);
    down(4);
    left(2);
    up(4);
    left(2);
    down(4);
}


function placeVersion2() {
    up(16);
    left(2);
    down(16);
    left(2);
    up(4);
    upSkip(6);
    up(7);
    left(2);
    down(7);
    downSkip(6);
    down(4);
    left(2);
    up(4);
    left(1);
    ver(5);
    upSkip(1);
    right(1);
    up(9);
    upSkip(2);
    up(6);
    left(2);
    down(6);
    downSkip(2)
    down(18)
    left(2);
    up(18);
    upSkip(2);
    up(6);
    left(2);
    down(6);
    downSkip(2)
    down(18);
    left(2);
    upSkip(8);
    up(8);
    left(3);
    down(8);
    left(2);
    up(8);
    left(2);
    //Ajustar este último a la longitud de array entrada (ej: 2-L --> 352)
    down(4);
}

function placeVersion3() {
    up(20);
    left(2);
    down(20);
    left(2);
    up(4);
    upSkip(6);
    up(11);
    left(2);
    down(11);
    downSkip(6);
    down(4);
    left(2);
    up(4);
    left(1);
    ver(5);
    upSkip(1);
    right(1);
    up(13);
    upSkip(2);
    up(6);
    left(2);
    down(6);
    downSkip(2);
    down(22);
    left(2);
    up(22);
    upSkip(2);
    up(6);
    left(2);
    down(6);
    downSkip(2);
    down(22);
    left(2);
    up(22);
    upSkip(2);
    up(6);
    left(2);
    down(6);
    downSkip(2);
    down(22);
    left(2);
    upSkip(8);
    up(12);
    left(3);
    down(12);
    left(2);
    up(12);
    left(2);
    down(8);
}