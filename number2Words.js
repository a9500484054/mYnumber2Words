function number2Words(value) {  
    const ones = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const ones2 = ['', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
    const thousands = ['', 'тысяча', 'тысячи', 'тысяч'];
    const rublesForms = ['рубль', 'рубля', 'рублей'];
    let step = 1;

    function numberToWords(price) {
        
        price = String(price).replace(/\s/g, "").split('.');

        let num = +price[0];
        let pennies = +price[1];

        console.log(num);
        if (num === 0) return 'ноль рублей';
        if (num > 999999999999) throw new Error('Число не должно превышать 999,999,999,999.');

        let words = [];

        let billions = Math.floor(num / 1000000000);
        // console.log('billions', billions)
        if (billions > 0) {
            words.push(convertHundreds(billions));
            words.push(getPluralForm(billions, 'миллиард', 'миллиарда', 'миллиардов'));
        }

        let millions = Math.floor((num % 1000000000) / 1000000);
        // console.log('millions', millions)
        if (millions > 0) {
            words.push(convertHundreds(millions));
            words.push(getPluralForm(millions, 'миллион', 'миллиона', 'миллионов'));
        }

        let thousands = Math.floor((num % 1000000) / 1000);
        console.log('thousands', thousands)
        console.log('num.length', );
        if (thousands > 0) {
            words.push(convertHundreds(thousands, String(num).length));
            console.log('thousands', words);
            words.push(getPluralForm(thousands, 'тысяча', 'тысячи', 'тысяч'));
        }

        let remainder = num % 1000;
        console.log('remainder', remainder)
        if (remainder > 0) {
            words.push(convertHundreds(remainder));
        }

        let rubles = Math.floor(num);
        words.push(getPluralForm(rubles, 'рубль', 'рубля', 'рублей'));

        // let pennies = num % 1;
        if (pennies > 0) {
            words.push(getPennyText(pennies));
        }
        console.log(words);
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!theEnd!!!!!!!!!!!!!!!!!!!!!!!!');
        return words.join(' ');
    }

    function convertHundreds(num , numLength = 0) {
        console.log('шаг ', step++);
        let words = [];
        let hundredsDigit = Math.floor(num / 100);
        console.log('hundredsDigit', hundredsDigit);
        if (hundredsDigit > 0) {
            words.push(hundreds[hundredsDigit]);
        }
        console.log(words);
        
        let tensDigit = Math.floor((num % 100) / 10);
        let onesDigit = num % 10;
        console.log('tensDigit ', tensDigit);
        console.log('onesDigit ', onesDigit);
        console.log('num ', num);
        
        if (tensDigit > 1) {
            console.log(1, numLength);
            words.push(tens[tensDigit]);
            words.push(ones[onesDigit]);
        } else if (tensDigit === 1) {
            console.log(2, numLength);
            words.push(teens[onesDigit]);
        } else {
            console.log(3, numLength);
            if(numLength === 4 || numLength === 7) {
                words.push(ones2[onesDigit]);
            } else {
                words.push(ones[onesDigit]);
            }
        }

        return words.join(' ');
    }

    function getPluralForm(num, form1, form2, form5) {
        let lastDigit = num % 10;
        let lastTwoDigits = num % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return form5;
        } else if (lastDigit === 1) {
            return form1;
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return form2;
        } else {
            return form5;
        }
    }

    function getPennyText(number) {
        let pennies = number % 10;
        if (pennies === 1 && number !== 11) {
        return number + " копейка";
        } else if ((pennies === 2 || pennies === 3 || pennies === 4) && (number < 10 || number > 20)) {
        return number + " копейки";
        } else {
        return number + " копеек";
        }
    }

    
    return numberToWords(value) + ' 00 копеек';
}