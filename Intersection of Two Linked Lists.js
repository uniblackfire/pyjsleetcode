// // https://leetcode.com/problems/intersection-of-two-linked-lists/description/
//
// Write a program to find the node at which the intersection of two singly linked lists begins.
//
//
// For example, the following two linked lists:
//
// A:          a1 → a2
//                    ↘
//                      c1 → c2 → c3
//                    ↗
// B:     b1 → b2 → b3
// begin to intersect at node c1.
//
//
// Notes:
//
// If the two linked lists have no intersection at all, return null.
// The linked lists must retain their original structure after the function returns.
// You may assume there are no cycles anywhere in the entire linked structure.
// Your code should preferably run in O(n) time and use only O(1) memory.


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    function length(node) {
        let length = 0;
        while (node !== null) {
            node = node.next;
            length++;
        }
        return length;
    }

    let lenA = length(headA), lenB = length(headB);
    // move headA and headB to the same start point
    while (lenA > lenB) {
        headA = headA.next;
        lenA--;
    }
    while (lenA < lenB) {
        headB = headB.next;
        lenB--;
    }
    // find the intersection until end
    while (headA !== headB) {
        headA = headA.next;
        headB = headB.next;
    }
    return headA;
};

var getIntersectionNode2 = function (headA, headB) {
    if (!headA || !headB) return null;
    // find last node of list A (c3)
    let endA = headA;
    while (endA.next) {
        endA = endA.next;
    }
    // join c3 to b1 making a c1...c3-b1...b3-c1 loop (if b3 indeed points to c1)
    endA.next = headB;

    let start = null; // if there's no cycle this will stay null
    // Floyd's cycle finder
    let slow = headA, fast = headA;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) { // found a cycle
            // reset to beginning to find cycle start point (c1)
            start = headA;
            while (slow !== start) {
                slow = slow.next;
                start = start.next;
            }
            break;
        }
    }
    // unjoin c3-b1
    endA.next = null;
    return start;
};
