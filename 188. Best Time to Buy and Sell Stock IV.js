// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/


// Say you have an array for which the ith element is the price of a given stock on day i.
//
// Design an algorithm to find the maximum profit. You may complete at most k transactions.
//
// Note:
// You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
    function maxProfitFree(prices) {
        let sum = 0;
        for (let i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) sum += prices[i] - prices[i - 1];
        }
        return sum;
    }

    let n = prices.length;
    if (k >= ~~(n / 2)) return maxProfitFree(prices);

    let dp = new Array(k + 1);//.fill(new Array(n).fill(0));
    for (let i = 0; i < k + 1; i++) {
        dp[i] = new Array(n).fill(0);
    }

    for (let i = 1; i < k + 1; i++) {
        let holding = -prices[0];
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.max(dp[i][j - 1], holding + prices[j]);
            holding = Math.max(holding, dp[i - 1][j - 1] - prices[j]);
        }
    }

    return dp[k][n - 1];
};
// It basically means we can either do not use the prices[j] (thus, dp[i][j-1]), or use prices[j] (if prices[j] is used, the last transaction must start some point, jj; then, before jj, we can do at most i - 1 transactions).
//
// At certain i, j, for each jj, prices[j] is not changing. only prices[jj] and dp[i - 1][jj] are changing. So we can separate prices[j] from prices[jj] and dp[i - 1][jj].
var maxProfit2 = function (k, prices) {
    let n = prices.length;
    if (n <= 1)
        return 0;

    //if k >= n/2, then you can make maximum number of transactions.
    if (k >= ~~(n / 2)) {
        let maxPro = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1])
                maxPro += prices[i] - prices[i - 1];
        }
        return maxPro;
    }

    let dp = new Array(k + 1);//.fill(new Array(n).fill(0));
    for (let i = 0; i < k + 1; i++) {
        dp[i] = new Array(n).fill(0);
    }
    for (let i = 1; i <= k; i++) {
        let localMax = dp[i - 1][0] - prices[0];
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.max(dp[i][j - 1], prices[j] + localMax);
            localMax = Math.max(localMax, dp[i - 1][j] - prices[j]);
        }
    }
    return dp[k][n - 1];
};


// share my thinking process:
//
// dp[i][j] means max profit at day j with at most i transactions.
//
// so there are two possible situations on day j:
//
// do nothing on day j, which means at most i transactions are all done before day j, so dp[i][j] = dp[i][j-1]
//
// sell at price[j], which means before day j there will be at most i-1 transactions.
//
// and because you sell the stock on day j, you must have already bought it before day j.the last time you bought it before day j could be any day between [0, j-1].
//
// let's say the last time you bought it on day jj, where jj is in range [0, j-1].
//
// in this case you didn't touch price[jj] before you bought it. so what's the max profit before you bought it on day jj, well obviously it's dp[i-1][jj-1]. it's also dp[i-1][jj] because in this case you can only buy it on day jj and to keep the profit maximum you will do nothing on day jj.
//
// after all you bought it on day jj and the "max profit" becomes max(dp[i-1][jj] - prices[jj]), this isn't the max profit on day jj with at most i-1 transaction, this is the max profit where you already bought the stock on day jj with at most i transactions.

var maxProfit3 = function (k, prices) {
    if (k < 1 || !prices || !prices.length) {
        return 0;
    }

    //fix for memory problem in frequent trades
    if (k >= ~~(prices.length / 2)) {
        let profit = 0;
        for (let i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }

    //DP for at most k trades
    let buy = new Array(k + 1).fill(Number.MIN_SAFE_INTEGER);
    let sell = new Array(k + 1).fill(0);

    for (let i = 0; i < prices.length; i++) {
        for (let j = k; j > 0; j--) {
            sell[j] = Math.max(sell[j], prices[i] + buy[j]);
            buy[j] = Math.max(buy[j], sell[j - 1] - prices[i]);
        }
    }

    return sell[k];
};

console.log(maxProfit3(2, [3, 6, 1, 5, 0, 7]));
