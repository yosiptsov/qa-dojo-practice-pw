function positiveNegativeNumber(number: number) {
    if (number > 0){ 
        return `число ${number} є додатним`
    } else if (number < 0) {
        return `число ${number} є від'ємним`
    } else if (number === 0) {
        return 'число дорівнює нулю'
    }
    return 'Помилка: невірний формат даних'
}

console.log(positiveNegativeNumber(1));
