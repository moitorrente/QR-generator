//1-M; 16
const nBits = 16 * 8;

let encodedMsg = {
    original: "",
    mode: "",
    count: "",
    data: "",
}

function encode(message) {
    let data;
    let encoded;

    encodedMsg.original = message;
    mode = determineEncodig(message);
    encodedMsg.mode = MODE[mode];
    encodedMsg.count = charCountIndicator(mode, message);

    if (mode == "numeric") {
        encoded = numericEncoding(message);
    } else if (mode == "alphanumeric") {
        encoded = alphanumericEncoding(message);
    } else {
        encoded = byteEncoding(message);
    }

    data = encodedMsg.mode + encodedMsg.count + encoded.join("");

    data = addPadding(data);

    let corrCodeWords = toDec8(data);
    let corrCodeBin = "";

    for(let i = 0; i<corrCodeWords.length; i++){
        corrCodeBin += toBin(corrCodeWords[i],8);
    }

    encodedMsg.data = data + corrCodeBin;

    return encodedMsg;
}

function toDec8(nums) {
    let terms = [];
    let exps = [];
    number = Array.from(nums);

    while (number.length > 0) {
        terms.push(parseInt(number.splice(0, 8).join(""), 2));
    }

    let pos = terms.length;

    while (pos > 0) {
        pos--;
        exps.push(pos);
    }

    return polyDiv(terms, exps);
}


function polyDiv(terms, exps) {
    // 1-M: 10 correction level
    const initialAlphaExp = [0, 251, 67, 46, 61, 118, 70, 64, 94, 32, 45];
    let alphaExp = [0, 251, 67, 46, 61, 118, 70, 64, 94, 32, 45]; //10 correction level
    let xExp = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    // 1-Q: 13 correction level
    // const initialAlphaExp = [0, 74, 152, 176, 100, 86, 100, 106, 104, 130, 218, 206, 140, 78];
    // let alphaExp = [0, 74, 152, 176, 100, 86, 100, 106, 104, 130, 218, 206, 140, 78];
    // let xExp = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];



    for (let i = 0; i < exps.length; i++) {
        exps[i] = exps[i] + 10;
    }

    let adjust = exps[0] - xExp[0];

    for (let i = 0; i < xExp.length; i++) {
        xExp[i] = xExp[i] + adjust;
    }

    let res = multXOR(terms, exps, initialAlphaExp, xExp);

    for (let i = 0; i < 15; i++) {
        res = multXOR(res[0], res[3], initialAlphaExp, res[3]);
    }

    return res[0];
}


function multXOR(terms, exps, inAlphaExp, xExp) {
    let alphaExp = Array.from(inAlphaExp);
    let alphaNum = [];
    newAlpha = ANTILOGTABLE[terms[0]];


    for (let i = 0; i < alphaExp.length; i++) {
        alphaExp[i] += newAlpha;
        if (alphaExp[i] > 255) {
            alphaExp[i] = alphaExp[i] % 255;
        }
        alphaNum[i] = LOGTABLE[alphaExp[i]];
    }

    let temp = [];
    let max = 10+1;

    if (terms.length > max) {
        max = terms.length;
    }

    for (let i = 0; i < max; i++) {
        if (alphaNum[i]) {
            if (terms[i]) {
                temp[i] = terms[i] ^ alphaNum[i];
            } else {
                temp[i] = 0 ^ alphaNum[i];
            }
        } else {
            temp[i] = terms[i] ^ 0;
        }
    }

    terms = temp;
    if (terms.length > 10) {
        terms.splice(0, 1);
    }

    for (let i = 0; i < xExp.length; i++) {
        xExp[i] -= 1;
    }

    let newEexps = Array.from(exps)
    newEexps.splice(terms.length - 1);

    exps = newEexps;

    return [terms, exps, alphaExp, xExp];
}


function addPadding(data) {
    let left = nBits - data.length;
    let pad = 4 - left;

    if (pad < 0) {
        data = data.padEnd(data.length + 4, "0");
    } else {
        data = data.padEnd(data.length + pad, "0");
    }

    data = isMult8(data);
    left = nBits - data.length;

    if (left > 0) {
        data = data.padEnd(data.length + left, "1110110000010001");
    }
    return data;
}

function isMult8(num) {
    let rem = num.length % 8;
    return num.padEnd(num.length + 8 - rem, "0");
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