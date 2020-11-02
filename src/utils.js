function index(i, j, z) {
    return i + j * z;
}

function mouseClicked() {
    let x = mouseX;
    let y = mouseY;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].checkOver(x, y)) {
            console.log(matrix[index(x, y, rows)]);
            console.log(i)
            //   if (matrix[i].set == 1) {
            //      matrix[i].setVal(0);
            //    } else {
            //        matrix[i].setVal(1);
            //    }
        };
    }
}

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function isNumeric(message) {
    return /^-?\d+$/.test(message);
}

function isAlphanumeric(message) {
    for (const character of message) {
        if (CONVERSIONTABLE[character] == undefined) return false;
    }
    return true;
}

function toBin(number, length) {
    let num = parseInt(number);
    let binaryNum = num.toString(2);
    return binaryNum.padStart(length, '0');
}

function toHex(str) {
    let result = '';

    if (isEmoji(str)) {
        result = emojiToUTF8(str)
    } else {
        for (let i = 0; i < str.length; i++) {
            result += str.codePointAt(i).toString(16);
        }
    }

    return result;
}

function isEmoji(str) {
    var ranges = [
        '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
    ];
    if (str.match(ranges.join('|'))) {
        return true;
    } else {
        return false;
    }
}

function emojiToUTF8(inStr) {
    const str = unescape(encodeURIComponent(inStr));
    let result = '';
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
}

