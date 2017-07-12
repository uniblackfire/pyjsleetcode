// Given a string, you need to reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.
//
//     Example 1:
// Input: "Let's take LeetCode contest"
// Output: "s'teL ekat edoCteeL tsetnoc"
// Note: In the string, each word is separated by single space and there will not be any extra space in the string.

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    let words = s.split(' ');
    let reverse = function (word) {
        let rev_char = new Array(word.length);
        let l = 0, r = word.length - 1;
        while (l <= r) {
            rev_char[l] = word[r];
            rev_char[r] = word[l];
            l++;
            r--;
        }
        // for (let i = word.length - 1; i >= 0; i--) {
        //     rev_char.push(word[i]);
        // }
        return rev_char.join('');
    };
    return words.map(reverse).join(' ');
};

console.log(reverseWords("Let's take LeetCode contest"));
