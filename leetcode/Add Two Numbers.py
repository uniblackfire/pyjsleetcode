# You are given two linked lists representing two non-negative numbers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
#
# Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
# Output: 7 -> 0 -> 8

# Definition for singly-linked list.
# class ListNode(object):
# def __init__(self, x):
# self.val = x
# self.next = None

class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution(object):
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """

        def get_list(list_node):
            ret_list = list()
            while list_node.next:
                ret_list.append(list_node.val)
                list_node = list_node.next
            ret_list.append(list_node.val)
            return ret_list

        def convert_list_2_int(input_list):
            return int(''.join(list(map(str, input_list[::-1]))))

        l1_num = convert_list_2_int(get_list(l1))
        l2_num = convert_list_2_int(get_list(l2))

        output_str = str(l1_num + l2_num)[::-1]
        # print(output_str)
        ret_list_node = ListNode(int(output_str[0]))
        last_node = ret_list_node
        for i in range(1, len(output_str)):
            new_node = ListNode(int(output_str[i]))
            last_node.next = new_node
            last_node = new_node

        return ret_list_node


import time

x = time.time()
l1 = ListNode(2)
l1.next = ListNode(4)
l1.next.next = ListNode(3)

l2 = ListNode(5)
l2.next = ListNode(6)
l2.next.next = ListNode(4)
res = Solution().addTwoNumbers(l1, l2)
print(res)

y = time.time()
print(y - x)