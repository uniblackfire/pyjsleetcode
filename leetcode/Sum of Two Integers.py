#!/usr/bin/env python
# -*- coding: utf-8 -*-

# https://leetcode.com/problems/sum-of-two-integers/description/
class Solution:
    def getSum(self, a, b):
        """
        :type a: int
        :type b: int
        :rtype: int
        """
        if b == 0:
            return a
        
        sum = a ^ b
        carry = (a & b) << 1
        return self.getSum(sum, carry)
