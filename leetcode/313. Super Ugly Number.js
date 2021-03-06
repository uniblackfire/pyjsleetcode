//https://leetcode.com/problems/super-ugly-number/description/


// Write a program to find the nth super ugly number.
//
// Super ugly numbers are positive numbers whose all prime factors are in the given prime list primes of size k. For example, [1, 2, 4, 7, 8, 13, 14, 16, 19, 26, 28, 32] is the sequence of the first 12 super ugly numbers given primes = [2, 7, 13, 19] of size 4.
//
// Note:
// (1) 1 is a super ugly number for any given primes.
// (2) The given numbers in primes are in ascending order.
// (3) 0 < k ≤ 100, 0 < n ≤ 106, 0 < primes[i] < 1000.
// (4) The nth super ugly number is guaranteed to fit in a 32-bit signed integer.

/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
var nthSuperUglyNumber = function (n, primes) {
    // https://discuss.leetcode.com/topic/34841/java-three-methods-23ms-36-ms-58ms-with-heap-performance-explained/23
    const ugly = new Array(n);
    const idx = new Array(primes.length).fill(0);

    ugly[0] = 1;
    for (let i = 1; i < n; i++) {
        //find next
        ugly[i] = Number.MAX_SAFE_INTEGER;
        for (let j = 0; j < primes.length; j++)
            ugly[i] = Math.min(ugly[i], primes[j] * ugly[idx[j]]);

        //slip duplicate
        for (let j = 0; j < primes.length; j++) {
            if (primes[j] * ugly[idx[j]] === ugly[i])
                idx[j]++;
        }
    }

    return ugly[n - 1];
};

var nthSuperUglyNumber2 = function (n, primes) {
    const ugly = new Array(n);
    const len = primes.length;
    const idx = new Array(len).fill(0);
    const val = new Array(len).fill(1);

    let next = 1;
    for (let i = 0; i < n; i++) {
        ugly[i] = next;

        next = Number.MAX_SAFE_INTEGER;
        for (let j = 0; j < len; j++) {
            //skip duplicate and avoid extra multiplication
            if (val[j] === ugly[i]) {
                val[j] = ugly[idx[j]] * primes[j];
                idx[j]++;
            }
            //find next ugly number
            next = Math.min(next, val[j]);
        }
    }

    return ugly[n - 1];
};
var nthSuperUglyNumber3 = function (n, primes) {
    // function PriorityQueue() {
    //     this.data = [];
    // }
    //
    // PriorityQueue.prototype.offer = function (element) {
    //     let i = 0;
    //     for (; i < this.data.length && this.data[i][0] > element[0]; i++);
    //     this.data.splice(i, 0, element);
    // };
    //
    // PriorityQueue.prototype.poll = function () {
    //     return this.data.shift();
    // };
    //
    // PriorityQueue.prototype.size = function () {
    //     return this.data.length;
    // };
    //
    // PriorityQueue.prototype.peek = function () {
    //     return this.data[0];
    // };

    //http://x-wei.github.io/heap-summary.html
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
    }

    let pq = new PriorityQueue((item1, item2) => item1[0] < item2[0]);

    const ugly = new Array(n);
    ugly[0] = 1;

    for (let i = 0; i < primes.length; i++) {
        // n[0] current value, n[1] current index, n[2] base value
        pq.push([primes[i], 0, primes[i]]);
    }

    for (let i = 1; i < n; i++) {
        let next = pq.peek()[0];
        ugly[i] = next;
        while (pq.peek()[0] === next) {
            let pqItem = pq.poll();
            pqItem[0] = pqItem[2] * ugly[pqItem[1]];
            pqItem[1] += 1;

            pq.offer(pqItem);
        }
    }

    return ugly[n - 1];
};
console.log(nthSuperUglyNumber2(4, [2, 7, 13, 19]));
