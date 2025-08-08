// Write a function that counts the number of vowels (a, e, i, o, u) in a string.

function countVowelsIncludes(str){
    const vowels = 'aeiou';
    return [...str.toLowerCase()].filter((elem) => vowels.includes(elem)).length;
}

function countVowelsMatch(str){
    const pattern = /[aeiou]/;
    const result = [...str.toLowerCase()].filter((elem) => elem.match(pattern));
    return result.length;
}

console.log(countVowelsIncludes("hello")); // Should output: 2
console.log(countVowelsIncludes("JavaScript")); // Should output: 3
console.log(countVowelsIncludes("xyz")); // Should output: 0


console.log(countVowelsMatch("hello")); // Should output: 2
console.log(countVowelsMatch("JavabScript")); // Should output: 3
console.log(countVowelsMatch("xyz")); // Should output: 0