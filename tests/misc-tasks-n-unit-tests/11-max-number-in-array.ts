import {test, expect} from '@playwright/test'

function maxNumberInArray(array: Array<number>): number{
    const maxNumber = Math.max(...array);
    return maxNumber;
}

console.log(maxNumberInArray([100, 2, 333, 0.23, 222, 1000]));

test('unit test for function maxNumberInArray', async () => {
    const array = [100, 2, 333, 0.23, 222, 1000];
    expect(maxNumberInArray(array)).toEqual(1000);
})