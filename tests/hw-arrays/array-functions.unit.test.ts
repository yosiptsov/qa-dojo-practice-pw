import { test, expect } from '@playwright/test';
import { isArray } from './array-functions.ts';

//HW1 isArray
test.describe('HW-1: isArray, the function should return:', () => {
  test('T1: positive, true for an array', { tag: ['@unit'] }, async () => {
    expect(isArray([1,2,3])).toBeTruthy;
  });

  test('T2: positive, false for an empty array', { tag: ['@unit'] }, async () => {
    expect(isArray([])).toBeTruthy;
  });

  test('T3: negative, false for an object', { tag: ['@unit'] }, async () => {
    expect(isArray({key: 'value'})).toBeFalsy;
  });

  test('T4: negative, false for an empty string', { tag: ['@unit'] }, async () => {
    expect(isArray('')).toBeFalsy;
  });
});

//HW-2 clone input array - concat
test.describe('HW-2: ', () => {
  test('T5: positive, ', {tag: ['@unit']}, async () => {

  });
});
//HW-2 clone input array - map

//HW-3 n elements of an input array

//HW-4 n last elements of an input array

//HW-5 union array elements to string

//HW-6 '-' between even numbers

//HW-7 array sorting

//HW-8 create an array with numbers from Start to Finish

//HW-9 sum of numbers between 2 input numbers - reduce

//HW-10 create an array with numbers from Finish to Start

//HW-11 find a max numbers

