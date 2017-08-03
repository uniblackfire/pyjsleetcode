// Single Number
// Given an array of integers, every element appears twice except for one. Find that single one.
//
// Note:
// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?



/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let ans = 0;

    let len = nums.length;
    for (let i = 0; i != len; i++)
        ans ^= nums[i];

    return ans;
};

console.log(singleNumber([2, 2, 3, 3, 1]));
