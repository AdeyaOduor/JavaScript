/* Find the middle of the array, use Array.sort() to sort the values. 
 Return the number at the midpoint if length is odd, otherwise the average of the two middle numbers.
 
 */

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
console.log(median([5, 6, 50, 1, -5])); //5
console.log(median([1, 2, 3, 4, 5]));//3

//Example, Suppose we have a dataset of patient lengths of stay (in days)
const patientLOS = [
  2, 4, 1, 3, 5, 2, 4, 3, 1, 6,
  // 990 more patient lengths of stay...
];

// Calculate the median length of stay
const medianLOS = median(patientLOS);

console.log('Median length of stay:', medianLOS);
// Output: Median length of stay: 3

function median(arr) {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}
