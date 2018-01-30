# DFS************/
# DFS with recursion************/


def pre_order(node):
    if node:
        print(node.val)
        pre_order(node.left)
        pre_order(node.right)


def in_order(node):
    if node:
        in_order(node.left)
        print(node.val)
        in_order(node.right)


def post_order(node):
    if node:
        post_order(node.left)
        post_order(node.right)
        print(node.val)


# DFS with iteration************/


def pre_order_iter(node):
    if not node:
        return
    
    stack = [node]
    while len(stack):
        node = stack.pop()
        print(node.val)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)


def in_order_iter(node):
    if not node:
        return
    
    stack = []
    while len(stack) or node:
        if node:
            stack.append(node)
            node = node.left
        else:
            node = stack.pop()
            print(node.val)
            node = node.right


def post_order_iter1(node):
    if not node:
        return
    
    stack = [node]
    while len(stack):
        stack_top = stack[-1]
        if stack_top.left and node != stack_top.left and node != stack_top.right:
            stack.append(stack_top.left)
        elif stack_top.right and node != stack_top.right:
            stack.append(stack_top.right)
        else:
            node = stack.pop()
            print(node.val)


def post_order_iter2(node):
    if node:
        s1 = []
        s2 = [node]
        
        while len(s1):
            node = s1.pop()
            s2.append(node)
            if node.left:
                s1.append(node.left)
            if node.right:
                s1.append(node.right)
        
        while len(s2):
            print(s2.pop().val)


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


def runBT():
    root = TreeNode(5)
    left = TreeNode(2)
    right = TreeNode(13)
    rightsright = TreeNode(23)
    leftsright = TreeNode(1)
    
    root.left = left
    root.right = right
    left.right = leftsright
    right.right = rightsright
    
    pre_order(root)
    print('-' * 20)
    in_order(root)
    print('-' * 20)
    post_order(root)
    print('-' * 20)
    pre_order_iter(root)
    print('-' * 20)
    in_order_iter(root)
    print('-' * 20)
    post_order_iter1(root)
    print('-' * 20)
    post_order_iter2(root)
    print('-' * 20)
    print('-' * 20)
    print('-' * 20)
    print('-' * 20)
    print('-' * 20)


runBT()
