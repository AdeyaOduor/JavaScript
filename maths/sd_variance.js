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
];

// Calculate the standard deviation of the product weights
const standardDev = standardDeviation(productWeights);

console.log('Standard deviation of product weights:', standardDev.toFixed(2));
// Standard deviation of product weights: 0.34

function standardDeviation(arr, usePopulation = false) {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
}
/*
In this example, the standardDeviation function is used to calculate the standard deviation of the product weights. 
The result shows that the standard deviation of the product weights is 0.45.

This information can be used in several ways:

    Quality control: The standard deviation can help you understand the variability in the product weights. If the standard 
    deviation is too high, it may indicate quality control issues in the manufacturing process that need to be addressed.

    Compliance with specifications: You can compare the standard deviation to the acceptable weight range specified for the product. 
    If the standard deviation suggests that a significant number of products are outside the acceptable range, it could indicate a need 
    to adjust the manufacturing process.

    Process improvement: By monitoring the standard deviation over time, you can track changes in the variability of product weights and 
    identify opportunities for process improvements to reduce the variability.

    Customer satisfaction: Consistent product weights can contribute to customer satisfaction, as customers expect a certain level of quality 
    and uniformity in the products they purchase. The standard deviation can help you ensure that product quality meets customer expectations.

    Inventory management: The standard deviation can also inform inventory management decisions, as it can help you predict the potential range 
    of product weights and adjust inventory levels accordingly.

By using the standardDeviation function in this real-world quality control scenario, you can gain valuable insights into the manufacturing process 
and make informed decisions to improve product quality, customer satisfaction, and overall business performance.*/
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
