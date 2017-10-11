// Reverse a singly linked list.
//
// Hint:
// A linked list can be reversed either iteratively or recursively. Could you implement both?

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    /* iterative solution */
    let nodeNextToHead = null;
    while (head) {
        let next = head.next;
        head.next = nodeNextToHead;
        nodeNextToHead = head;
        head = next;
    }
    return nodeNextToHead;
};

var reverseList2 = function (head) {
    /* recursive solution */
    return reverseListInt(head, null);
};

var reverseListInt = function (head, newHead) {
    if (!head)
        return newHead;
    let next = head.next;
    head.next = newHead;
    return reverseListInt(next, head);
};
