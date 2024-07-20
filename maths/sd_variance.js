//program to get the standard deviation of an array of numbers.
const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};

console.log(standardDeviation([10, 2, 38, 23, 38, 23, 21])); // 13.284434142114991
console.log(standardDeviation([10, 2, 38, 23, 38, 23, 21], true)); // 12.29899614287479
--------------------------------------------------------------------------------------------
// Suppose we have a dataset of product weights
const productWeights = [
  123.45, 124.12, 122.98, 123.87, 124.05,
  123.76, 124.01, 123.92, 123.84, 123.91,
  // 90 more product weights...
];

// Calculate the standard deviation of the product weights
const standardDev = standardDeviation(productWeights);

console.log('Standard deviation of product weights:', standardDev.toFixed(2));
// Output: Standard deviation of product weights: 0.45

function standardDeviation(arr, usePopulation = false) {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
}
/**/
-------------------------------------------------------------------------------------------------------------------
//program to get the variance of an array of numbers.
  
  function calculateVariance(arr) {
  // Calculate the mean of the array
  const mean = arr.reduce((sum, val) => sum + val, 0) / arr.length;

  // Calculate the squared differences from the mean
  const squaredDifferences = arr.map(val => Math.pow(val - mean, 2));

  // Calculate the variance
  const variance = squaredDifferences.reduce((sum, val) => sum + val, 0) / arr.length;

  return variance;
}

console.log(calculateVariance([10, 2, 38, 23, 38, 23, 21])); // 151.26530612244895
// console.log(calculateVariance([10, 2, 38, 23, 38, 23, 21], true)); // 151.26530612244895
