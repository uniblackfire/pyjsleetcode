// You are given n pairs of numbers. In every pair, the first number is always smaller than the second number.
//
// Now, we define a pair (c, d) can follow another pair (a, b) if and only if b < c. Chain of pairs can be formed in this fashion.
//
// Given a set of pairs, find the length longest chain which can be formed. You needn't use up all the given pairs. You can select pairs in any order.
//
// Example 1:
// Input: [[1,2], [2,3], [3,4]]
// Output: 2
// Explanation: The longest chain is [1,2] -> [3,4]
// Note:
// The number of given pairs will be in the range [1, 1000].


/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function (pairs) {
    pairs.sort((x, y) => x[1] - y[1]);
    console.log(pairs);
    let result = 1;
    let last = pairs[0][1];
    for (let i = 1; i < pairs.length; i++) {
        console.log(pairs[i][0], last)
        if (pairs[i][0] > last) {
            result++;
            last = pairs[i][1];
            console.log('last:', last);
        }
    }
    return result;
};

console.log(findLongestChain([[-10, -8], [8, 9], [-5, 0], [6, 10], [-6, -4], [1, 7], [9, 10], [-4, 7]]));
