# Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.
#
#
# Above is a histogram where width of each bar is 1, given height = [2,1,5,6,2,3].
#
#
# The largest rectangle is shown in the shaded area, which has area = 10 unit.
#
# For example,
# Given heights = [2,1,5,6,2,3],
# return 10.

class Solution(object):
    def largestRectangleArea(self, heights):
        """
        :type heights: List[int]
        :rtype: int
        """
        stack, result, heights = [], 0, [0] + heights + [
            0]  # add the first 0 to let stack[-1] be always avaliable, add the last 0 to calculate when meeting the end
        for i, height in enumerate(heights):
            # stack: last in first out
            if len(stack) > 0:
                while height < heights[stack[-1]]:
                    top = stack.pop()
                    width = i - stack[-1] - 1
                    area = heights[top] * width
                    result = max(result, area)
                    # The stack have such feature: all items between stack[-1] and i (both not including) are heighter than stack[top]. If items after "top" are lower than heights[top], heights[top] will be poped; the items between stack[-1] (not including) and top are obviously taller than heights[top] (because heights[stack[-1]] is the heightest between all items lower than heights[top], so all items between stack[-1] and i (both not including) are heighter than stack[top]
            stack.append(i)
        return result

        # height.append(0)
        # stack = [-1]
        # ans = 0
        # for i in range(len(height)):
        #     while height[i] < height[stack[-1]]:
        #         h = height[stack.pop()]
        #         w = i - stack[-1] - 1
        #         ans = max(ans, h * w)
        #     stack.append(i)
        # height.pop()
        # return ans


print(Solution().largestRectangleArea([2, 1, 5, 6, 2, 3]))
