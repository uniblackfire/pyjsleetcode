#!/usr/bin/env node

'use strict';

//https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/

// Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).
//
// For example:
//     Given binary tree [3,9,20,null,null,15,7],
// 3
// / \
// 9  20
// /  \
// 15   7
// return its bottom-up level order traversal as:
// [
//     [15,7],
//     [9,20],
//     [3]
// ]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
    let wrapList = [];
    levelMaker(wrapList, root, 0);
    return wrapList;

    function levelMaker(list, root, level) {
        if (!root) return;
        if (level >= list.length) {
            list.unshift([]);
        }
        levelMaker(list, root.left, level + 1);
        levelMaker(list, root.right, level + 1);
        list[list.length - level - 1].push(root.val);
    }
};

// BFS
var levelOrderBottom2 = function (root) {
    let res = [];
    if (!root) {
        return res;
    }
    let queue = [];
    queue.push(root);
    while (queue.length) {
        let levelList = [];
        let queueLen = queue.length;
        for (let i = 0; i < queueLen; ++i) {
            const cur = queue.shift();
            levelList.push(cur.val);
            if (cur.left)
                queue.push(cur.left);
            if (cur.right)
                queue.push(cur.right);
        }
        //do not use insert() here,it cost too much time.
        //use reverse() insteadly
        res.push(levelList);
    }
    return res.reverse();
};
