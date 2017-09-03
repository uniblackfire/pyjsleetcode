// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/


// Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.
//
// The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.
//
// You may assume that each input would have exactly one solution and you may not use the same element twice.
//
// Input: numbers={2, 7, 11, 15}, target=9
// Output: index1=1, index2=2

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

var twoSum= function (numbers, target) {
    let start = 0, end = numbers.length - 1;
    while (start < end) {
        if (numbers[start] + numbers[end] === target) break;
        if (numbers[start] + numbers[end] < target) start++;
        else end--;
    }
    return [start + 1, end + 1];
};
// Each sum is characterized by two indices (i, j), where 0 <= i < j < n with n the length of the input array. If we were to compute them explicitly, we end up with an n-by-n matrix.
//
// If the input array is not sorted, to search for the target, there is no good way but comparing it with elements from the above matrix one by one. This is the naive O(n^2) solution. Of course you can use a HashMap to memorize visited elements and cut down the time to O(n) so we have the classic space-time tradeoff.
//
// Now if the input array is sorted, the n-by-n summation matrix will have the following properties:
//
// Integers in each row are sorted in ascending order from left to right.
// Integers in each column are sorted in ascending order from top to bottom.
// To find the target, we do not have to scan the whole matrix now since it exhibits some partial order. We may start from the top-right (or bottom-left) corner, then proceed to the next row or previous column depending on the relationship between the matrix element and the target until either it is found or all rows and columns are exhausted. The key here is that we can get rid of a whole row or column due to the two properties of the matrix specified above.
//
// If you have finished leetcode problem "240. Search a 2D Matrix II", you will find that this is exactly the same problem, except now of the two indices, the first has to be smaller than the second. Time complexity for "leetcode 240" is O(m + n), while for this problem we have m = n, plus the indices constraint so the time complexity will be O(n). Also we do not need the HashMap now so space complexity will be O(1).

