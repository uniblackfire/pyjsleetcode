# Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

# Note:
# Elements in a triplet (a,b,c) must be in non-descending order. (ie, a ≤ b ≤ c)
# The solution set must not contain duplicate triplets.
#     For example, given array S = {-1 0 1 2 -1 -4},
#
#     A solution set is:
#     (-1, 0, 1)
#     (-1, -1, 2)

class Solution(object):
    def twoSum(self, nums, target):
        low = 0
        high = len(nums) - 1
        return_list = list()
        while low < high:
            current_sum = nums[low] + nums[high]
            if current_sum == target:
                return_list.append([-target, nums[low], nums[high]])
                low += 1
                high -= 1
                while low < high and nums[low - 1] == nums[low]:
                    low += 1
                while low < high and nums[high + 1] == nums[high]:
                    high -= 1
            elif current_sum > target:
                high -= 1
            else:
                low += 1

        return return_list

    def threeSum(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        result_list = list()
        nums.sort()
        for index, val in enumerate(nums):
            if (index > 0) and (nums[index - 1] == val):
                continue
            result = self.twoSum(nums[index + 1:], -val)
            if len(result) >= 1:
                for a_list in result:
                    result_list.append(a_list)

        return [result_list[i] for i in range(len(result_list)) if i == 0 or result_list[i] != result_list[i - 1]]


import time

x = time.time()
print(Solution().threeSum([-3, 1, -5, -1, 0, -1, 3, -4, 1, 2, -1, -1, -4, -4]))

y = time.time()
print(y - x)
