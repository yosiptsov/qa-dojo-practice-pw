import { test, expect } from '@playwright/test';
import { evenOrOddNumber } from './1-hw-even-odd-number.ts';

test.describe('Unit tests for function Even/Odd numbers', () => {
  test('isEven', { tag: ['@unit'] }, async () => {
    expect(evenOrOddNumber(2)).toEqual('Число парне');
  });

  test('number is even - max value', { tag: ['@unit'] }, async () => {
    expect(evenOrOddNumber(2.2222222222222222222222222222222222222222222222222)).toEqual('Число непарне');
  });

  test('isOdd', { tag: ['@unit'] }, async () => {
    expect(evenOrOddNumber(1)).toEqual('Число непарне');
  });

  test('number is odd - max value', { tag: ['@unit'] }, async () => {
    expect(evenOrOddNumber(2.2123123123123123123123123123123123123123123131313)).toEqual('Число непарне');
  });

  test('zero should be "парне"', { tag: ['@unit'] }, async () => {
    expect(evenOrOddNumber(0)).toEqual('Число парне');
  });

  test('should work with negative numbers', { tag: ['@unit'] }, async () => {
    expect(evenOrOddNumber(-2)).toEqual('Число парне');
  });

  test('string should trow an exception', { tag: ['@unit'] }, async () => {
    try {
      evenOrOddNumber('someString');
    } catch (error) {
      expect(error.message).toMatch('Incorrect format');
    }
  });
});
