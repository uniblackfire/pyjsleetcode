// https://leetcode.com/problems/power-of-three/description/

// Given an integer, write a function to determine if it is a power of three.
//
// Follow up:
// Could you do it without using any loop / recursion?

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
    // if (n < 0 || n > Number.MAX_SAFE_INTEGER) {
    //     return false;
    // }
    // return 5559060566555523 % n === 0;
    return n > 0 && (n === 1 || (n % 3 === 0 && isPowerOfThree(~~(n / 3))));

};

console.log(isPowerOfThree(9));
