/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
    nums.sort((x, y) => x - y);
    let sum = 0;
    let len = nums.length;
    do {
        sum += nums[len - 2];
    }
    while (len -= 2);

    return sum;
};


console.log(arrayPairSum([1, 4, 3, 2]));
