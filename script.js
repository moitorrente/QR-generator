const MODE = {
    numeric: '0001',
    alphanumeric: '0010',
    byte: '0100',
    kanji: '1000'
}

const LENGTH = {
    numeric: 10,
    alphanumeric: 9,
    byte: 8,
    kanji: 8,
}

const CONVERSIONTABLE = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    I: 18,
    J: 19,
    K: 20,
    L: 21,
    M: 22,
    N: 23,
    O: 24,
    P: 25,
    Q: 26,
    R: 27,
    S: 28,
    T: 29,
    U: 30,
    V: 31,
    W: 32,
    X: 33,
    Y: 34,
    Z: 35,
    " ": 36,
    "$": 37,
    "%": 38,
    "*": 39,
    "+": 40,
    "-": 41,
    ".": 42,
    "/": 43,
    ":": 44
}

let encodedMsg = {
    mode: "",
    count: "",
    message: "",
    data: ""
}

function encode(message) {
    let data;
    mode = determineEncodig(message);
    encodedMsg.mode = MODE[mode];
    encodedMsg.count = charCountIndicator(mode, message);

    if (mode == "numeric") {
        encodedMsg.message = numericEncoding(message);
    } else if (mode == "alphanumeric") {
        encodedMsg.message = alphanumericEncoding(message);
    } else {
        encodedMsg.message = byteEncoding(message);
    }

    data = encodedMsg.mode + encodedMsg.count + encodedMsg.message.join("");
    encodedMsg.data = isMult8(data);

    return encodedMsg;
}

function isMult8(num){
    let rem = num.length % 8;
    return num.padEnd(num.length + rem, "0");
}

function determineEncodig(message) {
    let mode;

    if (isNumeric(message)) {
        mode = "numeric";
    } else if (isAlphanumeric(message)) {
        mode = "alphanumeric"
    } else {
        mode = "byte";
    }
    return mode;
}

function isNumeric(message) {
    return !isNaN(message);
}

function isAlphanumeric(message) {
    for (let i = 0; i < message.length; i++) {
        if (!CONVERSIONTABLE[message[i]]) {
            return false;
        }
    }
    return true;
}

function charCountIndicator(mode, text) {
    let count = "";
    count = toBin(text.length, LENGTH[mode])
    return count;
}

function numericEncoding(num) {
    let chunks = [];
    let encoded = [];

    let numArray = Array.from(num.toString());

    while (numArray.length > 3) {
        chunks.push(numArray.splice(0, 3).join(""));
    }

    if (numArray.length > 0) {
        chunks.push(numArray.splice(0, numArray.length).join(""));
    }

    for (let i = 0; i < chunks.length; i++) {
        let len = 10;
        if (chunks[i][0] == "0" && chunks[i][1] == "0") {
            len = 4;
        } else if (chunks[i][0] == "0") {
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
        chunks.push(textArray.splice(0, 2).join(""));
    }

    if (textArray.length > 0) {
        chunks.push(textArray.splice(0, textArray.length).join(""));
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
    for (let i = 0; i < text.length; i++) {
        encoded.push(toBin(parseInt(toHex(text[i]), 16), 8));
    }
    return encoded;
}

function toBin(number, length) {
    let num = parseInt(number);
    let binaryNum = num.toString(2);
    return binaryNum.padStart(length, "0");
}

function toHex(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
}