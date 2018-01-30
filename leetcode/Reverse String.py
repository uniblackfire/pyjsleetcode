#!/usr/bin/env python
# -*- coding: utf-8 -*-

# https://leetcode.com/problems/reverse-string/

class Solution:
    def reverseString(self, s):
        """
        :type s: str
        :rtype: str
        """
        return s[-1::-1]
