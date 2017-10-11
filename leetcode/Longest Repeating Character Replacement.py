# Given a string that consists of only uppercase English letters, you can replace any letter in the string with another letter at most k times. Find the length of a longest substring containing all repeating letters you can get after performing the above operations.
#
# Note:
# Both the string's length and k will not exceed 104.
#
# Example 1:
#
# Input:
# s = "ABAB", k = 2
#
# Output:
# 4
#
# Explanation:
# Replace the two 'A's with two 'B's or vice versa.
# Example 2:
#
# Input:
# s = "AABABB", k = 1
#
# Output:
# 4
#
# Explanation:
# Replace the one 'A' in the middle with 'B' and form "AABBBBA".
# The substring "BBBB" has the longest repeating letters, which is 4.


class Solution(object):
    def characterReplacement(self, s, k):
        h = {}
        i, j, ans = 0, 0, 0
        while j < len(s):
            h[s[j]] = h.get(s[j], 0) + 1
            while j - i + 1 - max(h.values()) > k:
                h[s[i]] -= 1
                i += 1
            ans = max(ans, j - i + 1)
            j += 1
        return ans


#
# from collections import deque
#
#
# class Solution(object):
#     def characterReplacement(self, s, k):
#
#         if (not s) or len(s) == 0:
#             return 0
#         if k >= len(s):
#             return len(s)
#
#         dic = {}
#         for i in range(len(s)):
#             if s[i] not in dic:
#                 dic[s[i]] = [i]
#             else:
#                 dic[s[i]].append(i)
#
#         for item in dic:
#             if len(dic[item]) == 0:
#                 dic[item] = []
#                 continue
#             interval = []
#             for i in range(1, len(dic[item])):
#                 interval.append(dic[item][i] - dic[item][i - 1] - 1)
#             dic[item] = interval
#
#         def helper(nums, target):
#             window = deque()
#             cursum = 0
#             longest = 0
#             for i in range(len(nums)):
#                 while window and cursum + nums[i] > target:
#                     cursum -= window[0]
#                     window.popleft()
#                 window.append(nums[i])
#                 cursum += nums[i]
#                 longest = max(longest, len(window))
#             return longest
#
#         longest = 0
#         for item in dic:
#             if len(dic[item]) == 0:
#                 longest = max(longest, k + 1)
#                 continue
#             maxcover = helper(dic[item], k)
#             longest = max(longest, maxcover + k + 1)
#
#         return min(longest, len(s))
#

import time

x = time.time()
res = Solution().characterReplacement('AABABB', 2)
print(res)
y = time.time()
print(y - x)
