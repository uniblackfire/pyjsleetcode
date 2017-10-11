# Given an integer, convert it to a roman numeral.

# Input is guaranteed to be within the range from 1 to 3999.

class Solution(object):
    def intToRoman(self, num):
        values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
        numerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
        res = ""
        for i, v in enumerate(values):
            print(num // v,  numerals[i])
            res += (num // v) * numerals[i]
            num %= v
        return res


import time

x = time.time()
for i in range(1, 10):
    print(i, Solution().intToRoman(i))

y = time.time()
print(y - x)
