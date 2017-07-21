# Write a function to find the longest common prefix string amongst an array of strings.

class Solution(object):
    def longestCommonPrefix(self, strs):
        """
        :type strs: List[str]
        :rtype: str
        """
        if not strs:
            return ""

        min_length = min(map(len, strs))
        common_prefix = list()
        need_exit = False
        for i in range(min_length):
            current_char_list = list(map(lambda s: s[i], strs))
            first_char = current_char_list[0]
            for item in current_char_list[1:]:
                if item != first_char:
                    need_exit = True
                    break
            else:
                common_prefix.append(first_char)
            if need_exit:
                break
        return ''.join(common_prefix)


import time

x = time.time()
res = Solution().longestCommonPrefix(["abceeef", "abeghrhrh"])
print(res)
y = time.time()
print(y - x)
