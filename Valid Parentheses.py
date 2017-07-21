# Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

# The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.
class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        stack = list()
        stack.append(s[0])
        for i in range(1, len(s)):
            if s[i] in ["[", "(", "{"]:
                stack.append(s[i])
            else:
                if len(stack) != 0:  # stack not none
                    p = stack.pop()
                else:
                    stack.append(s[i])

                if p + s[i] not in ["()", "[]", "{}"]:
                    return False
        if len(stack) == 0:
            return True
        else:
            return False


import time

x = time.time()
res = Solution().isValid('([]){}')
print(res)
y = time.time()
print(y - x)
