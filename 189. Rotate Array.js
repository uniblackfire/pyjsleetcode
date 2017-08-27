// https://leetcode.com/problems/rotate-array/description/

// Rotate an array of n elements to the right by k steps.
//
// For example, with n = 7 and k = 3, the array [1,2,3,4,5,6,7] is rotated to [5,6,7,1,2,3,4].
//
// Note:
// Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
//
// [show hint]
//
// Related problem: Reverse Words in a String II


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    const numsLen = nums.length;
    let opTimes = k % numsLen;
    if (opTimes !== 0) {
        if (opTimes > numsLen / 2) {
            opTimes = numsLen - opTimes;
            for (let i = 0; i < opTimes; i++) {
                nums.push(nums.shift());
            }
        } else {
            for (let i = 0; i < opTimes; i++) {
                nums.unshift(nums.pop());
            }
        }
    }
};

var rotate2 = function (nums, k) {
    if (nums.length === 0 || k % nums.length === 0) return;
    let start = 0, i = start, curNum = nums[i], count = 0;
    while (count < nums.length) {
        i = (i + k) % nums.length;
        let tmp = nums[i];
        nums[i] = curNum;
        if (i === start) {
            start++;
            i = start;
            curNum = nums[i];
        }
        else curNum = tmp;
        count++;
    }
};

var rotate3 = function (nums, k) {
    function inplaceReverse(nums, l, r) {
        while (l < r) {
            let temp = nums[l];
            nums[l++] = nums[--r];
            nums[r] = temp;
        }
    }

    let n = nums.length;
    k = (n === 0 ? 0 : k % n);

    inplaceReverse(nums, 0, n - k);
    inplaceReverse(nums, n - k, n);
    nums.reverse();
};
