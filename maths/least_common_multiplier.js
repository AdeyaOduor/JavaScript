/* Find the smallest common multiple of the provided parameters 
 that can be evenly divided by both, as well as by all sequential 
 numbers in the range between these parameters.*/

function smallestCommons(arr) {
  function gcd(a, b) {
    let d = 0;
    while (a % 2 === 0 && b % 2 === 0) {
      a /= 2;
      b /= 2;
      d++;
    }
    while (a !== b) {
      if (a % 2 === 0) {
        a /= 2;
      } else if (b % 2 === 0) {
        b /= 2;
      } else if (a > b) {
        a = (a - b) / 2;
      } else {
        b = (b - a) / 2;
      }
    }
    let result = a * Math.pow(2, d);
    return result;
  }

  let max = Math.max(...arr);
  let min = Math.min(...arr);

  let newArr = [];
  for (let i = min; i <= max; i++) {
    newArr.push(i);
  }

  return newArr.reduce((acum, item) => {
    acum = (acum * item) / gcd(acum, item);
    return acum;
  });
}

// Call the function with sample inputs and store the results
const results = [
  smallestCommons([1, 5]),
  smallestCommons([5, 1]),
  smallestCommons([2, 10]),
  smallestCommons([1, 13]),
  smallestCommons([23, 18]),
];

// Log the results to the console
console.log(results); // Output [ 60, 60, 2520, 360360, 6056820 ]
