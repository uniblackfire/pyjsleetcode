// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/


// Given preorder and inorder traversal of a tree, construct the binary tree.
//
// Note:
// You may assume that duplicates do not exist in the tree.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    // Our aim is to find out the index of right child for current node in the preorder array
// We know the index of current node in the preorder array - preStart (or whatever your call it), it's the root of a subtree
// Remember pre order traversal always visit all the node on left branch before going to the right ( root -> left -> ... -> right), therefore, we can get the immediate right child index by skipping all the node on the left branches/subtrees of current node
// The inorder array has this information exactly. Remember when we found the root in "inorder" array we immediately know how many nodes are on the left subtree and how many are on the right subtree
// Therefore the immediate right child index is preStart + numsOnLeft + 1 (remember in preorder traversal array root is always ahead of children nodes but you don't know which one is the left child which one is the right, and this is why we need inorder array)
// numsOnLeft = root - inStart.

    function recursion(preorder, preStart, preEnd, inorder, inStart, inEnd, inMap) {
        if (preStart > preEnd || inStart > inEnd) return null;

        let root = new TreeNode(preorder[preStart]);
        let inRootIdx = inMap.get(root.val);
        let leftSubtreeLen = inRootIdx - inStart;

        root.left = recursion(preorder, preStart + 1, preStart + leftSubtreeLen, inorder, inStart, inRootIdx - 1, inMap);
        root.right = recursion(preorder, preStart + leftSubtreeLen + 1, preEnd, inorder, inRootIdx + 1, inEnd, inMap);

        return root;
    }

    let inMap = new Map();

    for (let i = 0; i < inorder.length; i++) {
        inMap.set(inorder[i], i);
    }

    let root = recursion(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1, inMap);
    return root;
};

var buildTree = function (preorder, inorder) {
//     Here I provide my understanding on how the iterative solution work.
//
// Let's first observe the sequence of inorder traversal.
// 1) ####$---##$---0+++
// 2) 0: The root node of a tree
// 3) #: the left child or grandchildren of root node 0, without right child
// 4) $: the left child or grandchildren of root node 0, with a right child or subtree.
// 5) --- : represent right subtree of node $
// 6) +++: represent right subtree of root node.
//
// Let's observe the sequence of preorder traveral
// 1) 0$##$###------+++
// 2) The symbols are the same.
//
// Maintain two pointers: ptrin, ptrpre
// 1) ptrpre: always points to the next node that is about to be created.
// 2) ptrin: when we keep pushing into stack, ptrin always points to the deepest left child of a subtree. When we keeping popping out nodes, ptrin points to nodes that has no right child, until it points to the root of the right subtree of a node that is just popped out from the stack.
//
// Maintain a stack
// 1) Similar with the stack in inorder traversal, it always stores the chain of left children in a subtree.
// 2) When pushing stack, we are traversing the chain of left children in a subtree, and we keeping creating new node and make it as the left child of the node at stack top.
// 3) When poping stack, we always pop out a node that has no right child, until we find a node that has right child (subtree).
//
// Maintain a temp pointer, that always points to a node popped from stack, the last node that is popped out from the stack has right child (subtree). So the newly created node will be the right child of temp.
//
// Procedures of my algorithm:
// 1) Create the root node of the entire tree, record the root node for the purpose of return. Push the root node into the stack.
// 2) While we has remaining node to create
//
// (a) When we enter a new iteration, ptrin always points to the deepest left grandchild of a tree. So as long as we have not reached it, we can safely keep creating new left child (grandchild) for top node at stack. This actually creating the chain of left children for a tree, namely ###$#$0. The newly-created node will be pushed in the stack. So, next created node will be its left child.
//
// (b) Now, after the previous step, we have reached the deepest left child of a tree. Remember inorder traveral, now we need to retreat from the deepest left child until we find the first node that has a right child or subtree. We use a temp pointer to record the node that has right child, than we create the right child for it. This is achievable, because ptrpre always points to the next node that will be created. In other word, now, the node pointed by ptrpre is the right child. This invariant is ensured by the characteristics of preorder traversal. Remember the symbol presentation: 0$##$###------+++. After we create the left children chain: 0$##$###, now the ptrpre points to the first -, which is the right child of the first node with right child (the second $).
// (c) Repeat step (a) and step (c) until we create all nodes.

    if (!preorder.length) return null;
    let stack = [];
    let root = new TreeNode(preorder[0]), cur = root;
    for (let i = 1, j = 0; i < preorder.length; i++) {
        if (cur.val !== inorder[j]) {
            cur.left = new TreeNode(preorder[i]);
            stack.push(cur);
            cur = cur.left;
        } else {
            j++;
            while (stack.length && stack[stack.length - 1].val === inorder[j]) {
                cur = stack.pop();
                j++;
            }
            cur = cur.right = new TreeNode(preorder[i]);
        }
    }
    return root;
};
