//return n elements of an input array
export function firstElemsOfArray(inputArray: Array<unknown>, n: number = 1): Array<unknown>|string {
    return inputArray.slice(0, n);    
}

//return n last elements of an input array
export function lastElemsOfArray(inputArray: Array<unknown>, n: number = 1): Array<unknown> {
    return inputArray.slice(inputArray.length - n, inputArray.length);
}