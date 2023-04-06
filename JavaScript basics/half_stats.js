// use-destructuring-assignment-to-pass-an-object-as-a-functions-parameters

const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  average: 35.85
};

const half = ({max, min}) => ((max + min) / 2.0); // use function argument destructurung

console.log(stats); // should be object
console.log(half(stats)); // should be 28.015
