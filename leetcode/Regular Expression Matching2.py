import unittest


# http://articles.leetcode.com/2011/09/regular-expression-matching.html
# http://www.programcreek.com/2012/12/leetcode-regular-expression-matching-in-java/
# http://blog.csdn.net/linhuanmars/article/details/21145563

class Solution(object):
    def isMatch(self, s, p):
        # The DP table and the string s and p use the same indexes i and j, but
        # table[i][j] means the match status between p[:i] and s[:j], i.e.
        # table[0][0] means the match status of two empty strings, and
        # table[1][1] means the match status of p[0] and s[0]. Therefore, when
        # refering to the i-th and the j-th characters of p and s for updating
        # table[i][j], we use p[i - 1] and s[j - 1].

        # Initialize the table with False. The first row is satisfied.
        table = [[False] * (len(s) + 1) for _ in range(len(p) + 1)]
        # Update the corner case of matching two empty strings.
        table[0][0] = True

        # 在这个题里面，假设我们维护一个布尔数组res[i][j],代表s的前i个字符和p的前j个字符是否匹配
        # (注意这里res的维度是s.length()+1,p.length()+1)。递推公式跟上面类似，分三种种情况：



        # Update the corner case of when s is an empty string but p is not.
        # Since each '*' can eliminate the charter before it, the table is
        # vertically updated by the one before previous. [test_symbol_0]
        for i in range(2, len(p) + 1):
            table[i][0] = table[i - 2][0] and p[i - 1] == '*'

        for i in range(1, len(p) + 1):
            for j in range(1, len(s) + 1):
                # (1)p[j+1]不是'*'。情况比较简单，只要判断如果当前s的i和p的j上的字符一样（如果有p在j上的字符是'.',也是相同），
                # 并且res[i][j]==true，则res[i+1][j+1]也为true，res[i+1][j+1]=false;
                if p[i - 1] != "*":
                    # Update the table by referring the diagonal element.
                    table[i][j] = table[i - 1][j - 1] and (p[i - 1] == s[j - 1] or p[i - 1] == '.')
                    # (2)p[j+1]是'*'，但是p[j]!='.'。那么只要以下条件有一个满足即可对res[i+1][j+1]赋值为true：
                        # 1)res[i+1][j]为真（'*'只取前面字符一次）;
                        # 2)res[i+1][j-1]为真（'*'前面字符一次都不取，也就是忽略这两个字符）;
                        # 3)res[i][j+1] && s[i]==s[i-1] && s[i-1]==p[j-1](这种情况是相当于i从0到s.length()扫过来，
                        #   如果p[j+1]对应的字符是‘*’那就意味着接下来的串就可以依次匹配下来，如果下面的字符一直重复，并且就是‘*’前面的那个字符）。
                else:
                    # Eliminations (referring to the vertical element)
                    # Either refer to the one before previous or the previous.
                    # I.e. * eliminate the previous or count the previous.
                    # [test_symbol_1]
                    table[i][j] = table[i - 2][j] or table[i - 1][j]

                    # Propagations (referring to the horizontal element)
                    # If p's previous one is equal to the current s, with
                    # helps of *, the status can be propagated from the left.
                    # [test_symbol_2]

                    # (3)p[j+1]是'*'，并且p[j]=='.'。
                    # 因为".*"可以匹配任意字符串，所以在前面的res[i+1][j-1]或者res[i+1][j]中只要有i+1是true，
                    # 那么剩下的res[i+1][j+1],res[i+2][j+1],...,res[s.length()][j+1]就都是true了。
                    # 这道题有个很重要的点，就是实现的时候外层循环应该是p,然后待匹配串s内层循环扫过来。
                    if p[i - 2] == s[j - 1] or p[i - 2] == '.':
                        table[i][j] |= table[i][j - 1]
        # E.g.
        #   s a b b
        # p 1 0 0 0
        # a 0 1 0 0
        # b 0 0 1 0
        # * 0 1 1 1
        # s = "abb"
        # p = "ab*"
        return table[-1][-1]


class TestSolution(unittest.TestCase):
    # def test_none_0(self):
    #     s = ""
    #     p = ""
    #     self.assertTrue(Solution().isMatch(s, p))
    #
    # def test_none_1(self):
    #     s = ""
    #     p = "a"
    #     self.assertFalse(Solution().isMatch(s, p))
    #
    # def test_no_symbol_equal(self):
    #     s = "abcd"
    #     p = "abcd"
    #     self.assertTrue(Solution().isMatch(s, p))
    #
    # def test_no_symbol_not_equal_0(self):
    #     s = "abcd"
    #     p = "efgh"
    #     self.assertFalse(Solution().isMatch(s, p))
    #
    # def test_no_symbol_not_equal_1(self):
    #     s = "ab"
    #     p = "abb"
    #     self.assertFalse(Solution().isMatch(s, p))
    #
    # def test_symbol_0(self):
    #     s = ""
    #     p = "a*"
    #     self.assertTrue(Solution().isMatch(s, p))
    #
    # def test_symbol_1(self):
    #     s = "a"
    #     p = "ab*"
    #     self.assertTrue(Solution().isMatch(s, p))

    def test_symbol_2(self):
        # E.g.
        #   s a b b
        # p 1 0 0 0
        # a 0 1 0 0
        # b 0 0 1 0
        # * 0 1 1 1
        s = "abb"
        p = "ab*"
        self.assertTrue(Solution().isMatch(s, p))


if __name__ == "__main__":
    unittest.main()
    # bool match(char a, char b) {
    #     return b == '.' || a == b;}
    #
    # bool isMatch(char* s, char* p) {
    #     /*
    #        we use an array to log matching status as we move along
    #        arr[i] = 1 if and only if s.substr(0, i) matches the current regex
    #     */
    #     int sLen = strlen(s);
    #     bool arr[sLen+1];
    #
    #     /*
    #         initially our regex is ""
    #         we set arr to [1, 0, 0, 0, 0, ...] because
    #         the only substring matches "" is s.substr(0, 0), which is an empty string
    #     */
    #     memset(arr+1, 0, sLen);
    #     *arr = 1;
    #
    #     /* we scan through p to extend our regex and update arr */
    #     for(p; *p; p++) {
    #
    #         /* let reg denote the previous regex, and c denote the next character (p[0]) */
    #
    #         if(p[1] == '*') {
    #             /*
    #                 if we have a star,
    #                 then substr(0, i+1) matches reg+"c*" (new regex) in two cases:
    #                     1. substr(0, i+1) matches reg (a[i+1] = 1)
    #                     2. substr(0, i) matches reg (arr[i] = 1) and s[i] matches c
    #             */
    #             for(int i = 0; i < sLen; i++) {
    #                 arr[i+1] = arr[i+1] | (arr[i] & match(s[i], *p));}
    #
    #             /* note: we need to skip the * as well */
    #             p++;}
    #
    #         else {
    #             /*
    #                if not a star, then substr(0, sLen-i) matches reg+"c" only if
    #                substr(0, sLen-i-1) matches reg (arr[sLen-i-1]) and s[sLen-i-1] matches c
    #             */
    #             for(int i = 0; i < sLen; i++) {
    #                 arr[sLen-i] = arr[sLen-i-1] & match(s[sLen-i-1], *p);}
    #
    #             /*
    #                 if we have any character not following by a star in p, then our regex cannot match ""
    #                 so we set arr[0] to 0
    #             */
    #             arr[0] = 0;}}
    #
    #     /*
    #        our goal is to determine if s.substr(0, sLen) (which is s) matches p
    #        so we just return arr[sLen]
    #     */
    #     return arr[sLen];}
    ###########
    # bool isMatch(const char *s, const char *p) {
    #   //assert(s && p);
    #   if (*p == '\0') return *s == '\0';
    #
    #   // next char is not '*': must match current character
    #   if (*(p+1) != '*') {
    #     //assert(*p != '*');
    #     return ((*p == *s) || (*p == '.' && *s != '\0')) && isMatch(s+1, p+1);
    #   }
    #   // next char is '*'
    #   while ((*p == *s) || (*p == '.' && *s != '\0')) {
    #     if (isMatch(s, p+2)) return true;
    #     s++;
    #   }
    #   return isMatch(s, p+2);
    # }
