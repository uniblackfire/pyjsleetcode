# Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

# Note: You may not slant the container.

class Solution(object):
    def maxArea(self, height):
        """
        :type height: List[int]
        :rtype: int
        """
        max_area = 0
        left = 0
        right = len(height) - 1
        min_height = 0
        # while left < right:
        #     max_area = max(max_area, (right - left) * min(height[left], height[right]))
        #     if height[left] < height[right]:
        #         left += 1
        #     else:
        #         right -= 1

        while left < right:
            if height[left] <= min_height:
                left += 1
            elif height[right] <= min_height:
                right -= 1
            else:
                if height[left] <= height[right]:
                    min_height = height[left]
                    left += 1
                else:
                    min_height = height[right]
                    right -= 1

                max_area = max(max_area, min_height * (right - left + 1))
        return max_area


import time

x = time.time()

res = Solution().maxArea([17, 84, 58, 48, 40, 91, 54, 35, 97, 17, ])
print(res)
y = time.time()
print(y - x)
