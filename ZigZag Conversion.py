# The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
#
# P   A   H   N
# A P L S I I G
# Y   I   R

# P     I     N
# A   L S   I G
# Y A   H R
# P     I

# P       H
# A     S I
# Y   I   R
# P L     I G
# A       N


# And then read line by line: "PAHNAPLSIIGYIR"
# Write the code that will take a string and make this conversion given a number of rows:
#
# string convert(string text, int nRows);
# convert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".


class Solution(object):
    def convert(self, s, numRows):
        """
        :type s: str
        :type numRows: int
        :rtype: str
        """
        if numRows == 1:
            return s
        first_line = s[::2 * (numRows - 1)]
        line_list = list()

        for line_num in range(2, numRows):
            pre = 2 * (numRows - line_num)
            tail = 2 * (line_num - 1)

            append_list = list()
            index = line_num - 1
            isPre = True
            while index < len(s):
                append_list.append(s[index])
                if index + min(pre, tail) > len(s):
                    break
                if isPre:
                    index += pre
                else:
                    index += tail

                isPre = not isPre

            line_list.append(''.join(append_list))

        middle_lines = ''.join(line_list)

        last_line = s[numRows - 1::2 * (numRows - 1)]
        return first_line + middle_lines + last_line


import time

x = time.time()
res = Solution().convert("PAYPALISHIRING", 5)
print(res)
y = time.time()
print(y - x)