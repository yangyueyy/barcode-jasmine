'use strict';
function printBarcode(numbers, digitbars) {
    const digits = checkoutDigits(numbers);
    const barcode = buildBarcode(digits);
    const text = printDigits(barcode, digitbars);

    return text;
}

function checkoutDigits(numbers) {
    numbers = numbers.split('-');
    numbers = (parseInt(numbers[0] + numbers[1])).toString();
    if (numbers.length === 5 || numbers.length === 9) {
        return numbers;
    }
    else {
        return 'illegal format';
    }
}

function buildBarcode(digits) {
    let squares = digits;
    let test = 0;
    let sum = 0;
    digits = digits.split('');
    for (let digit of digits) {
        sum += parseInt(digit);
    }
    test = (10 - sum % 10 ) % 10;

    return squares + test;
}

function printDigits(barcode, digitbars) {
    let text = '|';
    let nums = barcode.split('');
    for (let num of nums) {
        let digitbar = digitbars.find(digitbar => digitbar.digit === num);
        if (digitbar) {
            text += digitbar.bar;
        }
    }

    return text + '|';
}

function getDigits(text, digitbars) {
    const formatText = checkoutText(text);
    const barcodes = getBarcode(formatText, digitbars);
    const digits = checkoutLastNum(barcodes);
    const numbers = getNumbers(digits);

    return numbers;
}

function checkoutText(text) {
    const formatText = text;
    if (text.length === 32 || text.length === 52) {
        const texts = text.split('');
        if (texts[0] != '|' || texts[texts.length - 1] != '|') {
            return 'illegal format';
        }
        else {
            const illText = texts.find(text =>text != ':' && text != '|');
            if (illText) {
                return 'illegal format';
            }
            else {
                return formatText;
            }
        }
    }
    else {
        return 'illegal format';
    }
}

function getBarcode(formatText, digitbars) {
    let barcodes = '';
    let index = 0;
    let barArray = [];
    if (formatText.length === 32) {
        barcodes = formatText.substring(1, 31);
        while (index < 30) {
            barArray.push(barcodes.substr(index, 5));
            index += 5;
        }
    }
    else {
        barcodes = formatText.substring(1, 51);
        while (index < 50) {
            var c= barArray.push(barcodes.substr(index, 5));
            index += 5;
        }
    }
    barcodes = barArray.map(barcode => {
        const digitbar = digitbars.find(digitbar => digitbar.bar === barcode);
        return digitbar.digit;
    }).join('');
    return barcodes;
}

function checkoutLastNum(barcodes) {
    let digit = barcodes;
    let num = barcodes.split('').map(barcode => {
        return parseInt(barcode);
    }).reduce((a, b)=>a + b);
    if (num % 10 === 0) {
        return digit.substring(0, digit.length - 1);
    }
}

function getNumbers(digits) {
    let numbers;

    if (digits.length === 9) {
        numbers = digits.split('');
        numbers.splice(5, 0, '-');
        return numbers.join('');
    }
}

module.exports = {
    printBarcode: printBarcode,
    checkoutDigits: checkoutDigits,
    buildBarcode: buildBarcode,
    printDigits: printDigits,
    getDigits: getDigits,
    checkoutText: checkoutText,
    getBarcode: getBarcode,
    checkoutLastNum: checkoutLastNum,
    getNumbers: getNumbers
};