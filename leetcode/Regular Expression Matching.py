# Implement regular expression matching with support for '.' and '*'.

# '.' Matches any single character.
# '*' Matches zero or more of the preceding element.
#
# The matching should cover the entire input string (not partial).
#
# The function prototype should be:
# bool isMatch(const char *s, const char *p)
#
# Some examples:
# isMatch("aa","a") → false
# isMatch("aa","aa") → true
# isMatch("aaa","aa") → false
# isMatch("aa", "a*") → true
# isMatch("aa", ".*") → true
# isMatch("ab", ".*") → true
# isMatch("aab", "c*a*b") → true

class Solution(object):
    def isMatch(self, s, p):
        """
        :type s: str
        :type p: str
        :rtype: bool
        """
        if not p and s:
            return False
        if not p and not s:
            return True
        indices = set([-1])
        np = len(p)
        for i in range(np - 1):
            if p[i + 1] != '*':
                if p[i] == '.':
                    indices = set((j + 1 for j in indices))
                elif p[i] != '*':
                    indices = set((j + 1 for j in indices if j + 1 < len(s) and s[j + 1] == p[i]))
            else:
                if not indices:
                    return False
                elif p[i] == '.':
                    indices = set(range(min(indices), len(s)))
                else:
                    temp = set()
                    for j in indices:
                        temp.add(j)
                        j += 1
                        while j < len(s) and s[j] == p[i]:
                            temp.add(j)
                            j += 1
                    indices = temp
        if not indices:
            return False
        elif p[np - 1] == '.' and len(s) - 2 in indices:
            return True
        elif p[np - 1] == '*' and len(s) - 1 in indices:
            return True
        elif p[np - 1] != '.' and p[np - 1] != '*' and len(s) - 2 in indices and s[-1] == p[np - 1]:
            return True
        else:
            return False


import time

x = time.time()
res = Solution().isMatch("aab", "c*a*b")
print(res)
y = time.time()
print(y - x)





# class Solution:
#     # @param {string} s
#     # @param {string} p
#     # @return {boolean}
#     def isMatch(self, s, p):
#
#         self.dict = {}
#         return self.match(s, p, 0, 0, "")
#
#     def match(self, s,p,i,j, prev):
#         # return true if the s[:i+1] matches to p[:j+1]
#         if (i,j,p) not in self.dict:
#             if i == len(s):
#                 if j == len(p):
#                     self.dict[(i,j,p)] = True # matches to the both end
#                 else: # if the last char is not "*", return False; else judge if the rest part of p equals to "", which is  @" == "p_rest_part + @"
#                     self.dict[(i,j,p)] = False if p[len(p)-1] != "*" else self.match("@", p+"@", 0, j, prev)
#             elif j > len(p)-1:  # if p runs out first, false
#                 self.dict[(i,j,p)] = False
#             else:
#                 if s[i] == p[j] or p[j] == ".": # plain case
#                     self.dict[(i,j,p)] = self.match(s,p,i+1, j+1, p[j]) # accept current match and continue to match next digit
#                 elif p[j] == "*":
#                     # ignore only this "*" and prev does not change
#                     self.dict[(i,j,p)] = self.match(s,p,i,j+1,prev)
#                     if s[i] == prev or prev == ".":
#                         #  regard this * as repeating prev chars
#                         self.dict[(i,j,p)] = self.dict[(i,j,p)] or self.match(s,p,i+1, j, prev)
#                 else:
#                     self.dict[(i,j,p)] = False # default as False
#                 # if p[j+1] == "*", then can ignore current letter
#                 if j+2 <=len(p)-1 and p[j+1] == "*": # ignore current p[j] and try to match from p[j+2]
#                     self.dict[(i,j,p)] = self.match(s,p,i,j+2, p[j]) or self.dict[(i,j,p)]
#
#         return self.dict[(i,j,p)]