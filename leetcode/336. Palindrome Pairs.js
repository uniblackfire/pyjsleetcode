// https://leetcode.com/problems/palindrome-pairs/description/

// Given a list of unique words, find all pairs of distinct indices (i, j) in the given list, so that the concatenation of the two words, i.e. words[i] + words[j] is a palindrome.
//
// Example 1:
// Given words = ["bat", "tab", "cat"]
// Return [[0, 1], [1, 0]]
// The palindromes are ["battab", "tabbat"]
// Example 2:
// Given words = ["abcd", "dcba", "lls", "s", "sssll"]
// Return [[0, 1], [1, 0], [3, 2], [2, 4]]
// The palindromes are ["dcbaabcd", "abcddcba", "slls", "llssssll"]

/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function (words) {
    function isPalindrome(str) {
        let left = 0, right = str.length - 1;
        while (left <= right) {
            if (str[left] === str[right]) {
                left++;
                right--;
            } else {
                return false;
            }
        }
        return true;
    }

    function reverse(s) {
        return Array.from(s).reverse().join('');
    }

    const pairs = [];
    if (!words) return pairs;
    const map = new Map();

    for (let i = 0; i < words.length; ++i) {
        map.set(words[i], i);
    }

    for (let i = 0; i < words.length; ++i) {
        let l = 0, r = 0;
        while (l <= r) {
            let s = words[i].slice(l, r);
            let j = map.get(reverse(s));
            if (j !== undefined && i !== j) {
                if (l === 0) {
                    if (isPalindrome(words[i].slice(r, words[i].length))) {
                        pairs.push([i, j]);
                    }
                } else {
                    if (isPalindrome(words[i].slice(0, l))) {
                        pairs.push([j, i]);
                    }
                }
            }
            if (r < words[i].length) ++r;
            else ++l;
        }
    }
    return pairs;
};

console.log(palindromePairs(["abcd", "dcba", "lls", "s", "sssll"])); //[[0,1],[1,0],[3,2],[2,4]]

var palindromePairs = function (words) {
    // http://blog.csdn.net/qq508618087/article/details/51443809
    function isPalindrome(str) {
        let left = 0, right = str.length - 1;
        while (left <= right) {
            if (str[left] === str[right]) {
                left++;
                right--;
            } else {
                return false;
            }
        }
        return true;
    }

    function reverse(s) {
        return s.split('').reverse().join('');
    }

    var len = words.length,
        map = new Map(),
        word,
        wordLen,
        result = new Set(),
        resultArr = [],
        sub1,
        sub2,
        i,
        j;

    for (i = 0; i < len; i++) {
        map.set(words[i], i);
    }

    for (i = 0; i < len; i++) {
        word = words[i];
        wordLen = word.length;

        for (j = 0; j <= wordLen; j++) {
            sub1 = word.substring(0, j);
            sub2 = word.substring(j, wordLen);
            if (isPalindrome(sub1)) {
                sub2 = reverse(sub2);

                if (map.has(sub2) && map.get(sub2) !== i) {
                    result.add([map.get(sub2), i].toString());
                }
            }

            if (isPalindrome(sub2)) {
                sub1 = reverse(sub1);

                if (map.has(sub1) && map.get(sub1) !== i) {
                    result.add([i, map.get(sub1)].toString());
                }
            }
        }
    }

    result.forEach(function (item) {
        let temp = item.split(',');
        temp[0] = Number.parseInt(temp[0]);
        temp[1] = Number.parseInt(temp[1]);
        resultArr.push(temp);
    });

    return resultArr;
};
