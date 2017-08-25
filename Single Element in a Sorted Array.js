// https://leetcode.com/problems/single-element-in-a-sorted-array/description/
//
// Given a sorted array consisting of only integers where every element appears twice except for one element which appears once. Find this single element that appears only once.
//
// Example 1:
// Input: [1,1,2,3,3,4,4,8,8]
// Output: 2
// Example 2:
// Input: [3,3,7,7,10,11,11]
// Output: 10
// Note: Your solution should run in O(log n) time and O(1) space.
//

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    for (let i = 0; i < nums.length - 1; i += 2) {
        if (nums[i + 1] !== nums[i]) {
            return nums[i];
        }
    }
    return nums[nums.length - 1];
};
