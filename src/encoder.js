function numericEncoding(num) {
    let chunks = [];
    let encoded = [];

    let numArray = Array.from(num.toString());

    while (numArray.length > 3) {
        chunks.push(numArray.splice(0, 3).join(''));
    }

    if (numArray.length > 0) {
        chunks.push(numArray.splice(0, numArray.length).join(''));
    }

    for (let i = 0; i < chunks.length; i++) {
        let len = 10;
        if (chunks[i][0] == '0' && chunks[i][1] == '0') {
            len = 4;
        } else if (chunks[i][0] == '0') {
            len = 7;
        }

        if (chunks[i].length == 1) {
            len = 4
        } else if (chunks[i].length == 2) {
            len = 7;
        }

        encoded.push(toBin(chunks[i], len));
    }
    return encoded;
}

function alphanumericEncoding(text) {
    let chunks = [];
    let encoded = [];

    let textArray = Array.from(text.toString());

    while (textArray.length > 2) {
        chunks.push(textArray.splice(0, 2).join(''));
    }

    if (textArray.length > 0) {
        chunks.push(textArray.splice(0, textArray.length).join(''));
    }

    for (let i = 0; i < chunks.length; i++) {
        let num;
        let len = 11;
        let first = CONVERSIONTABLE[chunks[i][0]];
        let second = CONVERSIONTABLE[chunks[i][1]];

        if (i == chunks.length - 1) {
            if (!chunks[i][1]) {
                len = 6;
            }
        }
        if (second) {
            num = first * 45 + second;
        } else {
            num = first;
        }
        encoded.push(toBin(num, len));
    }
    return encoded;
}

function byteEncoding(text) {
    let encoded = [];
    for (const character of text) {
        encoded.push(toBin(parseInt(toHex(character), 16), 8));
    }
    return encoded;
}