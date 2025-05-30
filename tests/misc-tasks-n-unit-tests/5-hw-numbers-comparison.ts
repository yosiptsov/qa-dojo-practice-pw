function numbersComparison(numberFirst: number, numberSecond: number) {

    if (numberFirst > numberSecond){ 
        return `Перше число більше. ${numberFirst} > ${numberSecond}` 
    } else if (numberFirst < numberSecond) {
        return `Друге число більше. ${numberSecond} > ${numberFirst}`
    } else if (numberFirst === numberSecond) {
        return 'Числа рівні'    
    }
    return 'Ви передали в функцію "ящірку в стакані"'
}

console.log(numbersComparison(12, 123));
