# Given a string S, find the longest palindromic substring in S. You may assume that the maximum length of S is 1000, and there exists one unique longest palindromic substring.

# Manacher's algorithm[edit]
# To find in linear time a longest palindrome in a string, an algorithm may take advantage of the following characteristics or observations about a palindrome and a sub-palindrome:
# The left side of a palindrome is a mirror image of its right side.
# (Case 1) A third palindrome whose center is within the right side of a first palindrome will have exactly the same length as that of a second palindrome anchored at the mirror center on the left side, if the second palindrome is within the bounds of the first palindrome by at least one character.
# (Case 2) If the second palindrome meets or extends beyond the left bound of the first palindrome, then the third palindrome is guaranteed to have at least the length from its own center to the right outermost character of the first palindrome. This length is the same from the center of the second palindrome to the left outermost character of the first palindrome.
# To find the length of the third palindrome under Case 2, the next character after the right outermost character of the first palindrome would then be compared with its mirror character about the center of the third palindrome, until there is no match or no more characters to compare.
# (Case 3) Neither the first nor second palindrome provides information to help determine the palindromic length of a fourth palindrome whose center is outside the right side of the first palindrome.
# It is therefore desirable to have a palindrome as a reference (i.e., the role of the first palindrome) that possesses characters furtherest to the right in a string when determining from left to right the palindromic length of a substring in the string (and consequently, the third palindrome in Case 2 and the fourth palindrome in Case 3 could replace the first palindrome to become the new reference).
# Regarding the time complexity of palindromic length determination for each character in a string: there is no character comparison for Case 1, while for Cases 2 and 3 only the characters in the string beyond the right outermost character of the reference palindrome are candidates for comparison (and consequently Case 3 always results in a new reference palindrome while Case 2 does so only if the third palindrome is actually longer than its guaranteed minimum length).
# For even-length palindromes, the center is at the boundary of the two characters in the middle.
#
# Implementation[edit]
# Let:
# s be a string of N characters
# s2 be a derived string of s, comprising N * 2 + 1 elements, with each element corresponding to one of the following: the N characters in s, the N-1 boundaries among characters, and the boundaries before and after the first and last character respectively
# A boundary in s2 is equal to any other boundary in s2 with respect to element matching in palindromic length determination
# p be an array of palindromic span for each element in s2, from center to either outermost element, where each boundary is counted towards the length of a palindrome (e.g. a palindrome that is three elements long has a palindromic span of 1)
# c be the position of the center of the palindrome currently known to include a boundary closest to the right end of s2 (i.e., the length of the palindrome = p[c]*2+1)
# r be the position of the right-most boundary of this palindrome (i.e., r = c + p[c])
# i be the position of an element (i.e., a character or boundary) in s2 whose palindromic span is being determined, with i always to the right of c
# i2 be the mirrored position of i around c (e.g., {i, i2} = {6, 4}, {7, 3}, {8, 2},… when c = 5 (i.e., i2 = c * 2 - i)



class Solution:
    # Manacher algorithm
    # http://en.wikipedia.org/wiki/Longest_palindromic_substring

    def longestPalindrome(self, s):
        # Transform S into T.
        # For example, S = "abba", T = "^#a#b#b#a#$".
        # ^ and $ signs are sentinels appended to each end to avoid bounds checking
        T = '#'.join('^{}$'.format(s))
        n = len(T)
        P = [0] * n
        C = R = 0
        for i in range(1, n - 1):
            P[i] = (R > i) and min(R - i, P[C - (i - C)])  # R-i 和 P[i'] 之间较小的值

            # Attempt to expand palindrome centered at i
            while T[i + 1 + P[i]] == T[i - 1 - P[i]]:
                P[i] += 1
            # If palindrome centered at i expand past R,
            # adjust center based on expanded palindrome.
            if i + P[i] > R:
                C, R = i, i + P[i]
        print(P)
        # Find the maximum element in P.
        maxLen, centerIndex = max((n, i) for i, n in enumerate(P))
        return s[(centerIndex - maxLen) // 2: (centerIndex + maxLen) // 2]


import time

x = time.time()

res = Solution().longestPalindrome('babcbabcbaccba')
print(res)
y = time.time()
print(y - x)
