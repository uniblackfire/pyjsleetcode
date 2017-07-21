# Reverse digits of an integer.
#
# Example1: x = 123, return 321
# Example2: x = -123, return -321
#
# click to show spoilers.
#
# Have you thought about this?
# Here are some good questions to ask before coding. Bonus points for you if you have already thought through this!
#
# If the integer's last digit is 0, what should the output be? ie, cases such as 10, 100.
#
# Did you notice that the reversed integer might overflow? Assume the input is a 32-bit integer, then the reverse of 1000000003 overflows. How should you handle such cases?
#
# For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.
#
# Update (2014-11-10):
# Test cases had been added to test the overflow behavior.

class Solution(object):
    def reverse(self, x):
        x_str = str(x)
        ret_str = []
        if x_str[0] == '-':
            ret_str.append('-')
            x_str = x_str[1:]

        x_str = list(reversed(x_str))
        ok_str = []
        for index, ch in enumerate(x_str):
            # print(index, ch)
            if ch != '0':
                ok_str = x_str[index:]
                break
        if len(ok_str) == 0:
            return 0
        ret_value = int(''.join(ret_str) + ''.join(ok_str))
        if not -2147483647 < ret_value < 2147483647:
            return 0
        else:
            return ret_value


import time

x = time.time()
res = Solution().reverse(12559900)
print(res)
y = time.time()
print(y - x)