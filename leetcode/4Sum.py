# Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.

# Note:
# Elements in a quadruplet (a,b,c,d) must be in non-descending order. (ie, a ≤ b ≤ c ≤ d)
# The solution set must not contain duplicate quadruplets.
#     For example, given array S = {1 0 -1 0 -2 2}, and target = 0.
#
#     A solution set is:
#     (-1,  0, 0, 1)
#     (-2, -1, 1, 2)
#     (-2,  0, 0, 2)
# class Solution:
#     # @return a list of lists of length 4, [[val1,val2,val3,val4]]
#     def fourSum(self, num, target):
#         num.sort()
#         def ksum(num, k, target):
#             i = 0
#             result = set()
#             if k == 2:
#                 j = len(num) - 1
#                 while i < j:
#                     if num[i] + num[j] == target:
#                         result.add((num[i], num[j]))
#                         i += 1
#                     elif num[i] + num[j] > target:
#                         j -= 1
#                     else:
#                         i += 1
#             else:
#                 while i < len(num) - k + 1:
#                     newtarget = target - num[i]
#                     subresult = ksum(num[i+1:], k - 1, newtarget)
#                     if subresult:
#                         result = result | set( (num[i],) + nr for nr in subresult)
#                     i += 1
#
#             return result
#
#         return [list(t) for t in ksum(num, 4, target)]

class Solution(object):
    def fourSum(self, num, target):
        num.sort()

        def ksum(num, k, target):
            i = 0
            if k == 2:
                j = len(num) - 1
                while i < j:
                    if num[i] + num[j] == target:
                        yield (num[i], num[j])
                        i += 1
                    elif num[i] + num[j] > target:
                        j -= 1
                    else:
                        i += 1
            else:
                while i < len(num) - k + 1:
                    newtarget = target - num[i]
                    for sub in ksum(num[i + 1:], k - 1, newtarget):
                        yield (num[i],) + sub
                    i += 1

        return [list(t) for t in set(ksum(num, 4, target))]
# def threeSum(self, nums):
#     """
#     :type nums: List[int]
#     :rtype: List[List[int]]
#     """
#     sum_3 = 0
#     nums.sort()
#     l = len(nums)
#     result = []
#     for i in range(l-2):
#         first = nums[i]
#         if (i > 0) and (nums[i-1] == first):
#             continue
#         left = i + 1
#         right = l - 1
#         sum_2 = sum_3 - first
#         while(left < right):
#             current_sum = nums[left] + nums[right]
#             if (current_sum == sum_2):
#                 result.append([first, nums[left], nums[right]])
#                 left += 1
#                 right -= 1
#                 while (left < right and nums[left-1] == nums[left]):
#                     left += 1
#                 while (left < right and nums[right+1] == nums[right]):
#                     right -= 1
#             elif current_sum > sum_2:
#                 right -= 1
#             else:
#                 left += 1
#     return result
#######################
# class Solution:
#     # @return a list of lists of length 4, [[val1,val2,val3,val4]]
#     def fourSum(self, num, target):
#         num.sort()
#         result = []
#         for i in xrange(len(num)-3):
#             if num[i] > target/4.0:
#                 break
#             if i > 0 and num[i] == num[i-1]:
#                 continue
#             target2 = target - num[i]
#             for j in xrange(i+1, len(num)-2):
#                 if num[j] > target2/3.0:
#                     break
#                 if j > i+1 and num[j] == num[j-1]:
#                     continue
#                 k = j + 1
#                 l = len(num) - 1
#                 target3 = target2 - num[j]
#                 # we should use continue not break
#                 # because target3 changes as j changes
#                 if num[k] > target3/2.0:
#                     continue
#                 if num[l] < target3/2.0:
#                     continue
#                 while k < l:
#                     sum_value = num[k] + num[l]
#                     if sum_value == target3:
#                         result.append([num[i], num[j], num[k], num[l]])
#                         kk = num[k]
#                         k += 1
#                         while k<l and num[k] == kk:
#                             k += 1
#
#                         ll = num[l]
#                         l -= 1
#                         while k<l and num[l] == ll:
#                             l -= 1
#                     elif sum_value < target3:
#                         k += 1
#                     else:
#                         l -= 1
#         return result
################
import time

x = time.time()

res = Solution().fourSum([1, 0, -1, 0, -2, 2], 0)
print(res)
y = time.time()
print(y - x)



#
# int comp(const void* p, const void* q){
#     return (*(int*) p - *(int*) q);
# }
#
# int** fourSum(int* nums, int numsSize, int target, int* returnSize) {
#     if(nums ==NULL) return 0;
#     if(numsSize <4) return 0;
#     int **Ans = (int**)malloc(200*sizeof(int*));
#     qsort(nums,numsSize,sizeof(int),comp);
#     int a,b,c,d,count=0;;
#     for(a=0; a < numsSize-3;a++){
#         // check [a,x,x,x] mininum
#         if(nums[a]+nums[a+1]+nums[a+2]+nums[a+3]>target)
#             break;
#         // check [a,x,x,x] maxinum
#         if(nums[a]+nums[numsSize-3]+nums[numsSize-2]+nums[numsSize-1]<target)
#             continue;
#         for(b=a+1;b<numsSize-2;b++){
#             // check [a,b,x,x] mininu
#             if(nums[a]+nums[b]+nums[b+1]+nums[b+2]>target)
#                 break;
#             // check [a,b,x,x] maxinum
#             if(nums[a]+nums[b]+nums[numsSize-2]+nums[numsSize-1]<target)
#                 continue;
#             for(c=b+1,d = (numsSize-1);c<d;){
#                 if(nums[a]+nums[b]+nums[c]+nums[d]>target){
#                     d--;
#                 }
#                 else if(nums[a]+nums[b]+nums[c]+nums[d]<target){
#                     c++;
#                 }else{
#                     Ans[count] = (int*)malloc(4*sizeof(int));
#                     Ans[count][0]=nums[a];
#                     Ans[count][1]=nums[b];
#                     Ans[count][2]=nums[c];
#                     Ans[count][3]=nums[d];
#                     while(c<d && Ans[count][2]==nums[c]) c++;
#                     while(c<d && Ans[count][3]==nums[d]) d--;
#                     count++;
#                     if(count % 200 == 0)
#                         Ans = (int**)realloc(Ans,sizeof(int*)*(count+200));
#                 }
#             }
#             while(b<numsSize-1 && nums[b+1] == nums[b]) b++;
#         }
#         while(a<numsSize-1 && nums[a+1] == nums[a]) a++;
#     }
#     *returnSize = count;
#     return (int**)realloc(Ans,sizeof(int*)*count);
# }