//program to get the standard deviation of an array of numbers.


const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};

console.log(standardDeviation([10, 2, 38, 23, 38, 23, 21]));
console.log(standardDeviation([10, 2, 38, 23, 38, 23, 21], true));