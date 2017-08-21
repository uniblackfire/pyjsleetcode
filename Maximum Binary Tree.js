// https://leetcode.com/problems/maximum-binary-tree/description/
// Given an integer array with no duplicates. A maximum tree building on this array is defined as follow:
//
// The root is the maximum number in the array.
// The left subtree is the maximum tree constructed from left part subarray divided by the maximum number.
// The right subtree is the maximum tree constructed from right part subarray divided by the maximum number.
// Construct the maximum tree by the given array and output the root node of this tree.
//
// Example 1:
// Input: [3,2,1,6,0,5]
// Output: return the tree root node representing the following tree:
//
//       6
//     /   \
//    3     5
//     \    /
//      2  0
//        \
//         1
// Note:
// The size of the given array will be in the range [1,1000].

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
    function build(nums, start, end) {
        if (start > end) return null;

        let idxMax = start;
        for (let i = start + 1; i <= end; i++) {
            if (nums[i] > nums[idxMax]) {
                idxMax = i;
            }
        }

        let root = new TreeNode(nums[idxMax]);

        root.left = build(nums, start, idxMax - 1);
        root.right = build(nums, idxMax + 1, end);

        return root;
    }

    if (!nums) return null;
    return build(nums, 0, nums.length - 1);
};

var constructMaximumBinaryTree2 = function (nums) {
    if (!nums.length) return null;
    let maxVal = Math.max(...nums);
    let rootIndex = nums.indexOf(maxVal);
    let root = new TreeNode(maxVal);
    root.left = constructMaximumBinaryTree(nums.slice(0, rootIndex));
    root.right = constructMaximumBinaryTree(nums.slice(rootIndex + 1));
    return root;
};


console.log(constructMaximumBinaryTree2([3,2,1,6,0,5]));
