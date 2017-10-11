// https://leetcode.com/problems/search-insert-position/description/
//
// Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
//
// You may assume no duplicates in the array.
//
// Here are few examples.
// [1,3,5,6], 5 → 2
// [1,3,5,6], 2 → 1
// [1,3,5,6], 7 → 4
// [1,3,5,6], 0 → 0


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let len = nums.length;

    for (let i = 0; i < len; i++) {
        if (target <= nums[i]) {
            return i;
        }
    }
    return len;


};

// Binary search
var searchInsert2 = function (nums, target) {
    let len = nums.length;
    let half = ~~(len / 2);
    if (len === 0) return 0;
    if (target === nums[half]) return half;
    else if (target < nums[half]) return searchInsert(nums.slice(0, half), target);
    else return half + 1 + searchInsert(nums.slice(half + 1), target);
};

console.log(searchInsert2([1], 0));
