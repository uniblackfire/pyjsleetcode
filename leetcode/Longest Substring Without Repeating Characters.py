# Given a string, find the length of the longest substring without repeating characters. For example, the longest substring without repeating letters for "abcabcbb" is "abc", which the length is 3. For "bbbbb" the longest substring is "b", with the length of 1.
# 【解答】大致思路是用两个指针，快指针用来一直向前探路，慢指针用来标注这个最长子串的起始位置；
# 再引入一个map，key存放字符，value存放字符位置，
# 一旦发现快指针的字符在map中存在，就说明找到了一个疑似最大子串，可以和积累的最大值进行比较。
#
# 第一遍实现的时候执行超时了，原因是在下面代码的map.containsKey(ch)为真的时候，
# 我直接把map清空，再把fast放到newSlow的下一个的位置，这会导致从slow到newSlow这一段重复比较，
# 所以我做了优化——在这种情况下把slow到newSlow的记录从map中清掉即可：

class Solution(object):
    def lengthOfLongestSubstring(self, s):
        slow = 0
        fast = 0
        max_len = 0
        my_dict = dict()
        while fast < len(s):
            ch = s[fast]

            if ch in my_dict:
                max_len = max(max_len, fast - slow)
                new_slow = my_dict[ch] + 1
                for i in range(slow, new_slow):
                    del my_dict[s[i]]
                slow = new_slow
            else:
                my_dict[ch] = fast
                fast += 1
                if fast == slow:
                    continue
        return max(max_len, fast - slow)


import time

x = time.time()
res = Solution().lengthOfLongestSubstring("dvdf")
print(res)
y = time.time()
print(y - x)
