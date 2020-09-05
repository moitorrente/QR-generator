class Message {
    constructor(original, version, correction) {
        this.original = original;
        this.version = version;
        this.correction = correction;
        this.modeDescription = this.determineEncoding();
        this.mode = MODE[this.modeDescription];
        this.count = this.determineCharCount();
        this.nBits = 8 * CORRECTIONTABLE[`${version}-${correction}`];;
        this.data;
    }

    determineEncoding() {
        if (isNumeric(this.original)) {
            this.modeDescription = 'numeric';
        } else if (isAlphanumeric(this.original)) {
            this.modeDescription = 'alphanumeric';
        } else {
            this.modeDescription = 'byte';
        }
        return this.modeDescription;
    }

    determineCharCount() {
        return this.count = toBin(this.original.length, LENGTH[this.modeDescription])
    }

    buildMessage() {
        this.encode();
        this.addPadding();
        this.addCorrectionCodewords();
        this.addRemainder();
        return this.data;
    }

    addCorrectionCodewords() {
        const polynomial = calcPolynomial(this.data);
        const correctionCodewords = polyDiv(polynomial.terms, polynomial.exps);
        let binaryCodewords = "";
        for (let i = 0; i < correctionCodewords.length; i++) {
            binaryCodewords += toBin(correctionCodewords[i], 8);
        }
        return this.data = this.data + binaryCodewords;
    }

    addRemainder() {
        let remainder = "";
        for (let i = 0; i < REMAINDER[this.version]; i++) {
            remainder += '0';
        }
        return this.data = this.data + remainder;
    }

    encode() {
        let encodedMessage;
        switch (this.mode) {
            case 'numeric':
                encodedMessage = numericEncoding(this.original);
                break;
            case 'alphanumeric':
                encodedMessage = alphanumericEncoding(this.original);
                break;
            default:
                encodedMessage = byteEncoding(this.original);
                break;
        }

        this.data = this.mode + this.count + encodedMessage.join('');
        return this.data;
    }

    addPadding() {
        const MAXPADDING = 4;
        const STANDARD_PADDING = '1110110000010001';
        let padding = this.nBits;

        if (this.nBits - this.data.length > MAXPADDING) padding = this.data.length + MAXPADDING;
        this.data = this.data.padEnd(padding, '0');

        if (this.data.length % 8 > 0) this.data.padEnd(this.data.length + 8 - this.data.length % 8, '0');
        if (this.nBits > this.data.length) this.data = this.data.padEnd(this.nBits, STANDARD_PADDING);

        return this.data;
    }
}

