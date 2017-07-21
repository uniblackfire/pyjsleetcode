# Given a positive integer, return its corresponding column title as appear in an Excel sheet.

# For example:
#
#     1 -> A
#     2 -> B
#     3 -> C
#     ...
#     26 -> Z
#     27 -> AA
#     28 -> AB

class Solution(object):
    def convertToTitle(self, n):
        result = ''
        while n > 0:
            n -= 1
            result = chr(n % 26 + ord('A')) + result
            n //= 26
        return result


import time

x = time.time()
print(Solution().convertToTitle(45))

y = time.time()
print(y - x)
