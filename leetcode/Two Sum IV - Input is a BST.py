#!/usr/bin/env python
# -*- coding: utf-8 -*-

class Solution:
    def findTarget(self, root, k):
        """
        :type root: TreeNode
        :type k: int
        :rtype: bool
        """
        
        def work(root, k, map):
            if not root:
                return False
            
            if root.val in map:
                return True
            else:
                map[k - root.val] = root.val
                return work(root.left, k, map) or work(root.right, k, map)
        
        if not root:
            return False
        map = dict()
        map[k - root.val] = root.val
        return work(root.left, k, map) or work(root.right, k, map)
