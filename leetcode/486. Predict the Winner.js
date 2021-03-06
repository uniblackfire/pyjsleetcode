// https://leetcode.com/problems/predict-the-winner/description/

// Given an array of scores that are non-negative integers. Player 1 picks one of the numbers from either end of the array followed by the player 2 and then player 1 and so on. Each time a player picks a number, that number will not be available for the next player. This continues until all the scores have been chosen. The player with the maximum score wins.
//
// Given an array of scores, predict whether player 1 is the winner. You can assume each player plays to maximize his score.
//
// Example 1:
// Input: [1, 5, 2]
// Output: False
// Explanation: Initially, player 1 can choose between 1 and 2.
// If he chooses 2 (or 1), then player 2 can choose from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2).
// So, final score of player 1 is 1 + 2 = 3, and player 2 is 5.
// Hence, player 1 will never be the winner and you need to return False.
// Example 2:
// Input: [1, 5, 233, 7]
// Output: True
// Explanation: Player 1 first chooses 1. Then player 2 have to choose between 5 and 7. No matter which number player 2 choose, player 1 can choose 233.
// Finally, player 1 has more score (234) than player 2 (12), so you need to return True representing player1 can win.
// Note:
// 1 <= length of the array <= 20.
// Any scores in the given array are non-negative integers and will not exceed 10,000,000.
// If the scores of both players are equal, then player 1 is still the winner.


/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function (nums) {
//     Explanation
// So assuming the sum of the array it SUM, so eventually player1 and player2 will split the SUM between themselves. For player1 to win, he/she has to get more than what player2 gets. If we think from the prospective of one player, then what he/she gains each time is a plus, while, what the other player gains each time is a minus. Eventually if player1 can have a >0 total, player1 can win.
//
// Helper function simulate this process. In each round:
// if e==s, there is no choice but have to select nums[s]
// otherwise, this current player has 2 options:
// --> nums[s]-helper(nums,s+1,e): this player select the front item, leaving the other player a choice from s+1 to e
// --> nums[e]-helper(nums,s,e-1): this player select the tail item, leaving the other player a choice from s to e-1
// Then take the max of these two options as this player's selection, return it.


    function helper(nums, s, e, mem) {
        if (!mem[s][e]) {
            if (s === e) {
                mem[s][e] = nums[e];
            }
            else {
                mem[s][e] = Math.max(nums[e] - helper(nums, s, e - 1, mem), nums[s] - helper(nums, s + 1, e, mem));
            }
        }
        return mem[s][e];
    }

    let arr = new Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
        arr[i] = new Array(nums.length);
    }
    return helper(nums, 0, nums.length - 1, arr) >= 0;
};

var predictTheWinner2 = function (nums) {
    let numsLen = nums.length;
    let dp = new Array(nums.length);
    for (let i = 0; i < nums.length; i++) {
        dp[i] = new Array(nums.length);
    }
    for (let i = 0; i < numsLen; i++) {
        dp[i][i] = nums[i];
    }
    for (let len = 1; len < numsLen; len++) {
        for (let i = 0; i + len < numsLen; i++) {
            let j = i + len;
            console.log(i, j);
            dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
        }
    }
    console.log(dp);
    return dp[0][numsLen - 1] >= 0;
};

var predictTheWinner3 = function (nums) {
    if (!nums) {
        return true;
    }
    let numsLen = nums.length;
    if ((numsLen & 1) === 0) {
        return true;
    }
    let dp = new Array(numsLen);
    for (let i = numsLen - 1; i >= 0; i--) {
        for (let j = i; j < numsLen; j++) {
            if (i === j) {
                dp[i] = nums[i];
                console.log('i=j', i, dp[i]);
            } else {
                dp[j] = Math.max(nums[i] - dp[j], nums[j] - dp[j - 1]);
                console.log('j', j, 'dp[j]', dp[j]);
            }
        }
    }
    return dp[numsLen - 1] >= 0;
};
console.log(predictTheWinner3([1, 5, 2]));
// https://discuss.leetcode.com/topic/76830/java-9-lines-dp-solution-easy-to-understand-with-improvement-to-o-n-space-complexity/20
// 1, The first step is to break the question into the sub-problems that we can program. From the question, the winning goal is that "The player with the maximum score wins". So one way to approach it is that we may want to find a way to maximize player 1's sum and check if it is greater than player 2's sum (or more than half of the sum of all numbers). Another way, after noting that the sum of all numbers is fixed, I realized that it doesn't matter how much player 1's total sum is as long as the sum is no less than player 2's sum. No matter how, I think we can easily recognize that it is a recursive problem where we may use the status on one step to calculate the answer for the next step. It is a common way to solve game problems. So we may start with using a brutal force recursive method to solve this one.
//
// 2, However, we always want to do better than brutal force. We may easily notice that there will be lots of redundant calculation. For example, "player 1 picks left, then player 2 picks left, then player 1 picks right, then player 2 picks right" will end up the same as "player 1 picks right, then player 2 picks right, then player 1 picks left, then player 2 picks left". So, we may want to use dynamic programming to save intermediate states.
//
// 3, I think it will be easy to think about using a two dimensional array dp[i][j] to save all the intermediate states. From step 1, we may see at least two ways of doing it. It just turned out that if we choose to save how much more scores that the first-in-action player will earn from position i to j in the array (as I did), the code will be better in a couple of ways.
//
// 4, After we decide that dp[i][j] saves how much more scores that the first-in-action player will get from i to j than the second player, the next step is how we update the dp table from one state to the next. Going back to the question, each player can pick one number either from the left or the right end of the array. Suppose they are picking up numbers from position i to j in the array and it is player A's turn to pick the number now. If player A picks position i, player A will earn nums[i] score instantly. Then player B will choose from i + 1 to j. Please note that dp[i + 1][j] already saves how much more score that the first-in-action player will get from i + 1 to j than the second player. So it means that player B will eventually earn dp[i + 1][j] more score from i + 1 to j than player A. So if player A picks position i, eventually player A will get nums[i] - dp[i + 1][j] more score than player B after they pick up all numbers. Similarly, if player A picks position j, player A will earn nums[j] - dp[i][j - 1] more score than player B after they pick up all numbers. Since A is smart, A will always choose the max in those two options, so:
// dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
//
// 5, Now we have the recursive formula, the next step is to decide where it all starts. This step is easy because we can easily recognize that we can start from dp[i][i], where dp[i][i] = nums[i]. Then the process becomes a very commonly seen process to update the dp table. I promise that this is a very useful process. Everyone who is preparing for interviews should get comfortable with this process:
// Using a 5 x 5 dp table as an example, where i is the row number and j is the column number. Each dp[i][j] corresponds to a block at row i, column j on the table. We may start from filling dp[i][i], which are all the diagonal blocks. I marked them as 1. Then we can see that each dp[i][j] depends only on dp[i + 1][j] and dp[i][j - 1]. On the table, it means each block (i, j) only depends on the block to its left (i, j - 1) and to its down (i + 1, j). So after filling all the blocks marked as 1, we can start to calculate those blocks marked as 2. After that, all blocks marked as 3 and so on.
// 0_1488092542752_dp.jpg
// So in my code, I always use len to denote how far the block is away from the diagonal. So len ranges from 1 to n - 1. Remember this is the outer loop. The inner loop is all valid i positions. After filling all the upper side of the table, we will get our answer at dp[0][n - 1] (marked as 5). This is the end of my code.
//
// However, if you are interviewing with a good company, they may challenge you to further improve your code, probably in the aspect of space complexity. So far, we are using a n x n matrix so the space complexity is O(n^2). It actually can be improved to O(n). That can be done by changing our way of filling the table. We may use only one dimensional dp[i] and we start to fill the table at the bottom right corner where dp[4] = nums[4]. On the next step, we start to fill the second to the last line, where it starts from dp[3] = nums[3]. Then dp[4] = Math.max(nums[4] - dp[3], nums[3] - dp[4]). Then we fill the third to the last line where dp[2] = nums[2] and so on... Eventually after we fill the first line and after the filling, dp[4] will be the answer.
//
// On a related note, whenever we do sum, subtract, multiply or divide of integers, we might need to think about overflow. It doesn't seem to be a point to check for this question. However, we may want to consider using long instead of int for some cases. Further, in my way of code dp[i][j] roughly varies around zero or at least it doesn't always increases with approaching the upper right corner. So it will be less likely to overflow.
