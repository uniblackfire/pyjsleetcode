// https://leetcode.com/problems/minimum-depth-of-binary-tree/description/

// Given a binary tree, find its minimum depth.
//
// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

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
var minDepth = function (root) {
    if (!root) return 0;
    let queue = [];
    queue.push(root);
    let depth = 0;

    while (queue.length) {
        depth++;
        let queueLen = queue.length;
        let i = 0;
        while (i < queueLen) {
            let node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);

            if (!node.left && !node.right) return depth;

            i++;
        }
    }
};

var minDepth2 = function (root) {
    if (!root) return 0;
    let left = minDepth(root.left);
    let right = minDepth(root.right);
    return 1 + (Math.min(left, right) || Math.max(left, right));
};
