# Given an array and a value, remove all instances of that value in place and return the new length.

# The order of elements can be changed. It doesn't matter what you leave beyond the new length.
class Solution:
    def removeElement(self, nums, val):
        ptr = -1
        for i in range(len(nums)):
            if nums[i] != val:
                ptr += 1
                nums[ptr] = nums[i]
        return ptr + 1


import time

x = time.time()
res = Solution().removeElement([4, 5], 4)
print(res)
y = time.time()
print(y - x)
