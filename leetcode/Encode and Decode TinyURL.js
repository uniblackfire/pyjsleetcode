// Note: This is a companion problem to the System Design problem: Design TinyURL.
// TinyURL is a URL shortening service where you enter a URL such as https://leetcode.com/problems/design-tinyurl and it returns a short URL such as http://tinyurl.com/4e9iAk.
//
// Design the encode and decode methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHABET_LEN = ALPHABET.length;
const BASE_URL = 'http://tinyurl.com/';
let url2code = {};
let code2url = {};
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
var encode = function (longUrl) {
    while (!url2code.hasOwnProperty(longUrl)) {
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += ALPHABET[getRandomInt(0, ALPHABET_LEN)];
        }
        if (!code2url.hasOwnProperty(code)) {
            code2url[code] = longUrl;
            url2code[longUrl] = code;
        }
    }
    return `${BASE_URL}${url2code[longUrl]}`;
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function (shortUrl) {
    return code2url[shortUrl.slice(-6)];
};

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */


console.log(encode('https://leetcode.com/problems/design-tinyurl'));
