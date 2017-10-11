// Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.
//
// You may assume that the array is non-empty and the majority element always exist in the array.
//
// Credits:
// Special thanks to @ts for adding this problem and creating all test cases.


/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let major = nums[0], count = 1;
    for (let i = 1; i < nums.length; i++) {
        if (count === 0) {
            count++;
            major = nums[i];
        } else if (major === nums[i]) {
            count++;
        } else count--;

    }
    return major;
};

console.log(majorityElement([3,3,6,3,7]));
