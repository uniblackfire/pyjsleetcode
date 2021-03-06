// https://leetcode.com/problems/queue-reconstruction-by-height/description/
//
// Suppose you have a random list of people standing in a queue. Each person is described by a pair of integers (head, k), where head is the height of the person and k is the number of people in front of this person who have a height greater than or equal to head. Write an algorithm to reconstruct the queue.
//
// Note:
// The number of people is less than 1,100.
//
// Example
//
// Input:
// [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
//
// Output:
// [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]

/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
    people.sort((x, y) => y[0] !== x[0] ? y[0] - x[0] : x[1] - y[1]);
    for (let i = 1; i < people.length; i++) {
        let man = people[i];
        people.splice(i, 1);
        people.splice(man[1], 0, man);
    }
    return people;
};

console.log(reconstructQueue([[9, 0], [7, 0], [1, 9], [3, 0], [2, 7], [5, 3], [6, 0], [3, 4], [6, 2], [5, 2]]));
