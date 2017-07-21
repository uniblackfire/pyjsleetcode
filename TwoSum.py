# Given an array of integers, find two numbers such that they add up to a specific target number.
#
# The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.
#
# You may assume that each input would have exactly one solution.
#
# Input: numbers={2, 7, 11, 15}, target=9
# Output: index1=1, index2=2


class Solution(object):
    def twoSum(self, nums, target):
        copyed = sorted(nums)

        low = 0
        high = len(copyed) - 1

        while low < high:
            sum = copyed[low] + copyed[high]
            if sum == target:
                left = nums.index(copyed[low])
                right = nums.index(copyed[high])
                if right == left:
                    right = nums[left + 1:].index(copyed[high]) + left + 1
                left += 1
                right += 1
                if left > right:
                    left = left ^ right
                    right = left ^ right
                    left = left ^ right
                return [left, right]
            elif sum > target:
                high -= 1
            else:
                low += 1

        return [-1, -1]


# class Solution(object):
#     def twoSum(self, nums, target):
#         dic = {}
#         for i in range(len(nums)):
#             sub = target - nums[i]
#             if sub in dic:
#                 return [dic[sub], i + 1]
#             else:
#                 dic[nums[i]] = i + 1
#         return [-1, -1]


import time
# print(time.time())
x = time.time()
res = Solution().twoSum([0, 4, 3, 0], 0)
print(res)
y = time.time()
print(y - x)
