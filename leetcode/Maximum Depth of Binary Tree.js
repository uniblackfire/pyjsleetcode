// Given a binary tree, find its maximum depth.
//
// The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
//


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
var maxDepth = function(root) {
    if (!root) return 0;

    function recursive(root, depth) {
        if (!root.left && !root.right) {
            return depth;
        }
        let result_left = 0,
            result_right = 0;
        if (root.left) {
            result_left = recursive(root.left, depth + 1);
        }
        if (root.right) {
            result_right = recursive(root.right, depth + 1);
        }
        return Math.max(result_left, result_right);
    }

    return recursive(root, 1);
};


var maxDepth_BFS = function(root) {
    if (!root) {
        return 0;
    }
    let queue = [];
    queue.push(root);
    let count = 0;
    while (queue.length) {
        let size = queue.length;
        while (size-- > 0) {
            let node = queue.shift();
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        count++;
    }
    return count;
};

var maxDepth_DFS = function(root) {
    if(!root) {
        return 0;
    }

    let stack = [];
    let value = [];
    stack.push(root);
    value.push(1);
    let max = 0;
    while(stack.length) {
        let node = stack.pop();
        let temp = value.pop();
        max = Math.max(temp, max);
        if(node.left) {
            stack.push(node.left);
            value.push(temp+1);
        }
        if(node.right) {
            stack.push(node.right);
            value.push(temp+1);
        }
    }
    return max;
};
