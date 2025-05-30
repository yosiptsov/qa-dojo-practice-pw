export function evenOrOddNumber(number: number) {
  let residueOfDivision = number % 2;
  if (typeof number === 'number') {
    if (residueOfDivision === 0) {
      return 'Число парне';
    } else if (residueOfDivision !== 0) {
      return 'Число непарне';
    }
  } else {
    throw Error('Incorrect format');
  }
}

console.log(evenOrOddNumber(12));
