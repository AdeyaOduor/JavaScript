function sum(a, b){
    return a + b
  }
  function multiply(a, b){
    return a * b
  }
  function division(a, b){
    return a / b
  }

  // return remainder of divisio
  function modulus(a, b){
    return a % b
  }
  function subtraction(a, b){
    return a - b
  }

// convert celcius to farenheight
function convertCtoF(celsius) {
  let fahrenheit = celsius * (9 / 5) + 32;
  return fahrenheit;
}

// Change the inputs below to test your code
convertCtoF(30);

// Sum All Numbers in a Range
function sumAll(arr) {
  let sumBetween = 0;
  for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
    sumBetween += i;
  }
  return sumBetween;
}

sumAll([1, 4]);
