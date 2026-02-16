/*
This factorial function is a recursive implementation that calculates the factorial of a non-negative integer x using an accumulator (runningTotal). 
This approach is often referred to as tail recursion, where the recursive call is the last operation performed in the function.*/ 

function factorial(x, runningTotal = 1 ) {
   return x == 0 ? runningTotal : factorial( x-1, x*runningTotal);
}

console.log(factorial(10)) // output 3628800
// -------------------------------------------------------
// Calculating combinations
function combinations(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}

// Example: Choosing 3 from 10
console.log(combinations(10, 3)); // Output: 120

// Probability Example:
function factorial(x, runningTotal = 1) {
    return x === 0 ? runningTotal : factorial(x - 1, x * runningTotal);
}

function combinations(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}

function binomialProbability(n, k, p) {
    const q = 1 - p; // Probability of failure
    const comb = combinations(n, k);
    return comb * Math.pow(p, k) * Math.pow(q, n - k);
}

const n = 10; // Total flips
const k = 6;  // Desired heads
const p = 0.5; // Probability of heads

const probability = binomialProbability(n, k, p);
console.log(`Probability of getting exactly ${k} heads in ${n} flips: ${probability.toFixed(4)}`);
// Probability of getting exactly 6 heads in 10 flips: 0.2051

// ------------------------------------------------------------------------------------------------------------
// recursive
function factorialize(num) {
  if (num === 0) {
    return 1;
  }
  return num * factorialize(num - 1);
}

console.log(factorialize(5)); // 120

/* Notice at the first line we have the terminal condition, i.e a condition to check the end of the recursion. 
If num == 0, then we return 1, i.e. effectively ending the recursion and informing the stack to propagate this 
value to the upper levels. If we do not have this condition, the recursion would go on until the stack space gets 
consumed, thereby resulting in a Stack Overflow */

/**
 * Calculates the factorial of a given number in permutations.
 * @param {number} n - The number to calculate the factorial for.
 * @returns {number} The factorial of the given number.
 */
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Example usage
const numFriends = 5;
const numPermutations = factorial(numFriends);

console.log(`There are ${numPermutations} possible ways to arrange the ${numFriends} friends in a line.`);
// -----------------------------------------------------------------------------------------------------------------------------
   /*
   factorial and combinations functions together, they can be used to calculate the number of combinations (or binomial coefficients) of choosing k items from a set of n items. 
   This is a common task in combinatorial mathematics and has various applications in fields such as probability, statistics, and computer science.*/ 

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

/**
 * Calculates the number of combinations of k items from a set of n items.
 * @param {number} n - The total number of items.
 * @param {number} k - The number of items to be chosen.
 * @returns {number} The number of combinations.
 */
function combinations(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

// Example usage
const totalFriends = 6;
const committeeSize = 3;

// Calculate the total number of possible combinations
const totalCombinations = combinations(totalFriends, committeeSize);
console.log(`Total number of possible combinations: ${totalCombinations}`);

// Calculate the probability of selecting a specific combination
const specificCombination = [0, 1, 2]; // Selecting friends with indices 0, 1, and 2
const probabilityOfSpecificCombination = 1 / totalCombinations;
console.log(`Probability of selecting the specific combination ${specificCombination}: ${probabilityOfSpecificCombination}`);

// Calculating Combinations:
const totalNumbers = 49;
const numbersToChoose = 6;
const possibleCombinations = combinations(totalNumbers, numbersToChoose);

console.log(`Possible combinations of choosing ${numbersToChoose} from ${totalNumbers}: ${possibleCombinations}`);
// -----------------------------------------------------------------------------------------------------------------------------------------

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factorial Calculator</title>
</head>
<body>
    <h1>Factorial Calculator</h1>
    <input type="number" id="numberInput" placeholder="Enter a number" />
    <button id="calculateButton">Calculate Factorial</button>
    <p id="result"></p>

    <script>
       function factorial(x) {
    if (x < 0) {
        throw new Error('Negative numbers are not allowed.');
    }
    return x === 0 ? 1 : x * factorial(x - 1);
}

document.getElementById('calculateButton').addEventListener('click', () => {
    const number = parseInt(document.getElementById('numberInput').value, 10);
    
    if (isNaN(number) || number < 0) {
        document.getElementById('result').innerText = 'Please enter a non-negative integer.';
    } else {
        const result = factorial(number);
        document.getElementById('result').innerText = `Factorial of ${number} is ${result}.`;
    }
});
    </script>
</body>
</html>
