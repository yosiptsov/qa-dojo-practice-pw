function factorial(number: number) {
  if (number === 0) {
    return 1;
  } else {
    let result;
    for (let i = 0; number - 1; i++) {
      result = result + number * i;
    }
    return result;
  }
}

console.log(factorial(5)); // Should output: 120
console.log(factorial(0)); // Should output: 1
console.log(factorial(3)); // Should output: 6
