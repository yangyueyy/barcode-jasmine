'use strict';
const main = require('../main/app.js');

describe('barcode-jasmain',() => {
    let digitbars;
    beforeEach(()=>{
        digitbars =[
            {
            digit:'1',
            bar:':::||'
            },
            {
             digit: '2', 
             bar: '::|:|'
            },
            {
            digit:'3',
            bar:'::||:'
            },
            {
             digit:'4', 
             bar:':|::|'
            },
            {
            digit :'5',
            bar:':|:|:'
            },
            {
             digit:'6',
            bar:':||::'
            },
            {
             digit:'7',
            bar:'|:::|'
            },
            {digit:'8',
            bar:'|::|:'},
            {digit:'9',
            bar:'|:|::'},
            {digit:'0',
            bar:'||:::'}
        ]
    });
    it('95713 print correct barcode',() => {
        let numbers = '95713';
        const text = main.printBarcode(numbers,digitbars);

        const expectText ='||:|:::|:|:|:::|:::||::||::|:|:|';

        expect(text).toEqual(expectText);
    });

    it('95713 checkout',() => {
        let numbers = '95713';
        const digits = main.checkoutDigits(numbers);

        const expectDigits ='95713';

        expect(digits).toEqual(expectDigits);
    });

    it('123456 checkout',() => {
        let numbers = '123456';
        const digits = main.checkoutDigits(numbers);

        const expectDigits ='illegal format';

        expect(digits).toEqual(expectDigits);
    });

    it('12m56 checkout',() => {
        let numbers = '12m56';
        const digits = main.checkoutDigits(numbers);

        const expectDigits ='illegal format';

        expect(digits).toEqual(expectDigits);
    });

    it('45056-1234 print correct barcode',() => {
        let numbers = '45056-1234';
        const text = main.printBarcode(numbers,digitbars);

        const expectText ='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        expect(text).toEqual(expectText);
    });

    it('45056-1234 checkout',() => {
        let numbers = '45056-1234';
        const digits = main.checkoutDigits(numbers);

        const expectDigits ='450561234';

        expect(digits).toEqual(expectDigits);
    });

    it('95713 barcode',() => {
        let numbers = '95713';
        const digits = main.checkoutDigits(numbers);
        const barcode = main.buildBarcode(digits);

        const expectbarcode ='957135';

        expect(barcode).toEqual(expectbarcode);
    });

    it('45056-1234 checkout',() => {
        let numbers = '45056-1234';
        const digits = main.checkoutDigits(numbers);
        const barcode = main.buildBarcode(digits);

        const expectbarcode ='4505612340';

        expect(barcode).toEqual(expectbarcode);
    });

    it('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::| checkoutText',() => {
        let text = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        const formatText = main.checkoutText(text);

        const expectText ='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        expect(formatText).toEqual(expectText);
    });

    it('||:|:::|:|:|:::|:::||::||::|:|:| checkoutText',() => {
        let text = '||:|:::|:|:|:::|:::||::||::|:|:|';
        const formatText = main.checkoutText(text);

        const expectText ='||:|:::|:|:|:::|:::||::||::|:|:|';

        expect(formatText).toEqual(expectText);
    });

    it(':|:|:::|:|:|:::|:::||::||::|:|:| checkoutText',() => {
        let text = ':|:|:::|:|:|:::|:::||::||::|:|:|';
        const formatText = main.checkoutText(text);

        const expectText ='illegal format';

        expect(formatText).toEqual(expectText);
    });

    it('|1:|:::|:|:|:::|:::||::||::|:|:| checkoutText',() => {
        let text = '|1:|:::|:|:|:::|:::||::||::|:|:|';
        const formatText = main.checkoutText(text);

        const expectText ='illegal format';

        expect(formatText).toEqual(expectText);
    });

    it('||:|:::|:|:|:::|:::||::||::|::|:| checkoutText',() => {
        let text = '||:|:::|:|:|:::|:::||::||::|::|:|';
        const formatText = main.checkoutText(text);

        const expectText ='illegal format';

        expect(formatText).toEqual(expectText);
    });

    it('||:|:::|:|:|:::|:::||::||::|:|:| checkoutText',() => {
        let text = '||:|:::|:|:|:::|:::||::||::|:|:|';
        const formatText = main.checkoutText(text);
        const barcodes = main.getBarcode(formatText,digitbars);
        const expectBarcodes = '957135';

        expect(barcodes).toEqual(expectBarcodes);
    });
    it('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::| checkoutText',() => {
        let text = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        const formatText = main.checkoutText(text);
        const barcodes = main.getBarcode(formatText,digitbars);
        
        const expectBarcodes= '4505612340';

        expect(barcodes).toEqual(expectBarcodes);
    });
   /* it('||:|:::|:|:|:::|:::||::||::|:|:| checkoutText',() => {
        let text = '||:|:::|:|:|:::|:::||::||::|:|:|';
        const formatText = main.checkoutText(text);
        const barcodes = main.getBarcode(formatText,digitbars);
        const digits = main.checkoutLastNum(barcodes);
        
        const expectDigits= '95713';

        expect(digits).toEqual(expectDigits);
    });*/
    it('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::| checkoutText',() => {
        let text = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        const formatText = main.checkoutText(text);
        const barcodes = main.getBarcode(formatText,digitbars);
        const digits = main.checkoutLastNum(barcodes);

        const expectDigits= '450561234';

        expect(digits).toEqual(expectDigits);
    });

    it('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::| checkoutText',() => {
        let text = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        const formatText = main.checkoutText(text);
        const barcodes = main.getBarcode(formatText,digitbars);
        const digits = main.checkoutLastNum(barcodes);
        const numbers = main.getNumbers(digits);
        const expectNumbers= '45056-1234';

        expect(numbers).toEqual(expectNumbers);
    });

});

