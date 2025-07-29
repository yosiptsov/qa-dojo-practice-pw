import {test, expect} from '@playwright/test';
import { maxNumberInArray } from './11-max-number-in-array';

test('unit test for function maxNumberInArray', async () => {
    const array = [100, 2, 333, 0.23, 222, 1000];
    expect(maxNumberInArray(array)).toEqual(1000);
});
