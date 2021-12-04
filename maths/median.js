// Find the middle of the array, use Array.sort() to sort the values. 
// Return the number at the midpoint if length is odd, 
//otherwise the average of the two middle numbers.


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
console.log(median([5, 6, 50, 1, -5]));
console.log(median([1, 2, 3, 4, 5]));