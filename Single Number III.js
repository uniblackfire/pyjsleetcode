// https://leetcode.com/problems/single-number-iii/description/

// Given an array of numbers nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.
//
// For example:
//
// Given nums = [1, 2, 1, 3, 2, 5], return [3, 5].
//
// Note:
// The order of the result is not important. So in the above example, [5, 3] is also correct.
// Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
    let result = [];
    nums.sort((x, y) => x - y);
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] === nums[i - 1]) {
            i--;
        } else {
            result.push(nums[i]);
        }
    }
    return result;
};
var singleNumber2 = function (nums) {
    // Pass 1 :
    // Get the XOR of the two numbers we need to find
    let diff = 0;
    for (let num of nums) {
        diff ^= num;
    }
    // Get its last set bit
    diff &= -diff;

    // Pass 2 :
    let numA = 0, numB = 0; // this array stores the two numbers we will return
    for (let num of nums) {
        if ((num & diff) === 0) // the bit is not set
        {
            numA ^= num;
        }
        else // the bit is set
        {
            numB ^= num;
        }
    }
    return [numA, numB];
};


console.log(singleNumber2([1, 2, 1, 3, 2, 5]));
