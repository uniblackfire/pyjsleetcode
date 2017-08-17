// https://leetcode.com/problems/palindrome-linked-list/description/

// Given a singly linked list, determine if it is a palindrome.
//
// Follow up:
// Could you do it in O(n) time and O(1) space?

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    let fast = head;
    let slow = head;

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    if (fast) {
        slow = slow.next;
    }

    function reverse(head) {
        let prev = null;
        while (head) {
            let next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }

    slow = reverse(slow);
    while (slow && head.val === slow.val) {
        head = head.next;
        slow = slow.next;
    }
    return slow === null;
};
