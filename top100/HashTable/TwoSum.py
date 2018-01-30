#!/usr/bin/env python
# -*- coding: utf-8 -*-

# https://leetcode.com/problems/two-sum/description/


class Solution:
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        target_dict = dict()
        for idx, item in enumerate(nums):
            complement = target - item
            if complement in target_dict:
                return [idx, target_dict[complement]]
                    
            target_dict[item] = idx


print(Solution().twoSum([3, 2, 4], 6))
