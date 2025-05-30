import { test, expect } from '@playwright/test';
import { greetings } from './2-hw-greetings.ts';

test.describe('Unit tests for function "greetings"', () => {
  // positive
  test('number - boundary values from range "morning"', { tag: ['@unit'] }, async () => {
    expect(greetings(11)).toEqual('Доброго ранку!');
    expect(greetings(0)).toEqual('Доброго ранку!');
  });

  test('number - boundary values from range "evening"', { tag: ['@unit'] }, async () => {
    expect(greetings(19)).toEqual('Доброго вечора!');
    expect(greetings(24)).toEqual('Доброго вечора!');
  });

  test('number - boundary values from range "day"', { tag: ['@unit'] }, async () => {
    expect(greetings(12)).toEqual('Доброго дня!');
    expect(greetings(18)).toEqual('Доброго дня!');
  });

  test('decimal number inside the range should be allowed', { tag: ['@unit'] }, async () => {
    expect(greetings(12.3333333)).toEqual('Доброго дня!');
    expect(greetings(18.3333333)).toEqual('Доброго вечора!');
  });
  
  test('decimal long number inside the range should be allowed', { tag: ['@unit'] }, async () => {
    expect(greetings(12.333333311111111111111111111111111111333333311111111111111111111111111111)).toEqual('Доброго дня!');
    expect(greetings(18.333333311111111111111111111111111111333333311111111111111111111111111111)).toEqual('Доброго вечора!');
  });

  // errors
  test('string should trow an exception', { tag: ['@unit'] }, async () => {
    try {
      greetings('someString');
    } catch (error) {
      expect(error.message).toMatch('Incorrect time format: use a number in range 0-24');
    }
  });

  test('empty parameter should trow an exception', { tag: ['@unit'] }, async () => {
    try {
      greetings();
    } catch (error) {
      expect(error.message).toMatch('Incorrect time format: use a number in range 0-24');
    }
  });

  test('values outside the range 0-24 should trow an exception', { tag: ['@unit'] }, async () => {
    try {
      greetings(-1);
    } catch (error) {
      expect(error.message).toMatch('Incorrect time format: use a number in range 0-24');
    }
    try {
      greetings(25);
    } catch (error) {
      expect(error.message).toMatch('Incorrect time format: use a number in range 0-24');
    }
  });

  test(
    'long number, long positive decimal, long negative decimal outside the range should return proper error',
    { tag: ['@unit'] },
    async () => {
      try {
        greetings(1212121212121212121212121212121212121212121212121212121212);
      } catch (error) {
        expect(error.message).toMatch('Incorrect time format: use a number in range 0-24');
      }
      try {
        greetings(25.1111111111111111111111111111111111111111111111111111);
      } catch (error) {
        expect(error.message).toMatch('Incorrect time format: use a number in range 0-24');
      }
      try {
        greetings(-25.1111111111111111111111111111111111111111111111111111);
      } catch (error) {
        expect(error.message).toMatch('Incorrect time format: use a number in range 0-24');
      }
    }
  );
});
