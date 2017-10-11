# Given two binary strings, return their sum (also a binary string).
#
# For example,
# a = "11"
# b = "1"
# Return "100".
#
# Subscribe to see which companies asked this question


class Solution(object):
    def findDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        sorted_nums = sorted(nums)
        for index in range(1, len(sorted_nums)):
            if sorted_nums[index] == sorted_nums[index - 1]:
                return sorted_nums[index]


print(Solution().findDuplicate('11', '1'))
