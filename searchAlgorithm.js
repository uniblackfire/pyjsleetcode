function binarySearch(arr, key, fromIndex = 0, toIndex = arr.length, cmpFunc = (x, y) => x - y) {
    function rangeCheck(arrayLen, fromIndex, toIndex) {
        if (fromIndex > toIndex)
            throw Error('fromIndex(' + fromIndex +
                ') > toIndex(' + toIndex + ')');
        if (fromIndex < 0)
            throw Error(fromIndex);
        if (toIndex > arrayLen)
            throw Error(toIndex);
    }

    rangeCheck(arr.length, fromIndex, toIndex);

    let low = fromIndex;
    let high = toIndex - 1;

    while (low <= high) {
        let mid = (low + high) >>> 1;
        let cmp = cmpFunc(key, arr[mid]);
        if (cmp > 0) {
            low = mid + 1;
        } else if (cmp < 0) {
            high = mid - 1;
        } else {
            return mid;
        }
    }

    return -low - 1;
}

let arrr = [1, 3, 5, 8, 12, 14, 16, 25, 28, 47, 89, 121, 135, 168, 1134, 4456, 5566];
console.log(binarySearch(arrr, 16,));
