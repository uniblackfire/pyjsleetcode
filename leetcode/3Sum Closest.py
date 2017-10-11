# Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

# For example, given array S = {-1 2 1 -4}, and target = 1.
#
# The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).



class Solution(object):
    def threeSumClosest(self, num, target):
        result = 0xFFFFFFFF  # Initially set a impossible large number
        result_sum = 0xFFFFFFFF  # Initially set a impossible large number

        num.sort()

        left = 0  # For the first item
        while left < len(num) - 2:
            mid = left + 1  # For the middle item
            right = len(num) - 1  # For the last item
            while mid < right:
                current_sum = num[left] + num[mid] + num[right]
                if abs(current_sum - target) < abs(result_sum - target):
                    result_sum = current_sum
                if current_sum == target:
                    # Not possible to be closer
                    return current_sum
                elif current_sum < target:
                    # Skip duplicate num[mid-1]
                    mid += 1
                    while mid < right + 1 and num[mid] == num[mid - 1]:
                        mid += 1
                else:
                    # Skip duplicate num[right+1]
                    right -= 1
                    while right > mid - 1 and num[right] == num[right + 1]:
                        right -= 1

            # Skip duplicate num[left-1]
            left += 1
            while left < len(num) - 1 and num[left] == num[left - 1]:
                left += 1

        return result_sum


# class Solution(object):
#     def threeSumClosest(self, nums, target):
#         """
#         :type nums: List[int]
#         :type target: int
#         :rtype: int
#         """
#         nums.sort()
#         ret, left = -2 ** 31, 0
#         while left < len(nums) - 2:
#             mid, right = left + 1, len(nums) - 1
#             while mid < right:
#                 summ = nums[left] + nums[mid] + nums[right]
#                 if abs(summ - target) < abs(ret - target):
#                     ret = summ
#
#                 if summ == target:
#                     return ret
#                 elif summ < target:
#                     mid += 1
#                     while (mid < right) and nums[mid] == nums[mid - 1]:
#                         mid += 1
#                 else:
#                     right -= 1
#                     while (mid < right) and nums[right] == nums[right + 1]:
#                         right -= 1
#
#             while left < len(nums) - 2 and nums[left] == nums[left + 1]:
#                 left += 1
#             left += 1
#         return ret


import time

x = time.time()
print(Solution().threeSumClosest([-3, 1, -5, -1, 0, -1, 3, -4, 1, 2, -1, -1, -4, -4], 7))

y = time.time()
print(y - x)
