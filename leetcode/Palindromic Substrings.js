// Given a string, your task is to count how many palindromic substrings in this string.
//
// The substrings with different start indexes or end indexes are counted as different substrings even they consist of same characters.
//
// Example 1:
// Input: "abc"
// Output: 3
// Explanation: Three palindromic strings: "a", "b", "c".
// Example 2:
// Input: "aaa"
// Output: 6
// Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
// Note:
// The input string length won't exceed 1000.


/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    let len = s.length;
    // declare a two dimension array and fill with 'true'
    let dp = new Array(len);
    for (let i = 0; i < len; i++) {
        dp[i] = new Array(len).fill(true);
    }

    let count = 0;
    for (let i = len - 1; i >= 0; i--) {
        for (let j = i; j < len; j++) {
            if (i === j) {
                count++;
                console.log(`i:${i} j:${j} count:${count}`);
                continue;
            }
            console.log(dp);
            dp[i][j] = (s[i] === s[j]) && dp[i + 1][j - 1];
            if (dp[i][j])
                count++;
        }
    }
    return count;
};

//https://discuss.leetcode.com/topic/96884/very-simple-java-solution-with-detail-explanation
var countSubstrings2 = function (s) {
    let count = 1;

    function checkPalindrome(str, i, j) {
        while (0 <= i && j < s.length && str[i] === str[j]) {
            count++;
            i--;
            j++;
        }
    }

    if (s.length === 0) {
        return 0;
    }
    for (let i = 0; i < s.length - 1; i++) {
        checkPalindrome(s, i, i);
        checkPalindrome(s, i, i + 1);
    }
    return count;
};


console.log(countSubstrings2('aabaa'));
// let cnt = 0;
// let n = s.length;
// let ca = Array.from(s);
//
// let isp = new Array(n);
// for (let i = 0; i < n; i++) {
//     isp[i] = new Array(n);
// }
// for (let i = n - 1; i >= 0; i--) {
//     for (let j = i; j < n; j++) {
//         cnt += (isp[i][j] = i == j || ca[i] == ca[j] && (i + 1 == j || isp[i + 1][j - 1])) ? 1 : 0;
//     }
// }
// return cnt;
