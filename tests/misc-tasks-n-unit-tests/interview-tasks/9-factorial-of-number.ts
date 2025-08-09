// version 1
function factorial(number: number): number {
  if (number === 0 || number === 1) {
    return 1;
  } else {
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result = result * i;
    }
    return result;
  }
}

console.log(factorial(5)); // Should output: 120
console.log(factorial(0)); // Should output: 1
console.log(factorial(3)); // Should output: 6

// version 2 - recursion
function factorialRecursive(number: number): number {
  if (number === 0 || number === 1) {
    return 1;
  }
  return number * factorialRecursive(number - 1);
}

console.log(factorialRecursive(5)); // Should output: 120
console.log(factorialRecursive(0)); // Should output: 1
console.log(factorialRecursive(3)); // Should output: 6