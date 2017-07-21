# Determine whether an integer is a palindrome. Do this without extra space.
#
# click to show spoilers.
#
# Some hints:
# Could negative integers be palindromes? (ie, -1)
#
# If you are thinking of converting the integer to string, note the restriction of using extra space.
#
# You could also try reversing an integer. However, if you have solved the problem "Reverse Integer", you know that the reversed integer might overflow. How would you handle such case?
#
# There is a more generic way of solving this problem.


class Solution(object):
    def isPalindrome(self, x):
        """
        :type x: int
        :rtype: bool
        """
        length = len(str(x))

        first_val = 1
        for i in range(length - 1):
            first_val *= 10

        last_x = x

        for i in range(length // 2):
            higher_digit = last_x // first_val
            lower_digit = last_x - last_x // 10 * 10

            if higher_digit == lower_digit:
                last_x = (last_x - higher_digit * first_val) // 10
                first_val //= 100
            else:
                return False

        return True


import time

x = time.time()
res = Solution().isPalindrome(124535421)
print(res)
y = time.time()
print(y - x)
