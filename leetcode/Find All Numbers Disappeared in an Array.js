// Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.
//
// Find all the elements of [1, n] inclusive that do not appear in this array.
//
// Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.
//
// Example:
//
// Input:
// [4,3,2,7,8,2,3,1]
//
// Output:
// [5,6]


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    let len = nums.length;
    for (let i = 0; i < len; i++) {
        let m = Math.absc(nums[i]) - 1; // index start from 0
        nums[m] = nums[m] > 0 ? -nums[m] : nums[m];
    }
    let res = [];
    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) res.push(i + 1);
    }
    return res;
};

var findDisappearedNumbers2 = function(nums) {
    let res = [];
    let n = nums.length;
    for (let i = 0; i < n; i++) {
        // (nums[i] - 1) % n this statement can calculate original number
        nums[(nums[i] - 1) % n] += n; //indate num[i](it's 4 at first time) appeared
        console.log('----');
        console.log(nums);
    }

    for (let i = 0; i < n; i++)
        if (1 <= nums[i] && nums[i] <= n) res.push(i + 1);
    return res;
};

console.log(findDisappearedNumbers2([4, 3, 2, 7, 8, 2, 3, 1]));
