// using filter
function removeDuplicates(arr){
    let resultingArray = [...arr];
    for(let i = 0; i <= arr.length; i++){
        return arr.filter((item, index) => arr.indexOf(item) === index);
    }
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // Should output: [1, 2, 3, 4, 5]
console.log(removeDuplicates(["a", "b", "a", "c"])); // Should output: ["a", "b", "c"]
console.log(removeDuplicates([])); // Should output: []

// using set
function removeDuplicatesSet(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicatesSet([1, 2, 2, 3, 4, 4, 5])); // Should output: [1, 2, 3, 4, 5]
console.log(removeDuplicatesSet(["a", "b", "a", "c"])); // Should output: ["a", "b", "c"]
console.log(removeDuplicatesSet([])); // Should output: []
