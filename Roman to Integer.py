# Given a roman numeral, convert it to an integer.

# Input is guaranteed to be within the range from 1 to 3999.

class Solution(object):
    def romanToInt(self, s):
        """
        :type s: str
        :rtype: int
        """
        mappedDict = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        mappedS = [mappedDict[x] for x in s]

        ret = sum(mappedS)
        for index in range(len(mappedS) - 1):
            if mappedS[index] < mappedS[index + 1]:
                ret -= 2 * mappedS[index]  # IV=4 VI=6
        return ret


import time

x = time.time()
print(Solution().romanToInt('VI'))

y = time.time()
print(y - x)
