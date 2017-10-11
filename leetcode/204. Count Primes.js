// https://leetcode.com/problems/count-primes/description/

// Description:
//
// Count the number of prime numbers less than a non-negative number, n.

/**
 * @param {number} n
 * @return {number}
 */

var countPrimes = function (n) {
    let notPrime = new Array(n);
    let count = 0;
    for (let i = 2; i < n; ++i) {
        if (!notPrime[i]) {
            count++;
            // add i < Math.sqrt(n) to avoid overflow
            for (let j = i * i; i < Math.sqrt(n) && j < n; j += i) {
                notPrime[j] = true;
            }
        }
    }
    return count;
};
//https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
