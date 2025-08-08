// clone input array

//concat
export function arrayCloningConcat(inputArray: Array<unknown>): Array<unknown>|string {
    return inputArray.concat([]);
}

//map
export function arrayCloningMap(inputArray: Array<unknown>): Array<unknown>|string {
    return inputArray.map(it => it);
}

//spread
export function arrayCloningSpread(inputArray: Array<unknown>): Array<unknown>|string {
    return [...inputArray];
}