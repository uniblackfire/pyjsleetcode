//https://leetcode.com/problems/find-all-anagrams-in-a-string/description/
// Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.
//
// Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100.
//
// The order of output does not matter.
//
// Example 1:
//
// Input:
// s: "cbaebabacd" p: "abc"
//
// Output:
// [0, 6]
//
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".
// Example 2:
//
// Input:
// s: "abab" p: "ab"
//
// Output:
// [0, 1, 2]
//
// Explanation:
// The substring with start index = 0 is "ab", which is an anagram of "ab".
// The substring with start index = 1 is "ba", which is an anagram of "ab".
// The substring with start index = 2 is "ab", which is an anagram of "ab".
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    //https://discuss.leetcode.com/topic/64434/shortest-concise-java-o-n-sliding-window-solution/4
    let list = [];
    if (!s || !s.length || !p || !p.length) return list;

    let hash = new Array(128).fill(0); //character hash

    //record each character in p to hash
    for (let c of p) {
        hash[c.charCodeAt(0)]++;
    }

    //two points, initialize count to p's length
    let left = 0, right = 0, count = p.length;

    while (right < s.length) {
        //move right each time, if the character exists in p's hash, decrease the count
        //current hash value >= 1 means the character is existing in p
        let index = s.charCodeAt(right);
        if (hash[index] > 0) {
            count--;
        }
        hash[index]--;
        right++;
        //when the count is down to 0, means we found the right anagram
        //then add window's left to result list
        if (count === 0) {
            list.push(left);
        }
        //if we find the window's size equals to p, then we have to move left (narrow the window) to find the new match window
        //++ to reset the hash because we kicked out the left
        //only increase the count if the character is in p
        //the count >= 0 indicate it was original in the hash, cuz it won't go below 0
        if (right - left === p.length) {
            let index = s.charCodeAt(left);

            if (hash[index] >= 0) {
                count++;
            }
            hash[index]++;
            left++;
        }
    }
    return list;

};

function permutations(string) {
    return (string.length === 1) ? [string] : string.split('').map(
        (e, i) => permutations(string.slice(0, i) + string.slice(i + 1)).map((e2) => e + e2),
    ).reduce((r, e) => r.concat(e)).sort().filter((e, i, a) => (i === 0) || a[i - 1] !== e);
}
console.log(findAnagrams('abcba', 'abc'));
