#!/usr/bin/env node

'use strict';

// https://leetcode.com/problems/sliding-window-maximum/description/

// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
//
//     For example,
//     Given nums = [1,3,-1,-3,5,3,6,7], and k = 3.
//
// Window position                Max
// ---------------               -----
//[1  3  -1] -3  5  3  6  7       3
// 1 [3  -1  -3] 5  3  6  7       3
// 1  3 [-1  -3  5] 3  6  7       5
// 1  3  -1 [-3  5  3] 6  7       5
// 1  3  -1  -3 [5  3  6] 7       6
// 1  3  -1  -3  5 [3  6  7]      7
// Therefore, return the max sliding window as [3,3,5,5,6,7].
//
//     Note:
// You may assume k is always valid, ie: 1 ≤ k ≤ input array's size for non-empty array.
//
// Follow up:
//     Could you solve it in linear time?

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    let len = nums.length;
    if (len === 0) {
        return nums;
    }
    let result = new Array(len - k + 1);
    let dq = [];
    for (let i = 0; i < len; i++) {
        const cmp = i - k + 1;
        if (dq.length && dq[0] < cmp) {
            dq.shift();
        }
        while (dq.length && nums[i] >= nums[dq[dq.length - 1]]) {
            dq.pop();
        }
        dq.push(i);
        if (cmp >= 0) {
            result[cmp] = nums[dq[0]];
        }
    }
    return result;
};

//https://discuss.leetcode.com/topic/26480/o-n-solution-in-java-with-two-simple-pass-in-the-array/21
var maxSlidingWindow2 = function (nums, w) {
    const numsLen = nums.length;

    if (!numsLen) return [];

    const max_left = new Array(numsLen);
    const max_right = new Array(numsLen);

    max_left[0] = nums[0];
    max_right[numsLen - 1] = nums[numsLen - 1];
    console.log(max_left)
    console.log(max_right)
    console.log('------')
    for (let i = 1; i < numsLen; i++) {
        max_left[i] = (i % w === 0) ? nums[i] : Math.max(max_left[i - 1], nums[i]);

        const j = numsLen - 1 - i;
        max_right[j] = (j % w === 0) ? nums[j] : Math.max(max_right[j + 1], nums[j]);
        console.log(max_left)
        console.log(max_right)
        console.log('------')

    }

    const result = new Array(numsLen - w + 1);
    for (let i = 0, loop = result.length; i < loop; i++) {
        result[i] = Math.max(max_right[i], max_left[i + w - 1]);
    }

    return result;
};


console.log(maxSlidingWindow2([1, 3, -1, -3, 5, 3, 6, 7], 3));
