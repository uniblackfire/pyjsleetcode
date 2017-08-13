// https://leetcode.com/problems/path-sum-iii/description/

// You are given a binary tree in which each node contains an integer value.
//
// Find the number of paths that sum to a given value.
//
// The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).
//
// The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.
//
// Example:
//
// root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
//
//       10
//      /  \
//     5   -3
//    / \    \
//   3   2   11
//  / \   \
// 3  -2   1
//
// Return 3. The paths that sum to 8 are:
//
// 1.  5 -> 3
// 2.  5 -> 2 -> 1
// 3. -3 -> 11


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function (root, sum) {
    let preSum = {};
    preSum[0] = 1;

    let currentSum = 0;
    let result = 0;

    let pre = root;
    let stack = [];
    while (stack.length || root) {
        for (; root; root = root.left) {
            currentSum += root.val;
            if (preSum[currentSum - sum]) {
                result += preSum[currentSum - sum];
            }
            preSum[currentSum] = (preSum[currentSum] || 0) + 1;
            stack.push(root);
        }

        if (stack.length) {
            let stackTop = stack[stack.length - 1];
            if (!stackTop.right || stackTop.right === pre) {
                root = stack.pop();
                preSum[currentSum] = (preSum[currentSum] || 0) - 1;
                if (preSum[currentSum] <= 0) {
                    delete preSum[currentSum];
                }
                currentSum -= root.val;
                pre = root;
                root = null;
            } else {
                root = stackTop.right;
            }
        }

    }
    return result;
};

function pathSum2(root, sum) {
    function pathSumFrom(node, sum) {
        if (!node) return 0;
        return (node.val === sum ? 1 : 0)
            + pathSumFrom(node.left, sum - node.val) + pathSumFrom(node.right, sum - node.val);
    }

    if (!root) return 0;
    return pathSumFrom(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
}
