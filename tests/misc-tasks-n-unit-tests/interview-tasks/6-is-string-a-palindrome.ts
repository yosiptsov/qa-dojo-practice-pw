function isPalindrome(str: string = 'rotator'){
    const reversedLink = [...str].reverse().join('');
    if (str === reversedLink){
        return true;
    } else {
        return false;
    }
}
console.log(isPalindrome());
console.log(isPalindrome("racecar")); // Should output: true
console.log(isPalindrome("hello")); // Should output: false
console.log(isPalindrome("A man a plan a canal Panama".toLowerCase().replace(/[^a-z]/g, ""))); // Should output: true