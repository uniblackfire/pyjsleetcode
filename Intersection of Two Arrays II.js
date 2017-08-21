// https://leetcode.com/problems/intersection-of-two-arrays-ii/description/

// Given two arrays, write a function to compute their intersection.
//
// Example:
// Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2, 2].
//
// Note:
// Each element in the result should appear as many times as it shows in both arrays.
// The result can be in any order.
// Follow up:
// What if the given array is already sorted? How would you optimize your algorithm?
// What if nums1's size is small compared to nums2's size? Which algorithm is better?
// What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
    function cmpFunc(x, y) {
        return x - y;
    }

    nums1.sort(cmpFunc);
    nums2.sort(cmpFunc);

    let i = 0, j = 0;
    let nums1Len = nums1.length, nums2Len = nums2.length;
    let resultTmp = new Array(Math.min(nums1Len, nums2Len));
    let idx = 0;
    while (i < nums1Len && j < nums2Len) {
        if (nums1[i] < nums2[j]) i++;
        else if (nums1[i] > nums2[j]) j++;
        else if (nums1[i] === nums2[j]) {
            resultTmp[idx] = nums1[i];
            i++;
            j++;
            idx++;
        }
    }

    return resultTmp.slice(0, idx);
};

console.log(intersect([1, 2], [1, 1]));
