// https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/

// Given a Binary Search Tree and a target number, return true if there exist two elements in the BST such that their sum is equal to the given target.
//
// Example 1:
// Input:
//     5
//    / \
//   3   6
//  / \   \
// 2   4   7
//
// Target = 9
//
// Output: True
// Example 2:
// Input:
//     5
//    / \
//   3   6
//  / \   \
// 2   4   7
//
// Target = 28
//
// Output: False


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
    function work(root, k, map) {
        if (!root) return false;
        if (map.hasOwnProperty(root.val)) {
            return true;
        } else {
            map[k - root.val] = root.val;
            return work(root.left, k, map) || work(root.right, k, map);
        }
    }

    if (!root) return false;
    let map = {};
    map[k - root.val] = root.val;
    return work(root.left, k, map) || work(root.right, k, map);
};
