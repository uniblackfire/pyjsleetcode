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


// Recursive, Iterative, and Morris Traversal
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root) {
    let sum = 0;

    function recursion(root) {
        if (!root) return null;
        recursion(root.right);
        root.val += sum;
        sum = root.val;
        recursion(root.left);
        return root;
    }

    return recursion(root);
};

var convertBST2 = function (root) {
    if (!root) return null;
    let sum = 0;
    let stack = [];
    let cur = root;
    while (stack.length || cur) {
        while (cur) {
            stack.push(cur);
            cur = cur.right;
        }
        cur = stack.pop();
        let tmp = cur.val;
        cur.val += sum;
        sum += tmp;
        cur = cur.left;
    }
    return root;
};

var convertBST3 = function (root) {
    let cur = root;
    let sum = 0;
    while (cur) {
        if (!cur.right) {
            let tmp = cur.val;
            cur.val += sum;
            sum += tmp;
            cur = cur.left;
        } else {
            let prev = cur.right;
            while (prev.left && prev.left !== cur)
                prev = prev.left;
            if (!prev.left) {
                prev.left = cur;
                cur = cur.right;
            } else {
                prev.left = null;
                let tmp = cur.val;
                cur.val += sum;
                sum += tmp;
                cur = cur.left;
            }
        }
    }
    return root;
};
