export function childDetector(age: number) {
 if (typeof age === 'number' && age >= 0 && age !== undefined && age <= 130) {
    if (age >= 18){ 
        return 'Ви можете голосувати.' 
    } else if (age < 18) {
        return 'Ви не можете голосувати.'
    }
 } else {
    throw Error('Incorrect age format: use a positive number in range 0-130');
 }
}

console.log(childDetector(12));