class Message {
    constructor(original, version, correction) {
        this.original = original;
        this.version = version;
        this.correction = correction;
        this.verCor = `${version}-${correction}`;
        this.modeDescription = this.determineEncoding();
        this.mode = MODE[this.modeDescription];
        this.count = this.determineCharCount();
        this.nBits = 8 * CORRECTIONTABLE[this.verCor];
        this.data;
        this.terminator;
        this.bitPadding;
        this.bytePadding;
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
        let chunks = makeChunks(this.original, 1);
        const length = chunks.reduce(function (acc, item) {
            isEmoji(item) ? acc += 4 : acc++;
            return acc;
        }, 0)

        return this.count = toBin(length, LENGTH[this.modeDescription])
    }

    buildMessage() {
        this.encode();
        this.addPadding();
        this.interleaveMessage();
        this.addRemainder();

        //console.log(this.data.length);
        //console.log(this);
        return this.data;
    }

    encode() {
        let encodedMessage;
        switch (this.modeDescription) {
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

        if (this.nBits - this.data.length > MAXPADDING) {
            padding = this.data.length + MAXPADDING;
            this.terminator = MAXPADDING;
        } else {
            this.terminator = padding - this.data.length;
        }

        this.data = this.data.padEnd(padding, '0');



        if (this.data.length % 8 > 0) {
            this.data = this.data.padEnd(this.data.length + 8 - this.data.length % 8, '0');
        }

        if (this.nBits > this.data.length) {
            this.data = this.data.padEnd(this.nBits, STANDARD_PADDING);
        }

        return this.data;
    }

    createCorrectionCodewords(block) {
        const polynomial = calcPolynomial(block);
        const correctionCodewords = polyDiv(polynomial.terms, polynomial.exps, this.verCor);
        const binaryCodewords = correctionCodewords.map(item => toBin(item, 8), '');
        return binaryCodewords;
    }

    addRemainder() {
        let remainder = '';
        remainder = remainder.padEnd(REMAINDER[this.version], '0');
        return this.data = this.data + remainder;
    }

    // const SPLITTER = {
        //     0: 15,
        //     1: 15,
        //     2: 16,
        //     3: 16
        // }


        // //3-H
        // const SPLITTER = {
        //     0: 13,
        //     1: 13,
        // }

        // const SPLITTER = {
        //     0: CORRECTIONTABLE[this.verCor]
        // }

    interleaveMessage() {
        const SPLITTER = this.createSplitter();
        let blockedData = [];
        let blocks = [];
        let newData = [];

        this.originalDataEncoded = this.data;

        for (let i = 0; i < Object.keys(SPLITTER).length; i++) {
            //const block = newData.splice(0, SPLITTER[i] * 8).join('');
            const block = this.data.split('').splice(0, SPLITTER[i] * 8).join('');
            blocks.push(block);
            blockedData.push(this.createCodewords((block)));
        }

        let corrections = blocks.map(x => this.createCorrectionCodewords(x));

        //aqui tiene que ir el splitter más grande en lugar de 99
        for (let j = 0; j < 99; j++) {
            for (let i = 0; i < Object.keys(SPLITTER).length; i++) {
                if (blockedData[i][j]) {
                    newData.push(blockedData[i][j]);
                }
            }
        }

        for (let j = 0; j < ECCODEWORDS[this.verCor]; j++) {
            for (let i = 0; i < Object.keys(SPLITTER).length; i++) {
                if (corrections[i][j]) {
                    newData.push(corrections[i][j]);
                }
            }
        }
        this.data = newData.join('')
    }

    createCodewords(array) {
        let tempArray = Array.from(array);
        let codewords = [];
        while (tempArray.length > 0) {
            codewords.push(tempArray.splice(0, 8).join(''))
        }
        return codewords;
    }

    createSplitter() {
        const splitter = {};
        if (this.version < 3 || this.verCor == '3-L' || this.verCor == '3-M' || this.verCor == '4-L' || this.verCor == '5-L') {
            splitter[0] = CORRECTIONTABLE[this.verCor];
        } else if (this.verCor == '3-Q' || this.verCor == '3-H' || this.verCor == '4-M' || this.verCor == '4-Q') {
            splitter[0] = CORRECTIONTABLE[this.verCor] / 2;
            splitter[1] = CORRECTIONTABLE[this.verCor] / 2;
        } else if (this.verCor == '4-H') {
            splitter[0] = CORRECTIONTABLE[this.verCor] / 4;
            splitter[1] = CORRECTIONTABLE[this.verCor] / 4;
            splitter[2] = CORRECTIONTABLE[this.verCor] / 4;
            splitter[3] = CORRECTIONTABLE[this.verCor] / 4;
        } else if (this.verCor == '5-Q') {
            splitter[0] = 15
            splitter[1] = 15
            splitter[2] = 16
            splitter[3] = 16
        }
        return splitter;
    }
}