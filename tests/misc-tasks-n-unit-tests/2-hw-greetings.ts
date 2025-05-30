export function greetings(time: number) {
if (typeof time === 'number' && time >= 0 && time <= 24) {
    if (time < 12 && time >= 0) {
      return 'Доброго ранку!';
    } else if (time > 18 && time <= 24) {
       return 'Доброго вечора!';
    } else if (time >= 12 && time <= 18) {
      return 'Доброго дня!';
    }
  } else {
    throw Error('Incorrect time format: use a number in range 0-24');
  }
}

console.log(greetings(12));
