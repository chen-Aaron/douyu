var findMedianSortedArrays = function (nums1, nums2) {

    let final = nums1.concat(nums2);

    let num = Math.ceil(final.length / 2);

    for (let i = 0; i < num; i++) {

        let min = final[i];

        let max = final[final.length - i - 1];

    }

};