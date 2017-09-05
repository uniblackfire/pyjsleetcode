// https://leetcode.com/problems/valid-perfect-square/description/

// Given a positive integer num, write a function which returns True if num is a perfect square else False.
//
// Note: Do not use any built-in library function such as sqrt.
//
// Example 1:
//
// Input: 16
// Returns: True
// Example 2:
//
// Input: 14
// Returns: False
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
    if (num === 1)
        return true;

    let low = 1,
        high = ~~(num / 2),
        mid = 0;

    while (low <= high) {
        mid = (low + high) >>> 1;//low + ~~((high - low) / 2);
        let midPower = mid ** 2;
        if (midPower === num)
            return true;
        else if (midPower < num)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return false;
};

//Newton Method
var isPerfectSquare2 = function (num) {
    let x = num;
    let xPower = x ** 2;

    while (xPower > num) {
        x = (x + num / x) >>> 1;
        xPower = x ** 2;
    }
    return xPower === num;
};
