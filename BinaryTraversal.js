/************DFS************/
/************DFS with recursion************/
var preOrder = function (node) {
    if (node) {
        console.log(node.val);
        preOrder(node.left);
        preOrder(node.right);
    }
};
var inOrder = function (node) {
    if (node) {
        inOrder(node.left);
        console.log(node.val);
        inOrder(node.right);
    }
};
var postOrder = function (node) {
    if (node) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.val);
    }
};
/************DFS with iteration************/
var preOrderByIteration = function (node) {
    if (!node) {
        return null;
    }
    let stack = [];
    stack.push(node);
    while (stack.length !== 0) {
        node = stack.pop();
        console.log(node.val);
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }
};
var inOrderByIteration = function (node) {
    if (!node) {
        return null;
    }
    let stack = [];
    while (stack.length || node) {
        if (node) {
            stack.push(node);
            node = node.left;
        } else {
            node = stack.pop();
            console.log(node.val);
            node = node.right;
        }
    }
};
var posOrderByIteration1 = function (node) {
    if (!node) {
        return null;
    }
    let stack = [];
    stack.push(node);
    let tmp = null;
    while (stack.length !== 0) {
        tmp = stack[stack.length - 1];
        if (tmp.left && node !== tmp.left && node !== tmp.right) {
            stack.push(tmp.left);
        } else if (tmp.right && node !== tmp.right) {
            stack.push(tmp.right);
        } else {
            console.log(stack.pop().val);
            node = tmp;
        }
    }
};
var posOrderByIteration2 = function (node) {
    if (node) {
        let s1 = [];
        let s2 = [];
        s1.push(node);
        while (s1.length !== 0) {
            node = s1.pop();
            s2.push(node);
            if (node.left) {
                s1.push(node.left);
            }
            if (node.right) {
                s1.push(node.right);
            }
        }
        while (s2.length !== 0) {
            console.log(s2.pop().val);
        }
    }
};
/************Morris Traversal************/
var morrisPre = function (head) {
    if (!head) {
        return;
    }
    let cur1 = head,
        cur2 = null;
    while (cur1) {
        cur2 = cur1.left;
        if (cur2) {
            while (cur2.right && cur2.right !== cur1) {
                cur2 = cur2.right;
            }
            if (!cur2.right) {
                cur2.right = cur1;
                console.log(cur1.val);
                cur1 = cur1.left;
                continue;
            } else {
                cur2.right = null;
            }
        } else {
            console.log(cur1.val);
        }
        cur1 = cur1.right;
    }
};

var morrisIn = function (head) {
    if (!head) {
        return;
    }
    let cur1 = head,
        cur2 = null;
    while (cur1) {
        cur2 = cur1.left;
        if (cur2) {
            while (cur2.right && cur2.right !== cur1) {
                cur2 = cur2.right;
            }
            if (!cur2.right) {
                cur2.right = cur1;
                cur1 = cur1.left;
                continue;
            } else {
                cur2.right = null;
            }
        }
        console.log(cur1.val);
        cur1 = cur1.right;
    }
};

var morrisPost = function (head) {
    if (!head) {
        return;
    }
    let cur1 = head,
        cur2 = null;
    while (cur1) {
        cur2 = cur1.left;
        if (cur2) {
            while (cur2.right && cur2.right !== cur1) {
                cur2 = cur2.right;
            }
            if (!cur2.right) {
                cur2.right = cur1;
                cur1 = cur1.left;
                continue;
            } else {
                cur2.right = null;
                printEdge(cur1.left);
            }
        }
        cur1 = cur1.right;
    }
    printEdge(head);
};

var printEdge = function (head) {
    let tail = reverseEdge(head);
    let cur = tail;
    while (cur) {
        console.log(cur.val);
        cur = cur.right;
    }
    reverseEdge(tail);
};

var reverseEdge = function (head) {
    let pre = null,
        next = null;
    while (head) {
        next = head.right;
        head.right = pre;
        pre = head;
        head = next;
    }
    return pre;
};
/************BFS************/
function binaryTreeBFSTraversal(node) {
    if (!node) {
        return null;
    }
    let queue = [];
    queue.push(node);

    while (queue.length) {
        node = queue.shift();
        console.log(node.val);
        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function test() {
    let root = new TreeNode(5);
    let left = new TreeNode(2);
    let right = new TreeNode(13);
    let rightsright = new TreeNode(23);
    let leftsright = new TreeNode(23);
    root.left = left;
    root.right = right;
    left.right = leftsright;
    right.right = rightsright;
    console.log('binaryTreeBFSTraversal');
    binaryTreeBFSTraversal(root);
    console.log('preOrder');
    preOrder(root);
    console.log('inOrder');
    inOrder(root);
    console.log('postOrder');
    postOrder(root);
    console.log('preOrderByIteration');
    preOrderByIteration(root);
    console.log('inOrderByIteration');
    inOrderByIteration(root);
    console.log('posOrderByIteration1');
    posOrderByIteration1(root);
    console.log('posOrderByIteration2');
    posOrderByIteration2(root);
    console.log('morrisPre');
    morrisPre(root);
    console.log('morrisIn');
    morrisIn(root);
    console.log('morrisPost');
    morrisPost(root);
}

module.exports = {
    binaryTreeBFSTraversal: binaryTreeBFSTraversal,
    TreeNode: TreeNode,
    test: test,
};

test();
