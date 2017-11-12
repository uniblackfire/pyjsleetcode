#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/

# Given preorder and inorder traversal of a tree, construct the binary tree.
#
# Note:
# You may assume that duplicates do not exist in the tree.

# Definition for a binary tree node.


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def buildTree(self, preorder, inorder):
        """
        :type preorder: List[int]
        :type inorder: List[int]
        :rtype: TreeNode
        """
        if len(preorder) <= 0:
            return None
        
        stack = []
        root = TreeNode(preorder[0])
        cur = root
        j = 0
        for item in preorder[1:]:
            if cur.val != inorder[j]:
                cur.left = TreeNode(item)
                stack.append(cur)
                cur = cur.left
            else:
                j += 1
                while len(stack) > 0 and stack[-1].val == inorder[j]:
                    cur = stack.pop()
                    j += 1
                cur.right = TreeNode(item)
                cur = cur.right
        return root
