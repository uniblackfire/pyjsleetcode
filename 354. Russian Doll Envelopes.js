// https://leetcode.com/problems/russian-doll-envelopes/description/
// You have a number of envelopes with widths and heights given as a pair of integers (w, h). One envelope can fit into another if and only if both the width and height of one envelope is greater than the width and height of the other envelope.
//
// What is the maximum number of envelopes can you Russian doll? (put one inside other)
//
// Example:
// Given envelopes = [[5,4],[6,4],[6,7],[2,3]], the maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).

/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
    envelopes.sort((x, y) => x[0] !== y[0] ? x[0] - y[0] : y[1] - x[1]);
    function binarySearch(arr, key, fromIndex = 0, toIndex = arr.length, cmpFunc = (x, y) => x - y) {
        function rangeCheck(arrayLen, fromIndex, toIndex) {
            if (fromIndex > toIndex)
                throw Error('fromIndex(' + fromIndex +
                    ') > toIndex(' + toIndex + ')');
            if (fromIndex < 0)
                throw Error(fromIndex);
            if (toIndex > arrayLen)
                throw Error(toIndex);
        }

        rangeCheck(arr.length, fromIndex, toIndex);

        let low = fromIndex;
        let high = toIndex - 1;

        while (low <= high) {
            let mid = (low + high) >>> 1;
            let cmp = cmpFunc(key, arr[mid]);
            if (cmp > 0) {
                low = mid + 1;
            } else if (cmp < 0) {
                high = mid - 1;
            } else {
                return mid;
            }
        }

        return -low - 1;
    }

    if (envelopes.length < 2) return envelopes.length;

    let dp = new Array(envelopes.length).fill(0);
    let len = 0;
    for (let envelope of envelopes) {
        let index = binarySearch(dp, envelope[1], 0, len);
        if (index < 0) {
            index = -(index + 1);
        }
        dp[index] = envelope[1];
        if (index === len)
            len++;
    }
    return len;
};

var maxEnvelopes2 = function (envelopes) {
    envelopes.sort((x, y) => x[0] !== y[0] ? x[0] - y[0] : y[1] - x[1]);

    let dp = new Array(envelopes.length).fill(0);
    let size = 0;

    for (let envelope of envelopes) {
        // binary search
        let left = 0, right = size, middle = 0;     // right = size
        while (left < right) {
            middle = (left + right) >>> 1;
            if (dp[middle] < envelope[1]) left = middle + 1;
            else right = middle;
        }

        // left is the right position to 'replace' in dp array
        dp[left] = envelope[1];
        if (left === size) size++;
    }
    return size;
};
console.log(maxEnvelopes([[5, 4], [6, 4], [6, 7], [2, 3]]));

