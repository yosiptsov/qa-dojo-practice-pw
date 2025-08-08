function isItPalindrome(str: string = 'rotator'){
    const reversedLink = [...str].reverse().join('');
    if (str === reversedLink){
        return true;
    } else {
        return false;
    }
}

console.log(isItPalindrome());