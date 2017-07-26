// You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
//
// Example 1:
// coins = [1, 2, 5], amount = 11
// return 3 (11 = 5 + 5 + 1)
//
// Example 2:
// coins = [2], amount = 3
// return -1.
//
// Note:
// You may assume that you have an infinite number of each kind of coin.
//
// Credits:
// Special thanks to @jianchao.li.fighter for adding this problem and creating all test cases.

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    let amountDict = {};

    function recur(coins, amount) {
        if (amount === 0) {
            return 0;
        }
        if (amountDict.hasOwnProperty(amount)) {
            return amountDict[amount];
        }
        let n = amount + 1;
        for (let coin of coins) {
            let curr = 0;
            if (amount >= coin) {
                let next = recur(coins, amount - coin);
                if (next >= 0) {
                    curr = 1 + next;
                }
            }
            if (curr > 0) {
                n = Math.min(n, curr);
            }
        }
        let finalCount = (n === amount + 1) ? -1 : n;
        amountDict[amount] = finalCount;
        return finalCount;
    }

    return recur(coins, amount);
};

// This is a very classic dynamic programming algorithm. However, for someone not familiar with the concept, it can be tricky. Here we tackle the problem recursively, for each coin, if I take that coin into account, then the fewest number of coins we can get is 1+coinChange(amount-that_coin_value). So for all the coins, we return the smallest number as min(1+coinChange(amount-coin1_value), 1+coinChange(amount-coin2_value, ......).
//
// As we can see it is recursive, the solution is as below, this solution of upper time complexity O(c^n) where c is number of different denominations and n is the amount given, which is exponential:
//
// public class Solution {
//     public int coinChange(int[] coins, int amount) {
//         if(amount==0)
//             return 0;
//         int n = amount+1;
//         for(int coin : coins) {
//             int curr = 0;
//             if (amount >= coin) {
//                 int next = coinChange(coins, amount-coin);
//                 if(next >= 0)
//                     curr = 1+next;
//             }
//             if(curr > 0)
//                 n = Math.min(n,curr);
//         }
//         int finalCount = (n==amount+1) ? -1 : n;
//         return finalCount;
//     }
// }
// Then we observed that this algorithm may compute coinChange of same amount for many times, which are kind of duplicate, if we can store "amount->fewest_coin_count" into hashtble, then we don't need to recompute again. Actually, this is DP (dynamic programming), aka. Memorization. So the final solution is to add hashtbl implementation to the previous solution and problem solved, this is of upper time complexity O(n^c), which is polynomial:
//
// public class Solution {
//     Map<Integer,Integer> amountDict = new HashMap<Integer,Integer>();
//     public int coinChange(int[] coins, int amount) {
//         if(amount==0)
//             return 0;
//         if(amountDict.containsKey(amount))
//             return amountDict.get(amount);
//         int n = amount+1;
//         for(int coin : coins) {
//             int curr = 0;
//             if (amount >= coin) {
//                 int next = coinChange(coins, amount-coin);
//                 if(next >= 0)
//                     curr = 1+next;
//             }
//             if(curr > 0)
//                 n = Math.min(n,curr);
//         }
//         int finalCount = (n==amount+1) ? -1 : n;
//         amountDict.put(amount,finalCount);
//         return finalCount;
//     }
// }


console.log(coinChange([186, 419, 83, 408], 6249));
