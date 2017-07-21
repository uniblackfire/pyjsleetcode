# Given a linked list, remove the nth node from the end of list and return its head.

# For example,
#
#    Given linked list: 1->2->3->4->5, and n = 2.
#
#    After removing the second node from the end, the linked list becomes 1->2->3->5.
# Note:
# Given n will always be valid.
# Try to do this in one pass.




# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution(object):
    def removeNthFromEnd(self, head, n):
        """
        :type head: ListNode
        :type n: int
        :rtype: ListNode
        """
        if not head.next:
            return None
        list_len = 0
        tmp_node = head
        while tmp_node.next:
            list_len += 1
            tmp_node = tmp_node.next
        list_len += 1

        tmp_node = head
        pre_node = None
        index = 0
        while index != list_len - n:
            index += 1
            pre_node = tmp_node
            tmp_node = tmp_node.next
        if tmp_node == head:
            head = tmp_node.next
        else:
            pre_node.next = tmp_node.next
        return head


import time

x = time.time()

res = Solution().fourSum([1, 0, -1, 0, -2, 2], 0)
print(res)
y = time.time()
print(y - x)
