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
        return this.count = toBin(this.original.length, LENGTH[this.modeDescription])
    }

    buildMessage() {
        this.encode();
        this.addPadding();
        this.breakMessage()
        //this.addCorrectionCodewords();
        this.addRemainder();

        console.log(this.data.length);
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
        }

        this.data = this.data.padEnd(padding, '0');

        this.terminator = padding - this.data.length;

        if (this.data.length % 8 > 0) {
            this.data = this.data.padEnd(this.data.length + 8 - this.data.length % 8, '0');
        }

        if (this.nBits > this.data.length) {
            this.data = this.data.padEnd(this.nBits, STANDARD_PADDING);
        }

        return this.data;
    }

    //este se quedará 
    createCorrectionCodewords(block) {
        const polynomial = calcPolynomial(block);
        const correctionCodewords = polyDiv(polynomial.terms, polynomial.exps, this.verCor);
        const binaryCodewords = correctionCodewords.map(item => toBin(item, 8), '');
        return binaryCodewords;
    }

    //este desaparecerá
    addCorrectionCodewords() {
        const polynomial = calcPolynomial(this.data);
        const correctionCodewords = polyDiv(polynomial.terms, polynomial.exps, this.verCor);
        const binaryCodewords = correctionCodewords.reduce((acc, item) => acc + toBin(item, 8), '');

        return this.data = this.data + binaryCodewords;
    }

    addRemainder() {
        let remainder = '';
        remainder = remainder.padEnd(REMAINDER[this.version], '0');
        return this.data = this.data + remainder;
    }

    breakMessage(data, splitter) {
        //const DATA = '0100001101010101010001101000011001010111001001100101010111000010011101110011001000000110000100100000011001100111001001101111011011110110010000100000011101110110100001101111001000000111001001100101011000010110110001101100011110010010000001101011011011100110111101110111011100110010000001110111011010000110010101110010011001010010000001101000011010010111001100100000011101000110111101110111011001010110110000100000011010010111001100101110000011101100000100011110110000010001111011000001000111101100';
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

        const SPLITTER = this.createSplitter();

        console.log('splitter', SPLITTER);

        let blockedData = [];
        let blocks = [];
        let corrections = [];
        let newData = this.data.split('');

        for (let i = 0; i < Object.keys(SPLITTER).length; i++) {
            const block = newData.splice(0, SPLITTER[i] * 8).join('');
            blocks.push(block);
            blockedData.push(this.createCodewords((block)));
        }

        for (let i = 0; i < blocks.length; i++) {
            // for (let j = 0; j < blockedData[i].length; j++) {
            //     console.log("decimal " + i, parseInt(blockedData[i][j], 2), blockedData[i][j]);
            // }


            corrections.push(this.createCorrectionCodewords(blocks[i]));
        }

        //console.log(blocks);
        //console.log(blockedData[3]);
        //console.log(corrections);


        let newD = [];

        //aqui tiene que ir el splitter más grande en lugar de 99
        for (let j = 0; j < 99; j++) {
            for (let i = 0; i < Object.keys(SPLITTER).length; i++) {
                if (blockedData[i][j]) {
                    newD.push(blockedData[i][j]);
                }
            }
        }

        for (let j = 0; j < ECCODEWORDS[this.verCor]; j++) {
            for (let i = 0; i < Object.keys(SPLITTER).length; i++) {
                if (corrections[i][j]) {
                    newD.push(corrections[i][j]);
                }
            }
        }

        //console.log(newD);

        this.data = newD.join('')


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