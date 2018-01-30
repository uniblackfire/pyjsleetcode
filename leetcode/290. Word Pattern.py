#!/usr/bin/env python
# -*- coding: utf-8 -*-

class Solution:
    def wordPattern(self, pattern, str):
        """
        :type pattern: str
        :type str: str
        :rtype: bool
        """
        words = dict()
        str_list = str.split()
        if len(pattern) != len(str_list):
            return False
        
        for s, p in zip(str_list, pattern):
            if p in words:
                if words[p] != s:
                    return False
            else:
                for _, v in words.items():
                    if v == s:
                        return False
                
                words[p] = s
        
        return True
