// https://leetcode.com/problems/find-all-duplicates-in-an-array/description/

// Given an array of integers, 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.
//
// Find all the elements that appear twice in this array.
//
// Could you do it without extra space and in O(n) runtime?
//
// Example:
// Input:
// [4,3,2,7,8,2,3,1]
//
// Output:
// [2,3]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
    let result = [];
    nums.sort((x, y) => x - y);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] === nums[i]) {
            result.push(nums[i]);
        }
    }
    return result;
};

//
// O(1) space not including the input and output variables
//
// The idea is we do a linear pass using the input array itself as a hash to store which numbers have been seen before. We do this by making elements at certain indexes negative. See the full explanation here
//
// http://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/
//
//     class Solution(object):
// def findDuplicates(self, nums):
// """
// :type nums: List[int]
// :rtype: List[int]
// """
// res = []
// for x in nums:
// if nums[abs(x)-1] < 0:
// res.append(abs(x))
// else:
// nums[abs(x)-1] *= -1
// return res
