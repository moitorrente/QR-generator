class Parser {
    constructor(type) {
        this.type = type;
        this.originalMessage;
        this.parsedMessage;
        this.realLength;
        this.visibleLength;
    }

    getLength(message) {
        const chunks = makeChunks(message, 1);
        const length = chunks.reduce((acc, item) => {
            isEmoji(item) ? acc += 4 : acc++;
            return acc;
        }, 0)
        return length;
    }

    parseInput(message) {
        //console.log(message)
        //this.originalMessage = message;
        switch (this.type) {
            case 'text':
                this.originalMessage = message.text;
                this.parsedMessage = message.text;
                break;
            case 'url':
                this.originalMessage = message.url;
                const coincidences = URLTEXT.map(x => message.url.includes(x) ? true : false).filter(x => x);
                if (coincidences.length == 0) this.parsedMessage = URLTEXT[0] + message.url;
                break;
            case 'sms':
                this.originalMessage = '';
                this.parsedMessage = `SMSTO:${message.phone}:${message.sms}`;
                break;
            case 'phone':
                this.originalMessage = message.phone
                this.parsedMessage = `TEL:${message.phone}`;
                break;
            case 'geo':
                this.originalMessage = '';
                this.parsedMessage = `geo:${message.latitude},${message.longitude}?=${message.query}`;
                break;
            case 'mail':
                this.originalMessage = '';
                this.parsedMessage = `MAILTO:${message.mail}`;
                break;
            case 'contact':
                this.originalMessage = '';
                this.parsedMessage = `MAILTO:${message.mail}`;
                break;
        }

        this.realLength = this.getLength(this.parsedMessage);
        this.visibleLength = this.getLength(this.originalMessage);
        return this.parsedMessage;
    }

    determineMaxChars(version, correction, mode) {
        if (this.type == 'url') {
            return this.maxLength = CAPACITIES[version][correction][mode] - URLTEXT[0].length;
        } else {
            return this.maxLength = CAPACITIES[version][correction][mode];
        }
    }
}