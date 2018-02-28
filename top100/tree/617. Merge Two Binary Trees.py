#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not.
#
# You need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.
#
# Example 1:
# Input:
# 	Tree 1                     Tree 2
#           1                         2
#          / \                       / \
#         3   2                     1   3
#        /                           \   \
#       5                             4   7
# Output:
# Merged tree:
# 	     3
# 	    / \
# 	   4   5
# 	  / \   \
# 	 5   4   7
# Note: The merging process must start from the root nodes of both trees.

import collections

class Solution:
    def mergeTrees(self, t1, t2):
        """
        :type t1: TreeNode
        :type t2: TreeNode
        :rtype: TreeNode
        """
        if not t1 and not t2:
            return None
        val = (t1.val if t1 else 0) + (t2.val if t2 else 0)
        new_node = TreeNode(val)
        new_node.left = self.mergeTrees(t1.left if t1 else None, t2.left if t2 else None)
        new_node.right = self.mergeTrees(t1.right if t1 else None, t2.right if t2 else None)
        return new_node
    
    def mergeTrees2(self, t1, t2):
        if not (t1 and t2):
            return t1 or t2
        queue1, queue2 = collections.deque([t1]), collections.deque([t2])
        while queue1 and queue2:
            node1, node2 = queue1.popleft(), queue2.popleft()
            if node1 and node2:
                node1.val = node1.val + node2.val
                # add node
                if (not node1.left) and node2.left:
                    node1.left = TreeNode(0)
                if (not node1.right) and node2.right:
                    node1.right = TreeNode(0)

                queue1.append(node1.left)
                queue1.append(node1.right)
                queue2.append(node2.left)
                queue2.append(node2.right)
        return t1
