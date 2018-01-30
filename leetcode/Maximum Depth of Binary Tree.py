#!/usr/bin/env python
# -*- coding: utf-8 -*-

# LC104
# https://leetcode.com/problems/maximum-depth-of-binary-tree/description/


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def maxDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if not root:
            return 0
        
        def recursive(root, depth):
            if not root.left and not root.right:
                return depth
            
            result_left = 0
            result_right = 0
            
            if root.left:
                result_left = recursive(root.left, depth + 1)
            if root.right:
                result_right = recursive(root.right, depth + 1)
            return max(result_left, result_right)
        
        return recursive(root, 1)
    
    def maxDepth2(self, root):
        if not root:
            return 0
        
        queue = [root]
        count = 0
        while len(queue) > 0:
            size = len(queue)
            while size > 0:
                size -= 1
                node = queue.pop(0)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            count += 1
        
        return count
    
    def maxDepth3(self, root):
        if not root:
            return 0
        
        stack = [root]
        value = [1]
        
        max_val = 0
        
        while len(stack):
            node = stack.pop()
            temp = value.pop()
            
            max_val = max(temp, max_val)
            
            if node.left:
                stack.append(node.left)
                value.append(temp + 1)
            
            if node.right:
                stack.append(node.right)
                value.append(temp + 1)
        
        return max_val
