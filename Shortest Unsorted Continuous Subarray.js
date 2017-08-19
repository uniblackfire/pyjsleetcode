// https://leetcode.com/problems/shortest-unsorted-continuous-subarray/description/

// Given an integer array, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order, too.
//
// You need to find the shortest such subarray and output its length.
//
// Example 1:
// Input: [2, 6, 4, 8, 10, 9, 15]
// Output: 5
// Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
// Note:
// Then length of the input array is in range [1, 10,000].
// The input array may contain duplicates, so ascending order here means <=.

// https://discuss.leetcode.com/topic/93391/ideas-behind-the-o-n-two-pass-and-one-pass-solutions
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    const LAST_INDEX = nums.length - 1;
    let start = -1, end = -2, max = nums[0], min = nums[LAST_INDEX];
    for (let left = 1, right = LAST_INDEX - 1; left <= LAST_INDEX; left++, right--) {
        if (nums[right] <= min) {
            min = nums[right];
        }
        else {
            start = right;
        }
        if (nums[left] >= max) {
            max = nums[left];
        }
        else {
            end = left;
        }
    }
    return end - start + 1;
};

var findUnsortedSubarray2 = function (nums) {
//     To understand this one-pass solution, we need to introduce some equivalent mathematical models for describing a sorted array (assuming in ascending order). Suppose the given array is nums with length n, these models are as follows:
//
// nums[k] <= nums[k + 1] for all 0 <= k < n - 1.
//
// nums[k] == max[k] for all 0 <= k <= n - 1, where max[k] is the maximum value of subarray nums[0, k].
//
// nums[k] == min[k] for all 0 <= k <= n - 1, where min[k] is the minimum value of subarray nums[k, n - 1].
//
// The first model is the most common one (and probably the most familiar one) while the last two are less common. It's easy to show that the second model is equivalent to the first by noting that for any index k < n - 1, we have max[k] <= max[k + 1], then nums[k] = max[k] <= max[k + 1] = nums[k + 1]. Similar results hold for the third model: nums[k] = min[k] <= min[k + 1] = nums[k + 1].
//
// With these models in place, we can show that if indices i and j satisfy the following conditions, then nums[i, j] will be the shortest subarray we are looking for:
//
// i is smallest index such that nums[i] != min[i];
// j is largest index such that nums[j] != max[j].
// The proof proceeds by showing that the two conditions above are equivalent to the three properties in part II.
//
// Firstly we will show that the first property is held true. From condition 1, we have nums[k] == min[k] for all 0 <= k < i. Then nums[k] = min[k] <= min[k + 1] = nums[k + 1] for all k < i - 1. By definition, nums[0, i - 1] is sorted. Similarly from condition 2, nums[k] == max[k] for all j < k <= n - 1. Then nums[k] = max[k] <= max[k + 1] = nums[k + 1] for all j < k < n - 1. By definition, nums[j + 1, n - 1] is sorted.
//
// Then we will show the third property is satisfied. Let min_m and max_m be the minimum and maximum values of subarray nums[i, j], respectively, then we have min_m >= min[i] >= min[i - 1] = nums[i - 1] and max_m <= max[j] <= max[j + 1] = nums[j + 1].
//
// Lastly we will show that the second property is also valid. Note that if the first and third properties are both true, then we know the subarray nums[0, i - 1] will be exactly the same as subarray nums_sorted[0, i - 1], and the subarray nums[j + 1, n - 1] exactly the same as nums_sorted[j + 1, n - 1]. In this case just suppose we have nums[i] == nums_sorted[i] and nums[j] == nums_sorted[j], let's see what will happen. Note that the subarrays nums[i, n - 1] and nums_sorted[i, n - 1] contain exactly the same elements (though the order may be different), then the minimum element of the former will be the same as the latter. Since nums_sorted[i, n - 1] is sorted in ascending order, we will have min[i] = nums_sorted[i] = nums[i], which contradicts the fact that nums[i] != min[i]. Similarly we can show that nums[j] == nums_sorted[j] implies nums[j] == max[j], which contradicts the fact that nums[j] != max[j].
//
// Finding the smallest index i such that nums[i] != min[i] and the largest index j such that nums[j] != max[j] can be done in one-pass, as shown below. Note that we don't actually need arrays to hold values for min[r] and max[l], by taking advantage of the recurrence relation min[r] = Math.min(min[r + 1], nums[r]) and max[l] = Math.max(max[l - 1], nums[l]). Also we initialized the indices i and j such that correct results will be returned even if the input array is already sorted (which requires initially j - i + 1 = 0).
    let start = 0, end = -1, left = 0, right = nums.length - 1, max = nums[left], min = nums[right];

    for (; right >= 0; left++, right--) {
        max = Math.max(max, nums[left]);
        if (nums[left] !== max) end = left;

        min = Math.min(min, nums[right]);
        if (nums[right] !== min) start = right;
    }

    return end - start + 1;
};

console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]));
console.log(findUnsortedSubarray([2, 1]));
console.log(findUnsortedSubarray([1, 3, 2, 2, 2]));

console.log(findUnsortedSubarray([1, 3, 2, 3, 3]));

console.log(findUnsortedSubarray([1, 3, 2, 2, 3]));
console.log(findUnsortedSubarray([2, 3, 3, 2, 4]));
