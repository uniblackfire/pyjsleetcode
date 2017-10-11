# Given a digit string, return all possible letter combinations that the number could represent.

# A mapping of digit to letters (just like on the telephone buttons) is given below.
#
# Input:Digit string "23"
# Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
# Note:
# Although the above answer is in lexicographical order, your answer could be in any order you want.
# class Node():
#     def __init__(self, parent, value):
#         self.parent = parent
#         self.value = value
#
#     def has_parent(self):
#         return self.parent is not None
#
#
# class Solution(object):
#     @staticmethod
#     def get_children(ori_data, layer_order, parent_node, output_children):
#         if layer_order == len(ori_data) - 1:
#             for value in ori_data[layer_order]:
#                 new_node = Node(parent_node, value)
#                 output_children.append(new_node)
#         else:
#             for value in ori_data[layer_order]:
#                 new_node = Node(parent_node, value)
#                 Solution.get_children(ori_data, layer_order + 1, new_node, output_children)
#
#     @staticmethod
#     # convert children_list to human-readable list
#     def convert_children_list(children):
#         output_list = []
#         for child in children:
#             tmp = child
#             to_append = []
#             while tmp.has_parent():
#                 to_append.append(tmp.value)
#                 tmp = tmp.parent
#             to_append.reverse()
#             output_list.append(to_append)
#         return output_list
#
#     @staticmethod
#     def char_list_to_string_list(char_list):
#         string_list = []
#         for item in char_list:
#             string_list.append(''.join(item))
#         return string_list
#
#     @staticmethod
#     def get_combination(data):  # main func
#         # store all children
#         children_list = []
#         Solution.get_children(data, 0, Node(None, ''), children_list)
#         return Solution.char_list_to_string_list(Solution.convert_children_list(children_list))
#
#     def letterCombinations(self, digits):
#         """
#         :type digits: str
#         :rtype: List[str]
#         """
#         if len(digits.strip()) == 0:
#             return list('')
#         keybord_dict = {'2': 'abc', '3': 'def',
#                         '4': 'ghi', '5': 'jkl', '6': 'mno',
#                         '7': 'pqrs', '8': 'tuv', '9': 'wxyz', }
#         data = list()
#         for digit in digits:
#             data.append(list(keybord_dict[digit]))
#         return Solution.get_combination(data)
class Solution(object):
    def letterCombinations(self, digits):
        """
        :type digits: str
        :rtype: List[str]
        """

        if not len(digits):
            return []

        phones = {"1": "", "2": "abc", "3": "def",
                  "4": "ghi", "5": "jkl", "6": "mno",
                  "7": "pqrs", "8": "tuv", "9": "wxyz"}

        results = list()
        results.append("")

        if not digits.isdigit():
            return results

        for digit in digits:
            if digit == "1":
                continue
            word = phones[digit]
            temp = []
            for alphabet in word:
                for result in results:
                    temp.append(result + alphabet)

            results = temp

        return results
#############
# class Solution(object):
#     def letterCombinations(self, digits):
#         """
#         :type digits: str
#         :rtype: List[str]
#         """
#         if not digits:
#             return []
#         phone_dict = {"1": None, "2": ["a", "b", "c"], "3": ["d", "e", "f"],
#                       "4": ["g", "h", "i"], "5": ["j", "k", "l"], "6": ["m", "n", "o"],
#                       "7": ["p", "q", "r", "s"], "8": ["t", "u", "v"], "9": ["w", "x", "y", "z"]}
#
#         def dfs(query_dict, string, index, path, res):
#             if index == len(string):
#                 res.append(path)
#                 return
#             for i in query_dict[string[index]]:
#                 dfs(query_dict, string, index + 1, path + i, res)
#
#         result = []
#         dfs(phone_dict, digits, 0, "", result)
#         return result


import time

x = time.time()
print(Solution().letterCombinations("23"))

y = time.time()
print(y - x)
