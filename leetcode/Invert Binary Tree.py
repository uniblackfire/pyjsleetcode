#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def invertTree(self, root):
        """
        :type root: TreeNode
        :rtype: TreeNode
        """
        if not root:
            return None
        
        node = root.right
        root.right = self.invertTree(root.left)
        root.left = self.invertTree(node)
        
        return root
    
    def invertTree2(self, root):
        if not root:
            return None

        queue = [root]
        
        while len(queue):
            node = queue.pop(0)
            left = node.left
            node.left = node.right
            node.right = left
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
                
        return root

