// You get an array of numbers, return the sum of all of the positives ones.
function positiveSum(arr) {
    var sum = 0;
    for(var i = 0; i < arr.length; i++) {
      if(arr[i] > 0) {
       sum += arr[i];
     }
    }
   return sum;
   }
// ----------------------------------------------------------------------------------------------------------------------------------------
// method 2
function positiveSum(arr) {
    let b= arr.filter(a => a>=0)
    let c= b.reduce((a,b)=> a+=b, 0)
    return c
    } 
/*
Here are a few examples of how this function could be applied in real-world scenarios:

    Financial Accounting and Budgeting:
        In financial accounting, you might have an array of income and expense values, and you want to quickly calculate the 
        total positive income (i.e., the sum of all positive values) to determine the overall financial health of a business or individual.
        When creating a budget, you can use the positiveSum function to calculate the total expected positive cash flow (e.g., from sales, 
        investments, or other sources of income) to ensure that it covers the expected expenses.

        Imagine you are a financial advisor working with a client who is planning for their retirement. As part of the planning process, 
        you have gathered the client's projected income and expense values for the next 10 years. You want to calculate the client's total positive 
        cash flow during this period to ensure their financial goals are achievable.

    Inventory Management:
        In an inventory management system, you might have an array of stock levels or inventory quantities. The positiveSum function could be used 
        to calculate the total positive inventory, which represents the items that are currently available for sale or distribution.
        This information can be used to assess the overall health of the inventory, identify any stock shortages, and plan for future inventory orders 
        or production.

    Sensor Data Analysis:
        In the context of sensor data analysis (e.g., for environmental monitoring, industrial automation, or IoT applications), you might have an array 
        of sensor readings or measurements. The positiveSum function could be used to calculate the total positive values, which could represent the 
        cumulative amount of a particular substance, energy, or resource detected by the sensors.This information can be used to identify trends, detect 
        anomalies, or trigger alerts based on the overall positive sensor readings.

    Population Statistics:
        When working with population data, you might have an array of values representing the population sizes of different regions or demographic 
        groups. The positiveSum function could be used to calculate the total positive population, which represents the sum of all the non-negative 
        population values.This information can be useful for demographic analysis, urban planning, resource allocation, and other applications that 
        require understanding the overall population dynamics.

    Biological and Medical Data Analysis:
        In the context of biological or medical data, you might have an array of measurements or test results (e.g., blood pressure, heart rate, 
        or enzyme levels). The positiveSum function could be used to calculate the total positive values, which could represent the cumulative or 
        average positive measurements for a patient or a group of patients.
        This information can be used for disease diagnosis, treatment monitoring, or population-level health assessments.
*/
// Example 1
function positiveSum(arr) {
  let b = arr.filter(a => a >= 0);
  let c = b.reduce((a, b) => a += b, 0);
  return c;
}

// Client's projected annual income and expenses (in USD)
const annualIncomeAndExpenses = [
  { year: 2024, income: 75000, expenses: 50000 },
  { year: 2025, income: 80000, expenses: 52000 },
  { year: 2026, income: 85000, expenses: 54000 },
  { year: 2027, income: 90000, expenses: 56000 },
  { year: 2028, income: 95000, expenses: 58000 },
  { year: 2029, income: 100000, expenses: 60000 },
  { year: 2030, income: 105000, expenses: 62000 },
  { year: 2031, income: 110000, expenses: 64000 },
  { year: 2032, income: 115000, expenses: 66000 },
  { year: 2033, income: 120000, expenses: 68000 }
];

// Calculate the total positive cash flow
const totalPositiveCashFlow = positiveSum(
  annualIncomeAndExpenses.map(item => item.income - item.expenses)
);

console.log(`The client's total positive cash flow for the next 10 years is: $${totalPositiveCashFlow}`); // $385000


// --------------------------------------------------------------------------------------------------------------------------

function sum_digits(n) {
  /* Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in 
     this way until a single-digit number is produced. The input will be a non-negative integer.*/
 
if (n < 10) return n;  return digital_root(
    n.toString().split('').reduce((acc, d) => {
      return acc + +d;
    },0));
}

// --------------------------------------------------------------------------------------------------------------------------------

/*A prime number is a whole number greater than 1 with exactly two divisors: 1 and itself. For example, 
2 is a prime number because it is only divisible by 1 and 2. In contrast, 4 is not prime since it is divisible by 1, 2 and 4.*/
function sumPrimes(num) {
  // primes array with 0 and 1 set to false
  var primes = [false, false];
  
  // add every number up to given number to the primes array, and set true until proven false
  for (let i = 2; i <= num; i++) {
    primes[i] = true;
  }

  /* square root of given value is the limit for looping ignore any numbers known to be false, find primes using the Sieve of Eratosthenes
     loop from 2 to limit and check if prime */
  let limit = Math.sqrt(num);
  for (let j = 2; j < num; j++) {
    if (primes[j] === true) {
      for (let k = j * j; k <= num; k += j) {
        primes[k] = false;
      }
    }
  }
  
  // add everything set to true with reduce
  let primesum = primes.reduce((sum, boo, index) => {
    if (boo === true) {
      return sum + index;
    } else {
      return sum;
    }
  });

  return primesum;
}

console.log(sumPrimes(977)); // 73156

/* Above is a Sieve of Eratosthenes algorithm to find the sum of all prime numbers up to a given number. 
This algorithm is a well-known and efficient method for finding prime numbers, and it has several real-world applications. Here are a few examples:

    Cryptography:
        In cryptography, prime numbers are essential for generating secure keys and encryption algorithms.
        The RSA (Rivest-Shamir-Adleman) algorithm, a widely used public-key cryptographic system, relies on the use of large prime numbers.
        The code provided can be used to generate large prime numbers or calculate the sum of primes, which can be useful in the implementation of 
        RSA and other cryptographic algorithms.

    Number Theory and Mathematics:
        Prime numbers have been a subject of fascination in number theory and mathematics for centuries.
        Mathematicians and researchers often study the distribution and properties of prime numbers, and the code provided can be used to explore these 
        concepts.
        For example, the code can be used to generate prime numbers or calculate the sum of primes up to a given limit, which can be useful in various 
        mathematical and analytical tasks.

    Pseudorandom Number Generation:
        Pseudorandom number generators (PRNGs) often use prime numbers as part of their underlying algorithms to generate random numbers.
        The code provided can be used to generate a list of prime numbers, which can then be incorporated into PRNG algorithms to enhance the randomness
        and security of the generated numbers. These random numbers have applications in simulations, gaming, cryptography, and other areas where 
        randomness is important.

    Data Compression and Encoding:
        Prime numbers can be used in data compression and encoding techniques, such as the Huffman coding algorithm.
        The code provided can be used to generate prime numbers, which can then be used as part of these compression and encoding algorithms to optimize
        the storage and transmission of data.

    Optimization and Algorithm Design:
        The Sieve of Eratosthenes algorithm used in the provided code is a fundamental algorithm in computer science and has numerous applications in 
        optimization and algorithm design. Researchers and developers can use the code as a starting point to explore and understand the Sieve of 
        Eratosthenes algorithm, which can then be applied to various optimization problems, such as finding the smallest set of prime factors for a 
        given number or identifying prime numbers in a range.

*/

// Example
function sieveOfEratosthenes(n) {
    // Step 1: Create an array of boolean values
    const primes = Array(n + 1).fill(true); // Assume all numbers are prime
    primes[0] = primes[1] = false; // 0 and 1 are not prime numbers

    // Step 2: Mark non-prime numbers
    for (let p = 2; p * p <= n; p++) {
        if (primes[p]) {
            for (let multiple = p * p; multiple <= n; multiple += p) {
                primes[multiple] = false; // Mark multiples of p as non-prime
            }
        }
    }

    // Step 3: Collecting all prime numbers
    const primeNumbers = [];
    for (let i = 2; i <= n; i++) {
        if (primes[i]) {
            primeNumbers.push(i);
        }
    }

    return primeNumbers;
}

// Example usage
const n = 50; // Find primes up to 50
const primesUpToN = sieveOfEratosthenes(n);
console.log(`Prime numbers up to ${n}:`, primesUpToN);

/*
Prime numbers up to 50: [
   2,  3,  5,  7, 11, 13,
  17, 19, 23, 29, 31, 37,
  41, 43, 47
]

Explanation of the Implementation

    Array Initialization:
        An array primes is initialized with true values. The indices represent the numbers. Thus, primes[i] will be true if i is considered prime.

    Marking Non-Primes:
        The outer loop iterates through each number starting from 2. If primes[p] is still true, it means p is a prime.
        The inner loop marks all multiples of p starting from p * p (since smaller multiples will have already been marked by smaller primes).

    Collecting Primes:
        After marking, the algorithm iterates through the primes array to collect all indices that are still marked as true, indicating they are prime.
*/
