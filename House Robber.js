// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
//
//     Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

// !DP!
/**
 * @param {number[]} nums
 * @return {number}
 */

var rob = function (nums) {
    // let x = 0, y = 0;
    // for (let i = 0; i < nums.length; ++i) {
    //     if (i & 1) {
    //         x = Math.max(x + nums[i], y);
    //     } else {
    //         y = Math.max(y + nums[i], x);
    //     }
    // }
    // return Math.max(x, y);
    ///////////////
    // if (!nums || nums.length === 0) {
    //     return 0;
    // }
    //
    // let n0 = 0;  // 记录没有选择当前houses时的获取的最大金额
    // let n1 = 0;  // 记录选择当前houses时的获取的最大金额
    // for (let i = 0; i < nums.length; i++) {
    //     let tmp = n0;
    //     n0 = Math.max(n0, n1);  //没有选择当前houses，那么它等于上次选择了或没选择的最大值
    //     n1 = tmp + nums[i];  //选择了当前houses，值只能等于上次没选择的+当前houses的money
    // }
    //
    // return Math.max(n0, n1);
    ////////////////
    let n = nums.length;
    if (n < 2)
        return n === 0 ? 0 : nums[0];

    let cache = new Array(n);
    cache[0] = nums[0];
    cache[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < n; i++) {
        cache[i] = Math.max(cache[i - 2] + nums[i], cache[i - 1]);
    }
    return cache[n - 1];
};

console.log(rob([2, 1, 1, 2])); //3
