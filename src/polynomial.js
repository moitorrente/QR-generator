
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

    console.log("num?",num)
    console.log("ALPHAEXP?",ALPHAEXP[num])
    generatorPolynomial.alphaExp = ALPHAEXP[num];

    for (let i = num; i > 0; i--) {
        generatorPolynomial.xExp.push(i);
    }

    return generatorPolynomial;
}

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