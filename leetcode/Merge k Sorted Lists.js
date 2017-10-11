// Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {

    //Delete all empty entries.
    for (let i = 0; i < lists.length;) {
        if (lists[i]) {
            i++;
        } else {
            lists.splice(i, 1);
        }
    }
    if (lists.length === 0) return [];

    let tempArry = [], listsLength;

    while (lists.length > 1) {
        listsLength = lists.length;
        if (listsLength % 2 !== 0) { // the length of current array is odd
            lists.push(null);
            listsLength++;
        }
        for (let i = 0; i < listsLength; i += 2) {
            tempArry.push(merge2Lists(lists[i], lists[i + 1]));
        }
        lists = tempArry;
        tempArry = [];
    }
    return lists[0];

    function merge2Lists(list1, list2) {
        let head = new ListNode(0), temp = head;
        while (list1 && list2) {
            if (list1.val < list2.val) {
                temp.next = new ListNode(list1.val);
                list1 = list1.next;
            } else {
                temp.next = new ListNode(list2.val);
                list2 = list2.next;
            }
            temp = temp.next;
        }
        temp.next = list1 ? list1 : list2;
        return head.next;
    }
};

// 1  |   |  |   |  |   .
// 2    |      |      |     .
// 3        |            |
// 4              |
// Line1 is an array, each element is a ListNode (as "|" in the graph). If the length of current array is odd, add an null element(as "." in the graph), compare them two by two ,put the results into a new array (line2). Keep doing until the length of the result array is 1, which means we merged all elements, and it is the result.
