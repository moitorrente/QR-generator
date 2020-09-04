let _vercor = "";
function encode(message, version, correction) {
    _vercor = version + "-" + correction;

    let encodedMsg = {
        original: "",
        mode: "",
        modeText: "",
        count: "",
        data: "",
        version: "",
        correction: ""
    }

    let encoded;
    let nBits = retrieveNBits();

    encodedMsg.original = message;
    encodedMsg.version = version;
    encodedMsg.correction = correction;
    mode = determineEncodig(message);

    encodedMsg.modeText = mode;

    encodedMsg.mode = MODE[mode];
    encodedMsg.count = charCountIndicator(mode, message);

    if (mode == "numeric") {
        encoded = numericEncoding(message);
    } else if (mode == "alphanumeric") {
        encoded = alphanumericEncoding(message);
    } else {
        encoded = byteEncoding(message);
    }


    let data = encodedMsg.mode + encodedMsg.count + encoded.join("");

    data = addPadding(data, nBits);

    let polynomial = calcPolynomial(data);
    let corrCodeWords = polyDiv(polynomial.terms, polynomial.exps);

    let corrCodeBin = "";

    for (let i = 0; i < corrCodeWords.length; i++) {
        corrCodeBin += toBin(corrCodeWords[i], 8);
    }

    const remainderNum = REMAINDER[version];

    encodedMsg.data = data + corrCodeBin + remainderBits(remainderNum);

    return encodedMsg;
}

function remainderBits(num){
    let rem = "";
    for (let i = 0; i < num; i++){
        rem += '0';
    }
    return rem;

}

function retrieveNBits() {
    return 8 * CORRECTIONTABLE[_vercor];
}

function calcPolynomial(nums) {
    let polynomial = {
        terms: [],
        exps: []
    }

    number = Array.from(nums);

    while (number.length > 0) {
        polynomial.terms.push(parseInt(number.splice(0, 8).join(""), 2));
    }

    let pos = polynomial.terms.length;

    while (pos > 0) {
        pos--;
        polynomial.exps.push(pos);
    }

    return polynomial;
}

function getGeneratorPolynomial(num) {
    let generatorPolynomial = {
        alphaExp: [],
        xExp: []
    }
    switch (num) {
        case 7:
            generatorPolynomial.alphaExp = [0, 87, 229, 146, 149, 238, 102, 21];
            break;
        case 10:
            generatorPolynomial.alphaExp = [0, 251, 67, 46, 61, 118, 70, 64, 94, 32, 45];
            break;
        case 13:
            generatorPolynomial.alphaExp = [0, 74, 152, 176, 100, 86, 100, 106, 104, 130, 218, 206, 140, 78];
            break;
        case 15:
            generatorPolynomial.alphaExp = [0, 8, 183, 61, 91, 202, 37, 51, 58, 58, 237, 140, 124, 5, 99, 105];
            break;
        case 16:
            generatorPolynomial.alphaExp = [0, 120, 104, 107, 109, 102, 161, 76, 3, 91, 191, 147, 169, 182, 194, 225, 120];
            break;
        case 17:
            generatorPolynomial.alphaExp = [0, 43, 139, 206, 78, 43, 239, 123, 206, 214, 147, 24, 99, 150, 39, 243, 163, 136];
            break;
        case 18:
            generatorPolynomial.alphaExp = [0, 215, 234, 158, 94, 184, 97, 118, 170, 79, 187, 152, 148, 252, 179, 5, 98, 96, 153];
            break;
        case 22:
            generatorPolynomial.alphaExp = [0, 210, 171, 247, 242, 93, 230, 14, 109, 221, 53, 200, 74, 8, 172, 98, 80, 219, 134, 160, 105, 165, 231];
            break;
        case 26:
            generatorPolynomial.alphaExp = [0, 173, 125, 158, 2, 103, 182, 118, 17, 145, 201, 111, 28, 165, 53, 161, 21, 245, 142, 13, 102, 48, 227, 153, 145, 218, 70];
            break;
        case 28:
            generatorPolynomial.alphaExp = [0, 168, 223, 200, 104, 224, 234, 108, 180, 110, 190, 195, 147, 205, 27, 232, 201, 21, 43, 245, 87, 42, 195, 212, 119, 242, 37, 9, 123];
            break;
    }


    for (let i = num; i > 0; i--) {
        generatorPolynomial.xExp.push(i);
    }

    return generatorPolynomial;
}

function polyDiv(terms, exps) {
    const iterations = terms.length - 1;
    const genPolynomial = getGeneratorPolynomial(ECCODEWORDS[_vercor]);

    let alphaExp = Array.from(genPolynomial.alphaExp);
    let xExp = Array.from(genPolynomial.xExp);

    for (let i = 0; i < exps.length; i++) {
        exps[i] = exps[i] + ECCODEWORDS[_vercor];
    }

    let adjust = exps[0] - xExp[0];

    for (let i = 0; i < xExp.length; i++) {
        xExp[i] = xExp[i] + adjust;
    }

    let res = multXOR(terms, exps, alphaExp, xExp);

    for (let i = 0; i < iterations; i++) {
        res = multXOR(res[0], res[3], alphaExp, res[3]);
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
    let max = ECCODEWORDS[_vercor] + 1;

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
    if (terms.length > ECCODEWORDS[_vercor]) {
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


function addPadding(data, nBits) {
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
    if (rem > 0) {
        return num.padEnd(num.length + 8 - rem, "0");
    }

    return num;

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
    return /^-?\d+$/.test(message);
}

function isAlphanumeric(message) {
    for (let i = 0; i < message.length; i++) {
        if (CONVERSIONTABLE[message[i]] == undefined) {
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