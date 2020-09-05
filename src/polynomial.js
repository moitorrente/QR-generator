
function calcPolynomial(nums) {
    let polynomial = {
        terms: [],
        exps: []
    }

    number = Array.from(nums);

    while (number.length > 0) {
        polynomial.terms.push(parseInt(number.splice(0, 8).join(''), 2));
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

let aux;

function polyDiv(terms, exps, vercor) {
    const iterations = terms.length - 1;
    const genPolynomial = getGeneratorPolynomial(ECCODEWORDS[vercor]);

    let alphaExp = Array.from(genPolynomial.alphaExp);
    let xExp = Array.from(genPolynomial.xExp);
    for (let i = 0; i < exps.length; i++) {
        exps[i] = exps[i] + ECCODEWORDS[vercor];
    }

    const adjust = exps[0] - xExp[0];

    for (let i = 0; i < xExp.length; i++) {
        xExp[i] = xExp[i] + adjust;
    }

    let res = multXOR(terms, exps, alphaExp, xExp, vercor);

    for (let i = 0; i < iterations; i++) {
        res = multXOR(res[0], res[3], alphaExp, res[3], vercor);
    }

    return res[0];
}


function multXOR(terms, exps, inAlphaExp, xExp, vercor) {
    let alphaExp = Array.from(inAlphaExp);
    let alphaNum = [];
    newAlpha = ANTILOGTABLE[terms[0]];

    for (let i = 0; i < alphaExp.length; i++) {
        alphaExp[i] += newAlpha;
        if (alphaExp[i] > 255) alphaExp[i] = alphaExp[i] % 255;
        alphaNum[i] = LOGTABLE[alphaExp[i]];
    }

    let temp = [];
    let max = ECCODEWORDS[vercor] + 1;

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
    if (terms.length > ECCODEWORDS[vercor]) terms.splice(0, 1);


    for (let i = 0; i < xExp.length; i++) {
        xExp[i] -= 1;
    }

    let newEexps = Array.from(exps)
    newEexps.splice(terms.length - 1);

    exps = newEexps;

    return [terms, exps, alphaExp, xExp];
}