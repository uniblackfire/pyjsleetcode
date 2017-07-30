// Write a function that takes a string as input and returns the string reversed.
//
// Example:
// Given s = "hello", return "olleh".


/**
 * @param {string} s
 * @return {string}
 */
var reverseString = function (s) {
    let result_arr = [];
    for (let i = s.length - 1; i >= 0; i--) {
        result_arr.push(s[i]);
    }
    return result_arr.join('');
};
