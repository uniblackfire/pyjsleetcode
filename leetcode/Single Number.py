#!/usr/bin/env python
# -*- coding: utf-8 -*-

class Solution:
    def singleNumber(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        ans = 0
        for item in nums:
            ans ^= item
        
        return ans
