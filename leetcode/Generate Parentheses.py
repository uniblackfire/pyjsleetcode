# Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

# For example, given n = 3, a solution set is:
#
# "((()))", "(()())", "(())()", "()(())", "()()()"

############
# https://leetcode.com/discuss/43122/4-7-lines-python
# https://leetcode.com/discuss/40707/simple-python-dfs-solution-with-explanation
############


class Solution(object):
    def generateParenthesis(self, n):
        def generate(p, left, right):
            if 0 <= left <= right:
                if not right:
                    yield p
                # for q in generate(p + '(', left-1, right): yield q
                # for q in generate(p + ')', left, right-1): yield q
                yield from generate(p + '(', left - 1, right)
                yield from generate(p + ')', left, right - 1)

        return list(generate('', n, n))


import time

x = time.time()
print(Solution().generateParenthesis(3))

y = time.time()
print(y - x)



# p is the parenthesis-string built so far, left and right tell the number of left and right parentheses still to add, and parens collects the parentheses.
#
# Solution 1
#
# I used a few "tricks"... how many can you find? :-)
#
# def generateParenthesis(self, n):
#     def generate(p, left, right, parens=[]):
#         if left:         generate(p + '(', left-1, right)
#         if right > left: generate(p + ')', left, right-1)
#         if not right:    parens += p,
#         return parens
#     return generate('', n, n)
# Solution 2
#
# Here I wrote an actual Python generator. I allow myself to put the yield q at the end of the line because it's not that bad and because in "real life" I use Python 3 where I just say yield from generate(...).
#
# def generateParenthesis(self, n):
#     def generate(p, left, right):
#         if right >= left >= 0:
#             if not right:
#                 yield p
#             for q in generate(p + '(', left-1, right): yield q
#             for q in generate(p + ')', left, right-1): yield q
#     return list(generate('', n, n))
# Solution 3
#
# Improved version of this. Parameter open tells the number of "already opened" parentheses, and I continue the recursion as long as I still have to open parentheses (n > 0) and I haven't made a mistake yet (open >= 0).
#
# def generateParenthesis(self, n, open=0):
#     if n > 0 <= open:
#         return ['(' + p for p in self.generateParenthesis(n-1, open+1)] + \
#                [')' + p for p in self.generateParenthesis(n, open-1)]
#     return [')' * open] * (not n)
