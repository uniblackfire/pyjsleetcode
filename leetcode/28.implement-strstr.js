/*
 * [28] Implement strStr()
 *
 * https://leetcode.com/problems/implement-strstr
 *
 * algorithms
 * Easy (28.14%)
 * Total Accepted:    199.5K
 * Total Submissions: 709.1K
 * Testcase Example:  '""\n""'
 *
 * 
 * Implement strStr().
 * 
 * 
 * Returns the index of the first occurrence of needle in haystack, or -1 if
 * needle is not part of haystack.
 * 
 */
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    if (needle.length === 0) return 0;
    if (needle.length > haystack.length || haystack.length === 0) return -1;

    let ndl = Array.from(needle);
    let hay = Array.from(haystack);
    let pai = new Array(ndl.length);

    pai[0] = -1;
    let k = -1;

    for (let i = 1; i < ndl.length; i++) {
        while (k > -1 && ndl[k + 1] !== ndl[i]) {
            k = pai[k];
        }
        if (ndl[k + 1] === ndl[i]) {
            k++;
        }
        pai[i] = k;

    }
    k = -1;
    for (let i = 0; i < hay.length; i++) {
        while (k > -1 && ndl[k + 1] !== hay[i]) {
            k = pai[k];
        }
        if (ndl[k + 1] === hay[i]) {
            k++;
            if (k === ndl.length - 1) {
                return i - k;
            }
        }
    }
    return -1;
};

var strStr2 = function (haystack, needle) {
    let m = haystack.length, n = needle.length;
    if (!n) return 0;
    for (let i = 0; i < m - n + 1; i++) {
        let j = 0;
        while (j < n) {
            if (haystack[i + j] !== needle[j]) {
                break;
            }
            j++;
        }
        if (j === n) return i;
    }
    return -1;
};

//KMP
// http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html
// http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/
// http://www.geeksforgeeks.org/searching-for-patterns-set-2-kmp-algorithm/
var strStr3 = function (haystack, needle) {
    function kmpProcess(needle) {
        let needleLen = needle.length;
        let lps = new Array(needleLen).fill(0);
        let i = 1, len = 0;
        while (i < needleLen) {
            console.log(i, len);
            if (needle[i] === needle[len])
                lps[i++] = ++len;
            else if (len) len = lps[len - 1];
            else lps[i++] = 0;
        }
        return lps;
    }

    let srcLen = haystack.length, searchLen = needle.length;
    if (!searchLen) return 0;
    let lps = kmpProcess(needle);
    console.log(lps);
    let i = 0, j = 0;
    while (i < srcLen) {
        if (haystack[i] === needle[j]) {
            i++;
            j++;
        } else if (j) {
            j = lps[j - 1];
        }
        else {
            i++;
        }

        if (j === searchLen) {
            // found
            return i - j;
        }
    }
    return -1;

};

console.log(strStr3('BBC ABCDAB ABCDABCDABDE', 'ABCDABD'));
