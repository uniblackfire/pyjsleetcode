'use strict'
// Given a non-empty binary tree, return the average value of the nodes on each level in the form of an array.
//
//     Example 1:
// Input:
//     3
//     / \
// 9  20
// /  \
// 15   7
// Output: [3, 14.5, 11]
// Explanation:
//     The average value of nodes on level 0 is 3,  on level 1 is 14.5, and on level 2 is 11. Hence return [3, 14.5, 11].
//     Note:
// The range of node's value is in the range of 32-bit signed integer.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// BFS
var averageOfLevels = function (root) {
    if (!root) {
        return null;
    }
    let result_arr = [];
    let queue = [root];
    while (queue.length > 0) {
        let len = queue.length;
        let sum = 0;
        for (let i = 0; i < len; i++) {
            let node = queue.shift();
            sum += node.val;
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result_arr.push(sum / len);
    }
    return result_arr;
    // let sumArr = [];
    // let countArr = [];
    // let sum = function (node, level) {
    //     if (!node) {
    //         return;
    //     }
    //
    //     if (!sumArr[level]) {
    //         sumArr[level] = 0;
    //     }
    //     sumArr[level] += node.val;
    //     if (!countArr[level]) {
    //         countArr[level] = 0;
    //     }
    //     countArr[level]++;
    //     sum(node.left, level + 1);
    //     sum(node.right, level + 1);
    // };
    // sum(root, 0);
    // let meanArr = sumArr.map((sum, level) => sum / countArr[level]);
    // return meanArr;
};

console.log(averageOfLevels(new TreeNode(3)));
