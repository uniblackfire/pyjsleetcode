# Given two binary strings, return their sum (also a binary string).
#
# For example,
# a = "11"
# b = "1"
# Return "100".
#
# Subscribe to see which companies asked this question



class Solution(object):
    def addBinary(self, a, b):
        """
        :type a: str
        :type b: str
        :rtype: str
        """
        num1 = int(a, 2)
        num2 = int(b, 2)
        # print(num1, num2, num1 + num2)
        return bin(num1 + num2)[2:]


print(Solution().addBinary('11', '1'))
