// Given an array nums, we call (i, j) an important reverse pair if i < j and nums[i] > 2*nums[j].
//
// You need to return the number of important reverse pairs in the given array.
//
// Example1:
//
// Input: [1,3,2,3,1]
// Output: 2
// Example2:
//
// Input: [2,4,3,5,1]
// Output: 3
// Note:
// The length of the given array will not exceed 50,000.
// All the numbers in the input array are in the range of 32-bit integer.


/**
 * @param {number[]} nums
 * @return {number}
 */
function reversePairs(nums) {
    if (!nums || nums.length === 0) return 0;
    return mergeSort(nums, 0, nums.length - 1);
}
//https://leetcode.com/problems/reverse-pairs/solution/
// Algorithm
//
// We define mergesort_and_countmergesort_and_count routine that takes parameters an array say AA and \text{start}start and \text{end}end indices:
//
// If \text{start}start>=\text{end}end this implies that elements can no longer be broken further and hence we return 0
// Otherwise, set \text{mid}=(\text{start} + \text{end})/2mid=(start+end)/2
// Store countcount by recursively calling mergesort_and_countmergesort_and_count on range \text{[start,mid]}[start,mid] and \text{[mid+1,end]}[mid+1,end] and adding the results. This is the divide step on our routine, breaking it into the 2 ranges, and finding the results for each range separately
// Now, we that we have separately calculated the results for ranges \text{[start,mid]}[start,mid] and \text{[mid+1,end]}[mid+1,end], but we still have to count the elements in \text{[start,mid]}[start,mid] that are greater than 2 * elements in \text{[mid+1,end]}[mid+1,end]. Count all such elements and add the result to \text{count}count
// Finally, \text{merge}merge the array from \text{start}start to \text{end}end
// Make 2 array : LL from elements in range \text{[start,mid]}[start,mid] and RR from elements in range \text{R[mid+1,end]}R[mid+1,end]
// Keep pointers ii and jj to LL and RR respectively both initialized to start to the arrays
// Iterate over kk from \text{start}start to \text{end}end and set \text{A[k]}A[k] to the smaller of \text{L[i]}L[i] or \text{R[j]}R[j] and increment the respective index
function mergeSort(nums, l, r) {
    if (l >= r) return 0;
    let mid = l + ~~((r - l) / 2);
    //store result
    let count = mergeSort(nums, l, mid) + mergeSort(nums, mid + 1, r);
    let cache_len = r - l + 1;
    let cache = new Array(cache_len);
    let i = l, t = l, cache_index = 0;
    for (let j = mid + 1; j <= r; j++, cache_index++) {
        // find i which in left half
        while (i <= mid && nums[i] <= 2 * nums[j]) {
            i++;
        }
        while (t <= mid && nums[t] < nums[j]) {
            cache[cache_index++] = nums[t++];
        }
        cache[cache_index] = nums[j];
        console.log(`mid:${mid}-i:${i}`);
        count += mid - i + 1;
    }
    while (t <= mid) {
        cache[cache_index++] = nums[t++];
    }
    console.log(`l:${l}\tcache:${cache}\tnums:${nums}`);
    nums.splice(l, cache_len, ...cache);

    return count;
}


console.log(reversePairs([1,3,2,3,1]));
