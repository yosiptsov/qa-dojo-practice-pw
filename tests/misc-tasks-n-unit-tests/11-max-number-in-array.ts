export function maxNumberInArray(array: Array<number>): number{
    const maxNumber = Math.max(...array);
    //const maxNumber: number = (...array);
    return maxNumber;
}

console.log(maxNumberInArray([100, 2, 333, 0.23, 222, 1000]));
