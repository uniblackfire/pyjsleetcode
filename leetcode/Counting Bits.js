// Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.
//
// Example:
// For num = 5 you should return [0,1,1,2,1,2].
//
// Follow up:
//
// It is very easy to come up with a solution with run time O(n*sizeof(integer)). But can you do it in linear time O(n) /possibly in a single pass?
// Space complexity should be O(n).
// Can you do it like a boss? Do it without using any builtin function like __builtin_popcount in c++ or in any other language.


/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
    let result = new Array(num + 1);
    result[0] = 0;
    if (num === 0) {
        return result;
    }
    let index = 1;
    let pow2 = 1;
    while (index <= num) {
        if (pow2 === index) {
            result[index] = 1;
            pow2 <<= 1; // pow2 * 2
        } else {
            result[index] = result[index - (pow2 >> 1)] + 1;
        }
        index++;
    }
    return result;
};

console.log(countBits(16)); // [0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1]


// let result = new Array(num + 1);
// result[0] = 0;
// if (num === 0) {
//     return result;
// }
// let index = 1;
// let power2 = 1;
// while (index <= num) {
//     if (power2 === index) {
//         result[index] = 1;
//         power2 *= 2;
//     } else {
//         let base_index = power2 / 2;
//         result[index] = result[index - base_index] + result[base_index];
//     }
//     index++;
// }
// return result;
