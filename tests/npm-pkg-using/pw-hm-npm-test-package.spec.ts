import {test, expect} from '@playwright/test';

const isEven = require('pw-hm-npm-test-package');

test('npm-pkg-1: the function should return TRUE for number 4', {tag: ['@npm-pkg', '@HW1'] }, async () => {
    await expect(isEven(4)).toBeTruthy();
});

test('npm-pkg-2: the function should return FALSE for number 3', {tag: ['@npm-pkg', '@HW1'] }, async () => {
    await expect(isEven(3)).toBeFalsy();
});