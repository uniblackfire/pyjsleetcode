// Find Bottom Left Tree Value
//
// Given a binary tree, find the leftmost value in the last row of the tree.
//
// Example 1:
// Input:
//
//     2
//    / \
//   1   3
//
// Output:
// 1
// Example 2:
// Input:
//
//         1
//        / \
//       2   3
//      /   / \
//     4   5   6
//        /
//       7
//
// Output:
// 7
// Note: You may assume the tree (i.e., the given root node) is not NULL.


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    function recur(root, depth, res) {
        if (res[1] < depth) {
            res[0] = root.val;
            res[1] = depth;
        }
        if (root.left) recur(root.left, depth + 1, res);
        if (root.right) recur(root.right, depth + 1, res);
        return res[0];
    }
    return recur(root, 1, [0, 0]);
};
