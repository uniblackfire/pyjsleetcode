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
    // let result = [];
    // nums.sort((x, y) => x - y);
    // for (let i = 1; i < nums.length; i++) {
    //     if (nums[i - 1] === nums[i]) {
    //         result.push(nums[i]);
    //     }
    // }
    // return result;
    let result = [];
    let len = nums.length;
    for (let i = 0; i < len; i++) {
        let idx = nums[i] % len;
        if (nums[idx] > len) {
            result.push(nums[idx]%len);
        } else {
            nums[idx] += len;
        }
    }
    return result;
};
console.log(findDuplicates([2, 2]));
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
//
//
//
//
//
// Hi there! I couldn't find absolutely the same idea as mine in the discussions, therefore decided to share it. Basic idea is to put each element to the corresponding position, so that a[0] = 1, a[1] = 2, a[2] = 3 ... etc. (1<=a[i]<=n).
// For understanding, find below the code with comments. I think it is not hard to read and understand.
//
// public class Solution {
//     public List<Integer> findDuplicates(int[] nums) {
//         List<Integer> res=  new ArrayList<>();
//         if(nums == null || nums.length == 0) return res;
//         int i = 0;
//         int n = nums.length;
//         while(i<n){ //traverse the array  till the end
//             if(nums[i] == i+1){  // if number stays at it's supposed position, just continue
//                 i++;
//                 continue;
//             }
//             int num = nums[i];
//             if(num == -1){ // if the duplicate number in that position is already found continue
//                 i++;
//                 continue;
//             }
//             if(nums[num-1] == num){ // if current  num is equals to the number at supposed position,
//                 res.add(num);       // then it is duplicate.
//                 nums[i] = -1;       // mark this position, in order to denote that duplicate has found
//                 i++;
//                 continue;
//             }
//             swap(nums, i, num-1);  // if current numbers supposed position is occupied by another number swap and consider that number
//         }
//         return res;
//     }
//
//     public void swap(int nums[], int i ,int j){
//         int tmp = nums[i];
//         nums[i] = nums[j];
//         nums[j] = tmp;
//     }
// }
