# Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution(object):
    @staticmethod
    def printlist(mylist):
        tmp = mylist
        while tmp.next:
            print(tmp.val, end=', ')
            tmp = tmp.next
        print(tmp.val)

    def mergeTwoLists(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        # if not l1 and not l2:
        #     return None


        if not l1:
            if l2:
                return l2
            else:
                return None
        if not l2:
            if l1:
                return l1
            else:
                return None

        tmp_list = list()
        while l1.next:
            tmp_list.append(l1.val)
            l1 = l1.next
        tmp_list.append(l1.val)
        while l2.next:
            tmp_list.append(l2.val)
            l2 = l2.next
        tmp_list.append(l2.val)

        ll = sorted(tmp_list)
        # print (ll)
        ret_list = ListNode(ll[0])
        tmp_node_ptr = ret_list
        for val in ll[1:]:
            tmp_node = ListNode(val)
            tmp_node_ptr.next = tmp_node
            tmp_node_ptr = tmp_node_ptr.next
        # Solution.printlist(ret_list)
        return ret_list


import time

x = time.time()
l1 = ListNode(0)
tmp = l1
l2 = ListNode(4)
tmp2 = l2
for i in range(1, 10):
    tmp_node = ListNode(i)
    tmp.next = tmp_node
    tmp = tmp.next

    tmp_node2 = ListNode(i + 4)
    tmp2.next = tmp_node2
    tmp2 = tmp2.next
Solution.printlist(l1)
Solution.printlist(l2)
print('======')
res = Solution().mergeTwoLists(l1, l2)
print(res)
y = time.time()
print(y - x)
