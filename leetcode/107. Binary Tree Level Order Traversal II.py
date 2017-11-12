#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).
#
# For example:
# Given binary tree [3,9,20,null,null,15,7],
#     3
#    / \
#   9  20
#     /  \
#    15   7
# return its bottom-up level order traversal as:
# [
#   [15,7],
#   [9,20],
#   [3]
# ]

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def levelOrderBottom(self, root):
        """
        :type root: TreeNode
        :rtype: List[List[int]]
        """
        
        def level_maker(list, root, level):
            if not root:
                return
            if level >= len(list):
                list.insert(0, [])
            level_maker(list, root.left, level + 1)
            level_maker(list, root.right, level + 1)
            list[-level - 1].append(root.val)
        
        wrap_list = []
        level_maker(wrap_list, root, 0)
        
        return wrap_list
    
    def levelOrderBottom2(self, root):
        """
        :type root: TreeNode
        :rtype: List[List[int]]
        """
        result = []
        if not root:
            return result
        
        queue = list()
        queue.append(root)
        while len(queue) > 0:
            level_list = []
            for _ in range(len(queue)):
                cur = queue.pop(0)
                level_list.append(cur.val)
                if cur.left:
                    queue.append(cur.left)
                if cur.right:
                    queue.append(cur.right)
            result.append(level_list)
        
        result.reverse()
        return result
