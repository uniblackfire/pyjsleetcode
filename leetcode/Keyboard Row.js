// Given a List of words, return the words that can be typed using letters of alphabet on only one row's of American keyboard like the image below.
//
//
// American keyboard
//
//
// Example 1:
// Input: ["Hello", "Alaska", "Dad", "Peace"]
// Output: ["Alaska", "Dad"]
// Note:
// You may use one character in the keyboard more than once.
// You may assume the input string will only contain letters of alphabet.

function testWordInOneLine(word) {
    const alphabet_dict = {
        Q: 0, W: 0, E: 0, R: 0, T: 0, Y: 0, U: 0, I: 0, O: 0, P: 0,
        A: 1, S: 1, D: 1, F: 1, G: 1, H: 1, J: 1, K: 1, L: 1,
        Z: 2, X: 2, C: 2, V: 2, B: 2, N: 2, M: 2,
    };
    let arr = Array.from(word.toUpperCase());
    let row = alphabet_dict[arr[0]];
    for (let char of arr) {
        if (alphabet_dict[char] !== row) {
            return false;
        }
    }
    return true;
}

/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (words) {
    let result = [];
    for (let word of words) {
        if (testWordInOneLine(word)) {
            result.push(word);
        }
    }
    return result;
};

var findWords2 = function (words) {
    let obj = {
        top: 'qwertyuiop',
        center: 'asdfghjkl',
        bottom: 'zxcvbnm',
    };
    let arr = [];
    for (let val of words) {
        let vals = val.toLowerCase();
        let target;
        let alpha = vals.split('');
        for (let v of Object.values(obj)) {
            if (~v.indexOf(vals[0])) target = v;
        }
        if (alpha.every(value => ~target.indexOf(value))) arr.push(val);
    }
    return arr;
};

console.log(findWords(['Hello', 'Alaska', 'Dad', 'Peace']));
