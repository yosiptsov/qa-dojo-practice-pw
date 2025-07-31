// TASK: remove all even numbers from an array
function removeEvenNumbersFromArray(arr: Array<number>) {
    const result = arr.filter(elem => elem % 2 !== 0).sort();
    return result;
}

const array = [3, 5, 4, 2, 1, 6, 8, 7, 9, 5, 6, 9];
console.log(removeEvenNumbersFromArray(array));
