// https://leetcode.com/problems/sliding-window-median/description/


// Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.
//
//     Examples:
// [2,3,4] , the median is 3
//
//     [2,3], the median is (2 + 3) / 2 = 2.5
//
// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Your job is to output the median array for each window in the original array.
//
//     For example,
//     Given nums = [1,3,-1,-3,5,3,6,7], and k = 3.
//
// Window position                Median
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       1
// 1 [3  -1  -3] 5  3  6  7       -1
// 1  3 [-1  -3  5] 3  6  7       -1
// 1  3  -1 [-3  5  3] 6  7       3
// 1  3  -1  -3 [5  3  6] 7       5
// 1  3  -1  -3  5 [3  6  7]      6
// Therefore, return the median sliding window as [1,-1,-1,3,5,6].
//
//     Note:
// You may assume k is always valid, ie: k is always smaller than input array's size for non-empty array.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var medianSlidingWindow = function (nums, k) {
    //https://discuss.leetcode.com/topic/74724/java-solution-using-two-priorityqueues
    class PriorityQueue extends Array {
        constructor(cmpFunc) {
            super();
            this.cmpFunc = cmpFunc;
        }

        offer(element) {
            let i = 0;
            while (i < this.length && this.cmpFunc(this[i], element)) {
                i++;
            }
            this.splice(i, 0, element);
            // this.push(element);
            // this.sort(this.cmpFunc)
        }

        poll() {
            return this.shift();
        }

        peek() {
            return this[0];
        }

        isEmpty() {
            return this.length === 0;
        }

        size() {
            return this.length;
        }

        remove(item) {
            if (typeof item !== 'undefined') {
                // let idx = this.indexOf(item);
                // if (idx !== -1) {
                //     this.splice(idx, 1);
                //     return true;
                // } else {
                //     return false;
                // }

                for (let i = 0, len = this.length; i < len; i++) {
                    if (Object.is(this[i], item)) {
                        this.splice(i, 1);
                        return true;
                    }
                }
                return false;
            } else {
                if (this.length) {
                    this.shift();
                    return true;
                }
                else
                    return false
            }
        }
    }

    const result = new Array(nums.length - k + 1);
    const left = new PriorityQueue((item1, item2) => item1 >= item2);
    const right = new PriorityQueue((item1, item2) => item1 < item2);

    for (let i = 0; i < nums.length; i++) {
        if (left.size() <= right.size()) {
            right.offer(nums[i]);
            left.offer(right.poll());
        } else {
            left.offer(nums[i]);
            right.offer(left.poll());
        }

        if (left.size() + right.size() === k) {
            let median;
            if (left.size() === right.size()) {
                median = (~~left.peek() + ~~right.peek()) / 2;
            } else {
                median = left.peek();
            }

            const start = i - k + 1;
            result[start] = median;

            if (!left.remove(nums[start])) {
                right.remove(nums[start]);
            }
        }
    }

    return result;
};

var medianSlidingWindow2 = function (nums, k) {
    const window = nums.slice(0, k).sort((x, y) => x - y);
    const bArr = nums.slice(k);
    bArr.push(0);

    function inSort(arr, val) {
        let i = 0;
        while (i < arr.length && arr[i] < val) {
            i++;
        }
        arr.splice(i, 0, val);
    }

    const medians = [];
    const rightIdx = k / 2 >>> 0;
    const leftIdx = k + ~rightIdx;
    for (let i = 0, len = bArr.length; i < len; i++) {
        medians.push((window[leftIdx] + window[rightIdx]) / 2);
        window.splice(window.indexOf(nums[i]), 1);
        // keep window ordered
        inSort(window, bArr[i]);
    }
    return medians;
};

console.log(medianSlidingWindow2([9, 7, 0, 3, 9, 8, 6, 5, 7, 6], 3));
