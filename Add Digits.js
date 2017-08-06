// Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.
//
// For example:
//
// Given num = 38, the process is like: 3 + 8 = 11, 1 + 1 = 2. Since 2 has only one digit, return it.
//
// Follow up:
// Could you do it without any loop/recursion in O(1) runtime?


/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
    return (num !== 0 && num % 9 === 0) ? 9 : num % 9;
};

// num = 10 * a + b = a + b + 9 * a
// when you add all digits, the result is sum = num - 9*a, make sum the smallest,
// while sum > 0, when you get the new sum
//
// If sum > 10, do sum1 = sum - 9*a1 again
// else sum is the result
// so we can get the answer, result = num - num / 9 * 9
//
// Only thing you have to do is:
//
// when num == 0, ok the result is right
// when num%9 == 0', oops, the result is 0, but the real result is > 0`, so it is 9.
