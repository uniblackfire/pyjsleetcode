# Evaluate the value of an arithmetic expression in Reverse Polish Notation.
#
# Valid operators are +, -, *, /. Each operand may be an integer or another expression.
#
# Some examples:
#   ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
#   ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6


class Solution(object):
    @staticmethod
    def convert_str_to_opr(input_str):
        if input_str == '+':
            return lambda a, b: a + b
        elif input_str == '-':
            return lambda a, b: b - a
        elif input_str == '*':
            return lambda a, b: a * b
        elif input_str == '/':
            return lambda a, b: int(float(b) / a)

    def evalRPN(self, tokens):
        """
        :type tokens: List[str]
        :rtype: int
        """
        stack = list()
        for item in tokens:
            if item in ('+', '-', '*', '/'):
                ret_func = Solution.convert_str_to_opr(item)
                new_var = ret_func(stack.pop(), stack.pop())
                stack.append(new_var)
            else:
                stack.append(int(item))
        return stack[0]


import time

x = time.time()
res = Solution().evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
print(res)
y = time.time()
print(y - x)
