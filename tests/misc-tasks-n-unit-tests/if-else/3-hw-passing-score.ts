function passingScore(score: number) {
    if (typeof score === 'number' && score >=0 && score !== undefined) {
        if (score >= 50) {
            return 'Тест складено';
        } else {
            return 'Тест не складено';
        }
    } else {
        throw Error('Incorrect score format: use a positive number')
    }
}

console.log(passingScore(123));
