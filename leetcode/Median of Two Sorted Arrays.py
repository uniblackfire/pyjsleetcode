# There are two sorted arrays nums1 and nums2 of size m and n respectively. Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).


class Solution(object):
    # firstly, i fogot to convert int to float, second passed
    def findMedianSortedArrays(self, nums1, nums2):
        lengthA, lengthB = len(nums1), len(nums2)
        total = (lengthA + lengthB)
        if total & 0x01:
            return self.binarysearch(nums1, lengthA, nums2, lengthB, total // 2 + 1)
        else:
            return float(
                self.binarysearch(nums1, lengthA, nums2, lengthB, total // 2)
                + self.binarysearch(nums1, lengthA, nums2, lengthB, total // 2 + 1)
            ) / 2

    def binarysearch(self, nums1, lengthA, nums2, lengthB, target):
        if lengthA > lengthB:
            return self.binarysearch(nums2, lengthB, nums1, lengthA, target)
        if lengthA == 0:
            return nums2[target - 1]
        if target == 1:
            return min(nums1[0], nums2[0])
        lena = min(target // 2, lengthA)
        lenb = target - lena
        if nums1[lena - 1] > nums2[lenb - 1]:
            return self.binarysearch(nums1, lengthA, nums2[lenb:], lengthB - lenb, target - lenb)
        elif nums1[lena - 1] < nums2[lenb - 1]:
            return self.binarysearch(nums1[lena:], lengthA - lena, nums2, lengthB, target - lena)
        else:
            return nums1[lena - 1]


import time

x = time.time()
res = Solution().findMedianSortedArrays([1, 2, 3], [2, 3, 34])
print(res)
y = time.time()
print(y - x)
