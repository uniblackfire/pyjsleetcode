// Given a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.
//
// Example:
//
// Input: The root of a Binary Search Tree like this:
//               5
//             /   \
//            2     13
//
// Output: The root of a Greater Tree like this:
//              18
//             /   \
//           20     13

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

var traversalUtil = require('./BinaryTraversal');
var TreeNode = traversalUtil.TreeNode;
// Recursive, Iterative, and Morris Traversal
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root) {
    let sum = 0;

    function recursion(current_node) {
        if (!current_node) return null;
        recursion(current_node.right);

        current_node.val += sum;
        sum = current_node.val;

        recursion(current_node.left);
        return current_node;
    }

    return recursion(root);
};

var convertBST2 = function (root) {
    if (!root) return null;
    let sum = 0;
    let stack = [];
    let current_node = root;
    while (stack.length || current_node) {
        while (current_node) {
            stack.push(current_node);
            current_node = current_node.right;
        }
        current_node = stack.pop();

        current_node.val += sum;
        sum = current_node.val;
        current_node = current_node.left;
    }
    return root;
};

var convertBST3 = function (root) {
    let current_node = root;
    let sum = 0;
    while (current_node) {
        if (!current_node.right) {
            current_node.val += sum;
            sum = current_node.val;

            current_node = current_node.left;
        } else {
            let prev = current_node.right;
            while (prev.left && prev.left !== current_node) {
                prev = prev.left;
            }
            if (!prev.left) {
                prev.left = current_node;
                current_node = current_node.right;
            } else {
                prev.left = null;

                current_node.val += sum;
                sum = current_node.val;

                current_node = current_node.left;
            }
        }
    }
    return root;
};


let root = new TreeNode(5);
let left = new TreeNode(2);
let right = new TreeNode(13);
root.left = left;
root.right = right;
convertBST3(root);
traversalUtil.binaryTreeBFSTraversal(root);
