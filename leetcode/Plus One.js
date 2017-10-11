// Given a non-negative integer represented as a non-empty array of digits, plus one to the integer.
//
//     You may assume the integer do not contain any leading zero, except the number 0 itself.
//
//     The digits are stored such that the most significant digit is at the head of the list.
//
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    let result = digits.slice();
    let len = result.length;
    let i = len - 1;
    let count = 0;
    for (; i >= 0; i--) {
        if (result[i] === 9) {
            count++;
        } else {
            break;
        }
    }
    if (count > 0) {
        if (i === -1) {
            result = result.map(x => 0);
            result.unshift(1);
        } else {
            result.map((currentValue, index) => {
                if (index > i) {
                    result[index] = 0;
                }
            });
            result[i] += 1;
        }

    } else {
        result[len - 1] += 1;
    }

    return result;
};


console.log(plusOne([2, 9, 9]));
