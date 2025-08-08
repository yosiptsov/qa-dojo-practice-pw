export const isArray = (isArray: unknown): boolean => Array.isArray(isArray)

//HW-2 clone input array - concat
export function arrayCloningConcat(inputArray: Array<unknown>): Array<unknown>|string {
    return isArray(inputArray) ? inputArray.concat([]) : 'input is not an array';
}

//HW-2 clone input array - map
export function arrayCloningMap(inputArray: Array<unknown>): Array<unknown>|string {
    return isArray(inputArray) ? inputArray.map(it => it) : 'input is not an array';
}

//HW-2 clone input array - spread
export function arrayCloningSpread(inputArray: Array<unknown>): Array<unknown>|string {
    return [...inputArray];
}

//HW-3 n elements of an input array
export function firstElemsOfArray(inputArray: Array<unknown>, n: number = 1): Array<unknown>|string {
    return isArray(inputArray) ?  inputArray.slice(0, n) : 'input is not an array';    
}

//HW-4 n last elements of an input array
export function lastElemsOfArray(inputArray: Array<unknown>, n: number = 1): Array<unknown> {
    return inputArray.slice(inputArray.length - n, inputArray.length);
}

//HW-5 union array elements to string
export const joinArray = (inputArray: Array<unknown>, separator?: string): string => inputArray.join(separator)

//HW-6 '-' between even numbers
export function insertDashesBetweenEvenDigits (input: string): string|number{
    // ? /* I set 'string' as a type of the function result, it returns an error 'Type 'string | number' is not assignable to type 'string'. Type 'number' is not assignable to type 'string'.' It doesn't return this error when  */
    
    //convert string into an array of numbers
    const inputArray = [...input].map(Number);
    //make sure if the input string is empty, the function returns empty string, not undefined.
    let result = inputArray.length > 0 ? inputArray[0] : '';

    for (let i = 1; i < inputArray.length; i++) {
        const prevElem = inputArray[i-1];
        const currElem = inputArray[i];

        if (prevElem % 2 === 0 && currElem %2 === 0){
            result += '-' + input[i];
        } else {
            result += input[i];
        }
    }
    return result;
}

//HW-7 array sorting
export function arraySorting(inputArray: Array<number>): Array<number> {
    // clone input array to not to change the original array.
    let sortedArray = [...inputArray];
    const arrayLenght = sortedArray.length;

    // go through all the elements of the array
    for (let i = 0; i < arrayLenght; i++){        
        let currentElem = sortedArray[i];
        let j = i - 1;

        // compare each element of the array with all others and if it more than previous element, then move it to the right, or leave it in the current position if not.
        while (j >=0 && sortedArray[j] > currentElem) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        sortedArray[j + 1] = currentElem;
    }

    return sortedArray;
}

//HW-8 create an array with numbers from Start to Finish
export function createArrayWithNumbers(startNumber: number, finishNumber: number): Array<number> {
    let result: number[] = [];
    for (let i = startNumber; i <= finishNumber; i++) {
        result.push(i);
    }
    return result;
}

 //HW-9 sum of numbers between 2 input numbers - reduce
 export function sumOfNumbersBetweenStartFinish(startNumber: number, finishNumber: number): number {
    let initialValue = 0;
    let inputArray = createArrayWithNumbers(startNumber, finishNumber);
    const sumOfAllElements = inputArray.reduce((accumulator, currentValue) => accumulator + currentValue,initialValue);
    return sumOfAllElements;
    
 }

//HW-10 create an array with numbers from Finish to Start
export function createArrayWithNumbersRevers (startNumber: number, finishNumber: number): Array<number>{
    let result: number[] = [];
    for (let i = startNumber-1; i < finishNumber; i++) {
        result.push(finishNumber-i);
    }
    return result;
}

//HW-11 find a max numbers
export function findMaxValue (firstNumber: number, secondNumber: number): number|string{
    return firstNumber > secondNumber ? firstNumber 
    : firstNumber < secondNumber ? secondNumber : 'Numbers are identical'
}
