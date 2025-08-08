function sumArray(numbers){
    const initialValue = 0;
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
}

console.log(sumArray([1, 2, 3, 4, 5])); // Should output: 15
console.log(sumArray([-1, 1, -2, 2])); // Should output: 0
console.log(sumArray([10])); // Should output: 10