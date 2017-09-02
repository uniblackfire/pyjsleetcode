//https://leetcode.com/problems/power-of-two/description/

// Given an integer, write a function to determine if it is a power of two.

// https://discuss.leetcode.com/topic/47195/4-different-ways-to-solve-iterative-recursive-bit-operation-math/4
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
    // If n is the power of two:
    //
    // n = 2 ^ 0 = 1 = 0b0000...00000001, and (n - 1) = 0 = 0b0000...0000.
    // n = 2 ^ 1 = 2 = 0b0000...00000010, and (n - 1) = 1 = 0b0000...0001.
    // n = 2 ^ 2 = 4 = 0b0000...00000100, and (n - 1) = 3 = 0b0000...0011.
    // n = 2 ^ 3 = 8 = 0b0000...00001000, and (n - 1) = 7 = 0b0000...0111.
    // we have n & (n-1) == 0b0000...0000 == 0
    //
    // Otherwise, n & (n-1) != 0.
    //
    // For example, n =14 = 0b0000...1110, and (n - 1) = 13 = 0b0000...1101.
    //
    // Time complexity = O(1)
    // return n > 0 && ((n & (n-1)) === 0);
    ////////////
    // let str = n.toString(2);
    // let zeros = '1' + new Array(str.length - 1).fill('0').join('');
    // return str === zeros;
    ///
    if (n < 1) return false;
    let tmp = n;
    let power = 1;
    while (tmp !== 0) {
        tmp >>= 1;
        power <<= 1;
        power >>>= 0;
    }
    power >>>= 1;
    return n === power; // (n ^ power) === 0
};


console.log(isPowerOfTwo(0));//1073741824
