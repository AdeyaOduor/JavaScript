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
// --------------------------------------------------------------------------------------------
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
// --------------------------------------------------------------------------------------------------------------------------------------------------------
/*
The calculateVariance function is a useful tool for computing the variance of a set of numerical data. Variance is a statistical measure that 
quantifies the spread or dispersion of a dataset around its mean. It is a fundamental concept in data analysis and has numerous real-world applications.

Here's an example of how the calculateVariance function could be used in a real-world scenario:

Imagine you work for a financial institution that manages a portfolio of investments. You want to analyze the performance of the individual investments 
in the portfolio to identify the ones with the highest risk, as measured by their variance.

You have a dataset of the daily returns for each investment over the past year. You can use the calculateVariance function to compute the variance of 
the returns for each investment, which can help you make more informed investment decisions.
*/
  
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
// --------------------------------------------------------------------------------------------------
// Suppose we have a dataset of daily returns for an investment
const investmentReturns = [
  0.012, -0.005, 0.008, 0.003, 0.009,
  0.006, -0.002, 0.011, 0.004, 0.007,
  // 355 more daily returns...
];

// Calculate the variance of the investment returns
const investmentVariance = calculateVariance(investmentReturns);

console.log('Variance of investment returns:', investmentVariance.toFixed(4));
// Output: Variance of investment returns: 0.0001

function calculateVariance(arr) {
  // Calculate the mean of the array
  const mean = arr.reduce((sum, val) => sum + val, 0) / arr.length;

  // Calculate the squared differences from the mean
  const squaredDifferences = arr.map(val => Math.pow(val - mean, 2));

  // Calculate the variance
  const variance = squaredDifferences.reduce((sum, val) => sum + val, 0) / arr.length;

  return variance;
}

/*
In this example, the calculateVariance function is used to compute the variance of the daily returns for the investment. 
The result shows that the variance of the investment returns is 0.0001.

This information can be used in several ways:

    Risk assessment: The variance of the investment returns can be used as a measure of the risk associated with the investment. 
    Higher variance generally indicates higher risk, which can be an important factor in investment decisions.

    Portfolio diversification: By calculating the variance of the returns for various investments in your portfolio, you can identify 
    the investments with the highest risk. This can help you diversify your portfolio and reduce the overall risk.

    Performance comparison: You can compare the variance of returns for different investments to evaluate their relative performance 
    and risk profiles. This can inform your investment allocation decisions.

    Trading strategies: Variance and other statistical measures of investment returns can be used to develop trading strategies, such as 
    volatility-based trading or risk-adjusted return optimization.

    Regulatory compliance: Financial institutions may be required to report on the risk characteristics of their investment portfolios, 
    and the variance of returns can be an important metric for regulatory compliance.

By using the calculateVariance function in this real-world investment management scenario, you can gain valuable insights into the risk 
characteristics of your investment portfolio, which can help you make more informed investment decisions and better manage the overall risk 
of your portfolio.*/
