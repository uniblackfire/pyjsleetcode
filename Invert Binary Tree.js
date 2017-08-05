// Invert a binary tree.
//
//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// to
//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1
// Trivia:
// This problem was inspired by this original tweet by Max Howell:
// Google: 90% of our engineers use the software you wrote (Homebrew), but you can’t invert a binary tree on a whiteboard so fuck off.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (!root) return null;
    let node = root.right;
    root.right = invertTree(root.left);
    root.left = invertTree(node);

    return root;
};

//BFS
var invertTree2 = function(root) {
    if (!root) {
        return null;
    }

    let stack = [];
    stack.push(root);

    while (stack.length) {
        let node = stack.pop();
        let left = node.left;
        node.left = node.right;
        node.right = left;

        if (node.left) {
            stack.push(node.left);
        }
        if (node.right) {
            stack.push(node.right);
        }
    }
    return root;
};

//DFS
var invertTree3 = function(root) {
    if (!root) {
        return null;
    }

    let queue = [];
    queue.push(root);

    while (queue.length) {
        let node = queue.shift();
        let left = node.left;
        node.left = node.right;
        node.right = left;

        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }
    return root;
};
