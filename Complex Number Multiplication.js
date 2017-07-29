// Given two strings representing two complex numbers.
//
// You need to return a string representing their multiplication. Note i2 = -1 according to the definition.
//
// Example 1:
// Input: "1+1i", "1+1i"
// Output: "0+2i"
// Explanation: (1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i, and you need convert it to the form of 0+2i.
// Example 2:
// Input: "1+-1i", "1+-1i"
// Output: "0+-2i"
// Explanation: (1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i, and you need convert it to the form of 0+-2i.
// Note:
//
// The input strings will not have extra blank.
// The input strings will be given in the form of a+bi, where the integer a and b will both belong to the range of [-100, 100]. And the output should be also in this form.


/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var complexNumberMultiply = function (a, b) {
    const complex_pattern = /(-?\d+)\+(-?\d+)i/i;
    let matched = complex_pattern.exec(a);
    let [a_real, a_imaginary] = [Number.parseInt(matched[1]), Number.parseInt(matched[2])];
    matched = complex_pattern.exec(b);
    let [b_real, b_imaginary] = [Number.parseInt(matched[1]), Number.parseInt(matched[2])];

    let result_real = a_real * b_real - a_imaginary * b_imaginary;
    let result_imaginary = a_real * b_imaginary + a_imaginary * b_real;
    return `${result_real}+${result_imaginary}i`;
};


console.log(complexNumberMultiply('78+-76i', '-86+72i'));
