
function makeChunks(input, size) {
    let inputArray = Array.from(input);
    let chunks = []

    while (inputArray.length > size) {
        chunks.push(inputArray.splice(0, size).join(''));
    }

    if (inputArray.length > 0) {
        chunks.push(inputArray.splice(0, inputArray.length).join(''));
    }

    return chunks;
}

function numericEncoding(num) {
    let chunks = makeChunks(num, 3);
    return chunks.map(convertNumberToBinary);
}

function convertNumberToBinary(num) {
    let len;
    switch (num.length) {
        case 1:
            len = 4;
            break;
        case 2:
            len = 7;
            break;
        case 3:
            len = 10;
            break;
    }
    return toBin(num, len);
}

function alphanumericEncoding(text) {
    let chunks = makeChunks(text, 2);
    return chunks.map(convertAlphanumericToBin);
}

function convertAlphanumericToBin(alph) {
    let num;
    let len = 11;
    if (alph[1]) {
        num = CONVERSIONTABLE[alph[0]] * 45 + CONVERSIONTABLE[alph[1]];
    } else {
        num = CONVERSIONTABLE[alph[0]];
        len = 6;
    }
    return toBin(num, len);
}

function byteEncoding(text) {
    let byteArray = makeChunks(text, 1);
    return byteArray.map(x => toBin(parseInt(toHex(x), 16), 8));
}