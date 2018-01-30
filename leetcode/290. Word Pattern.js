// https://leetcode.com/problems/word-pattern/description/
// Given a pattern and a string str, find if str follows the same pattern.
//
// Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in str.
//
// Examples:
// pattern = "abba", str = "dog cat cat dog" should return true.
// pattern = "abba", str = "dog cat cat fish" should return false.
// pattern = "aaaa", str = "dog cat cat dog" should return false.
// pattern = "abba", str = "dog dog dog dog" should return false.
// Notes:
// You may assume pattern contains only lowercase letters, and str contains lowercase letters separated by a single space.

/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function (pattern, str) {
    let words = new Map();
    const strArr = str.split(/\s+/);
    if (pattern.length !== strArr.length) {
        return false;
    }
    for (let i = 0; i < strArr.length; i++) {
        if (words.has(pattern[i])) {
            if (words.get(pattern[i]) !== strArr[i]) {
                return false;
            }
        } else {
            for (let x of words) {
                if (x[1] === strArr[i]) {
                    return false;
                }
            }
            words.set(pattern[i], strArr[i]);
        }
    }
    return true;
};

var wordPattern2 = function (pattern, str) {
    if (!pattern || !str) {
        return false;
    }
    let usedWords = new Set();
    let map = new Map();
    // as a cursor to traverse pattern
    let patternPointer = 0;
    // to denote the beginning char of current word in str
    let wordStart = 0;
    // as a cursor to traverse str
    let strPointer = 0;
    while (patternPointer < pattern.length && strPointer < str.length) {
        // find a new word, i.e. str[start->j-1]
        while (strPointer < str.length && str[strPointer] !== ' ') {
            strPointer++;
        }
        let word = strPointer === str.length ? str.substring(wordStart) : str.substring(wordStart, strPointer);
        // check and return false if :
        // 1. this word has been used for another character,
        // or 2. this word is not a match to previous mapping for this character
        //
        // map contains kv pair of pattern char and word

        if (!map.has(pattern[patternPointer])) {
            if (usedWords.has(word)) {
                return false;
            } else {
                map.set(pattern[patternPointer], word);
                usedWords.add(word);
            }
        } else if (map.get(pattern[patternPointer]) !== word) {
            return false;
        }
        patternPointer++;
        strPointer++;
        wordStart = strPointer;
    }
    // requires that when the while loop is finished，indices i and j should both be out of bound
    return patternPointer >= pattern.length && strPointer >= str.length;
};

console.log(wordPattern('abba', 'dog dog dog dog'));
