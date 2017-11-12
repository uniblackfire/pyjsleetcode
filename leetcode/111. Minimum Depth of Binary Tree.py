#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def minDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if not root:
            return 0
        
        queue = [root]
        depth = 0
        
        while len(queue) > 0:
            depth += 1
            queue_len = len(queue)
            i = 0
            while i < queue_len:
                node = queue.pop(0)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
                
                if not node.left and not node.right:
                    return depth
                
                i += 1
    
    def minDepth2(self, root):
        if not root:
            return 0
        left = self.minDepth(root.left)
        right = self.minDepth(root.right)
        return 1 + (min(left, right) or max(left, right))
