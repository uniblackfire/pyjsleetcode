// https://leetcode.com/problems/lexicographical-numbers/description/

// Given an integer n, return 1 - n in lexicographical order.
//
// For example, given 13, return: [1,10,11,12,13,2,3,4,5,6,7,8,9].
//
// Please optimize your algorithm to use less time and space. The input size may be as large as 5,000,000.

/**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function (n) {
    let ans = [];
    ans.push(1);
    for (let i = 1, prev = 1; i < n; ++i) {
        if (prev * 10 <= n) {
            prev *= 10;
        } else {
            while (prev % 10 === 9 || prev === n) prev = ~~(prev / 10);
            prev++;
        }
        ans.push(prev);
    }
    return ans;
};

console.log(lexicalOrder(13));
