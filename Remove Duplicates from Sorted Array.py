# Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.
#
# Do not allocate extra space for another array, you must do this in place with constant memory.
#
# For example,
# Given input array nums = [1,1,2],
#
# Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. It doesn't matter what you leave beyond the new length.


class Solution(object):
    def removeDuplicates(self, nums):
        length = 1
        if len(nums) == 0:
            return 0
        last_num = nums[-1]

        for i in range(len(nums) - 2, -1, -1):
            if nums[i] == last_num:
                del nums[i]
            else:
                last_num = nums[i]
                length += 1

        return length


import time

ff = [1, 1, 2]

x = time.time()
res = Solution().removeDuplicates([])
print(res)
y = time.time()
print(y - x)