// // https://leetcode.com/problems/subtree-of-another-tree/description/
//
// Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants. The tree s could also be considered as a subtree of itself.
//
// Example 1:
// Given tree s:
//
//      3
//     / \
//    4   5
//   / \
//  1   2
// Given tree t:
//    4
//   / \
//  1   2
// Return true, because t has the same structure and node values with a subtree of s.
// Example 2:
// Given tree s:
//
//      3
//     / \
//    4   5
//   / \
//  1   2
//     /
//    0
// Given tree t:
//    4
//   / \
//  1   2
// Return false.


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function (s, t) {
    function generatePreOrderString(s) {
        let result = '';
        let stack = [];
        stack.push(s);
        while (stack.length) {
            let stackTop = stack.pop();
            if (!stackTop) // if stackTop is null
                result += ',#'; // Appending # in order to handle same values but not subtree cases
            else
                result += ',' + stackTop.val;
            if (stackTop) {
                stack.push(stackTop.right);
                stack.push(stackTop.left);
            }
        }
        return result.toString();
    }

    let spreorder = generatePreOrderString(s);
    let tpreorder = generatePreOrderString(t);

    return spreorder.indexOf(tpreorder) !== -1;
};
