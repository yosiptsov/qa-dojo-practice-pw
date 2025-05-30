import { test, expect } from '@playwright/test';
import { childDetector } from './4-hw-child-detector.ts';

test.describe('Unit tests for function "childDetector"', () => {
    //positive
  test('boundary values from range "Ви не можете голосувати."', { tag: ['@unit'] }, async () => {
    expect(childDetector(17)).toEqual('Ви не можете голосувати.');
    expect(childDetector(0)).toEqual('Ви не можете голосувати.');
  });

  test('boundary values from range "Ви можете голосувати."', { tag: ['@unit'] }, async () => {
    expect(childDetector(18)).toEqual('Ви можете голосувати.');
    expect(childDetector(130)).toEqual('Ви можете голосувати.');
  });

  // errors
  test('string should trow an exception', { tag: ['@unit'] }, async () => {
    try {
      childDetector('someString');
    } catch (error) {
      expect(error.message).toMatch('Incorrect age format: use a positive number in range 0-130');
    }
  });

  test('empty parameter should trow an exception', { tag: ['@unit'] }, async () => {
    try {
      childDetector();
    } catch (error) {
      expect(error.message).toMatch('Incorrect age format: use a positive number in range 0-130');
    }
  });

  test('values outside the range 0-130 should trow an exception', { tag: ['@unit'] }, async () => {
    try {
      childDetector(-1);
    } catch (error) {
      expect(error.message).toMatch('Incorrect age format: use a positive number in range 0-130');
    }
    try {
      childDetector(131);
    } catch (error) {
      expect(error.message).toMatch('Incorrect age format: use a positive number in range 0-130');
    }
  });

  test(
    'long positive decimal, long negative decimal outside the range should return proper error',
    { tag: ['@unit'] },
    async () => {
      try {
        childDetector(1212121212121212121212121212121212121212121212121212121212);
      } catch (error) {
        expect(error.message).toMatch('Incorrect age format: use a positive number in range 0-130');
      }
      try {
        childDetector(130.1111111111111111111111111111111111111111111111111111);
      } catch (error) {
        expect(error.message).toMatch('Incorrect age format: use a positive number in range 0-130');
      }
      try {
        childDetector(-25.1111111111111111111111111111111111111111111111111111);
      } catch (error) {
        expect(error.message).toMatch('Incorrect age format: use a positive number in range 0-130');
      }
    }
  );
});
