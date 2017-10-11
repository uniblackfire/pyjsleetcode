// 501. Find Mode in Binary Search Tree
// https://leetcode.com/problems/find-mode-in-binary-search-tree/description/
// Given a binary search tree (BST) with duplicates, find all the mode(s) (the most frequently occurred element) in the given BST.
//
// Assume a BST is defined as follows:
//
// The left subtree of a node contains only nodes with keys less than or equal to the node's key.
// The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
// Both the left and right subtrees must also be binary search trees.
// For example:
// Given BST [1,null,2,2],
//    1
//     \
//      2
//     /
//    2
// return [2].
//
// Note: If a tree has more than one mode, you can return them in any order.
//
// Follow up: Could you do that without using any extra space? (Assume that the implicit stack space incurred due to recursion does not count).

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
var findMode = function (root) {
    if (!root) {
        return [];
    }
    let valMap = new Map();
    let queue = [];
    queue.push(root);
    let result = [];
    let maxVal = 0;
    while (queue.length) {
        const node = queue.shift();

        if (!valMap.has(node.val)) {
            valMap.set(node.val, 1);
        } else {
            valMap.set(node.val, valMap.get(node.val) + 1);
        }

        const currentNodeValCount = valMap.get(node.val);

        if (currentNodeValCount > maxVal) {
            maxVal = currentNodeValCount;
            result = [node.val];
        } else if (currentNodeValCount === maxVal) {
            result.push(node.val);
        }

        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }

    // let maxVal = 0;
    // for (const val of valMap.values()) {
    //     if (val > maxVal) {
    //         maxVal = val;
    //     }
    // }
    //
    // let result = [];
    //
    // valMap.forEach((val, key) => {
    //     if (val === maxVal) {
    //         result.push(key);
    //     }
    // });
    return result;
};

var findMode2 = function (root) {
    function handleValue(val) {
        if (val !== currVal) {
            currVal = val;
            currCount = 0;
        }
        currCount++;
        if (currCount > maxCount) {
            maxCount = currCount;
            modeCount = 1;
        } else if (currCount === maxCount) {
            if (modes)
                modes[modeCount] = currVal;
            modeCount++;
        }
    }

    function morrisInOrder() {
        let node = root;
        while (node) {
            if (!node.left) {
                handleValue(node.val);
                node = node.right;
            } else {
                let prev = node.left;
                while (prev.right && prev.right !== node)
                    prev = prev.right;
                if (!prev.right) {
                    prev.right = node;
                    node = node.left;
                } else {
                    prev.right = null;
                    handleValue(node.val);
                    node = node.right;
                }
            }
        }
    }

    function inOrder(root) {
        if (!root) return;
        inOrder(root.left);
        handleValue(root.val);
        inOrder(root.right);
    }

    let currVal;
    let currCount = 0;
    let maxCount = 0;
    let modeCount = 0;

    let modes = [];

    inOrder(root); // morrisInOrder
    modes = [];
    modeCount = 0;
    currCount = 0;
    inOrder(root); // morrisInOrder
    return modes;

};
