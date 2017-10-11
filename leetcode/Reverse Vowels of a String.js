// Write a function that takes a string as input and reverse only the vowels of a string.
//
//     Example 1:
// Given s = "hello", return "holle".
//
//     Example 2:
// Given s = "leetcode", return "leotcede".
//
//     Note:
// The vowels does not include the letter "y".


/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
    let vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

    let s_arr = Array.from(s);
    let i = 0;
    let j = s_arr.length - 1;
    while (i < j) {
        while (i < j && !vowels.has(s_arr[i])) {
            i += 1;
        }
        while (i < j && !vowels.has(s_arr[j])) {
            j -= 1;
        }

        let tmp_ch = s_arr[i];
        s_arr[i] = s_arr[j];
        s_arr[j] = tmp_ch;

        console.log(i, j);
        console.log(s_arr);
        i += 1;
        j -= 1;
    }
    return s_arr.join('');
};

console.log(reverseVowels('leetcode'));
