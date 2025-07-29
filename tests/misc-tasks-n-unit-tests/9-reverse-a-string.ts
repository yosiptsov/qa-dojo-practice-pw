//TASK: revers a string
function reverseString(str: string = "Hello World!") {
  return [...str].reverse().join('');
}

console.log(reverseString());


