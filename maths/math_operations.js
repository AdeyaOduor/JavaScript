function sum(a, b){
    return a + b
  }
  function multiply(a, b){
    return a * b
  }
  function division(a, b){
    return a / b
  }
  function modulus(a, b){
    return a % b
  }
  function subtraction(a, b){
    return a - b
  }
// Call the functions with sample inputs and log the results to the console
console.log(sum(5, 3)); // Output: 8
console.log(multiply(4, 6)); // Output: 24
console.log(division(10, 2)); // Output: 5
console.log(modulus(7, 3)); // Output: 1 as the remainder of division
console.log(subtraction(9, 4)); // Output: 5

// OR
function multiply(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function modulus(a, b) {
  return a % b;
}

function subtraction(a, b) {
  return a - b;
}

// Call the functions with sample inputs and store the results
const results = [
  sum(2, 3),
  multiply(2, 3),
  division(2, 3),
  modulus(2, 3),
  subtraction(2, 3)
];

// Log the results to the console
console.log(results); // Output [ 5, 6, 0.6666666666666666, 2, -1 ]
// --------------------------------------------------------------------------------------------------------------------------

// convert celcius to farenheight and vice versa
function convertCtoF(celsius) {
  let fahrenheit = celsius * (9 / 5) + 32;
  return fahrenheit;
}

console.log(convertCtoF(30)); // Change the inputs below to test your code, Output is 86

// OR

function fahrenheitToCelsius(fahrenheit) {
  const celsius = (fahrenheit - 32) * (5 / 9);
  return celsius;
}

// Example usage
const fahrenheit = 88;
const celsius = fahrenheitToCelsius(fahrenheit);
console.log(`${fahrenheit} degrees Fahrenheit is equal to ${celsius.toFixed(2)} degrees Celsius.`); // Output is 31.11
// -----------------------------------------------------------------------------------------------------------------------------

// Sum All Numbers in a Range
function sumAll(arr) {
  let sumBetween = 0;
  for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
    sumBetween += i;
  }
  return sumBetween;
}

console.log(sumAll([1, 4])); // Output is 10

/*
The sumAll function you provided has a real-world application in various scenarios where you need to calculate the sum of all integers 
between a given range of numbers. Here are some examples of how this function could be used:

    Calculating Sums in Financial and Accounting Applications:
        Calculating the total interest earned on a savings account over a given period, where the interest rate and the starting and ending 
        balances are known.
        Calculating the total sales for a product or service over a specific date range, where the daily or monthly sales figures are recorded.
        Calculating the total expenses for a project or department over a fiscal year, where the expenses are tracked on a monthly or quarterly basis.

    Analyzing Data in Scientific and Engineering Applications:
        Calculating the total energy consumption or production over a given time period in a renewable energy system, where the hourly or daily 
        power generation/consumption data is available.
        Calculating the total distance traveled by a vehicle or a person over a specific route, where the position data is recorded at regular 
        intervals.
        Calculating the total rainfall or snowfall over a season or a year, where the daily or weekly precipitation data is collected.

    Implementing Algorithms and Data Structures:
        Calculating the sum of a range of numbers in a number-theoretic algorithm, such as the Gaussian sum formula or the sum of an arithmetic 
        sequence.
        Implementing a feature in a data structure, such as a range query in a segment tree or a binary indexed tree, where the sum of a range of 
        elements needs to be computed efficiently.
        Solving mathematical problems that involve the sum of a range of integers, such as finding the sum of the first n natural numbers or the 
        sum of the squares of the first n integers.
*/


//Example 1
const dailySales = [
  100, 120, 150, 80, 90, 110, 130,
  140, 160, 170, 180, 190, 200, 210,
  220, 230, 240, 250, 260, 270, 280,
  290, 300, 310, 320, 330, 340, 350, 360, 370
];

function sumAll(arr) {
  let sumBetween = 0;
  for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
    sumBetween += i;
  }
  return sumBetween;
}

// Calculate total sales per week
const weeklySales = [];
for (let i = 0; i < dailySales.length; i += 7) {
  weeklySales.push(sumAll(dailySales.slice(i, i + 7)));
}

console.log("Weekly Sales:");
weeklySales.forEach((sale, index) => {
  console.log(`Week ${index + 1}: $${sale}`);
});

// Calculate total sales for the entire period
const totalSales = sumAll(dailySales);
console.log(`\nTotal Sales: $${totalSales}`);
/*
Weekly Sales:
Week 1: $8165
Week 2: $12425
Week 3: $15250
Week 4: $19520
Week 5: $4015
Total Sales: $65475*/


// Example 2
function sumAll(arr) {
  let sumBetween = 0;
  for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
    sumBetween += i;
  }
  return sumBetween;
}

// Sample hourly power generation data (in kWh)
const dailyPowerGeneration = [
  // Day 1
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
  55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0,
  // Day 2
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
  60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5,
  // Day 3
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
  55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0,
  // Day 4
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
  60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5,
  // Day 5
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60
];

// Calculate the total energy production over 5 days
const totalEnergyProduction = sumAll(dailyPowerGeneration);

console.log(`Total energy production over 5 days: ${totalEnergyProduction} kWh`); // Total energy production over 5 days: 1830 kWh

// ------------------------------------------------------------------------------------------------------------------------------------------

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
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

function sumDigPow(a, b) {
  // Initialize an empty array to store the result
  l = [];

  // Iterate through the range from a to b
  for (i = a; i <= b; i++) {
    // Convert the current number i to a string
    s = i + "";

    // Initialize a variable to store the sum of powered digits
    c = 0;

    // Iterate through the digits of the current number
    for (j = 0; j < s.length; j++) {
      // Calculate the contribution of the current digit
      // by raising it to the power of its position (j+1)
      c += Math.pow(s.charCodeAt(j) - 48, j + 1);
    }

    // Check if the sum of powered digits is equal to the original number
    if (c == i) {
      // If true, add the current number to the result array
      l.push(i);
    }
  }

  // Return the result array
  return l;
}

console.log(sumDigPow(1, 100));

/*
    The function sumDigPow takes two parameters, a and b, which represent the range of numbers to be checked.
    An empty array l is initialized to store the numbers that satisfy the condition.
    The function then iterates through the range from a to b using a for loop.
    For each number i in the range, it is converted to a string s.
    A variable c is initialized to store the sum of the powered digits.
    Another for loop is used to iterate through the digits of the current number i.
    For each digit, the function calculates its contribution by raising it to the power of its position (starting from 1) 
    using the Math.pow() function.
    The contribution of each digit is added to the c variable.
    After the loop, the function checks if the sum of the powered digits (c) is equal to the original number i.
    If the condition is true, the current number i is added to the l array.
    Finally, the function returns the l array containing the numbers that satisfy the condition.

The purpose of this function is to find all the numbers in the given range [a, b] where the sum of the digits raised to their respective positions is 
equal to the original number. These numbers are often referred to as "narcissistic" or "Armstrong" numbers.
For example, if you call sumDigPow(1, 100), the function will return an array containing the numbers [1, 2, 3, 4, 5, 6, 7, 8, 9, 89], as these are the 
only numbers in the range [1, 100] that satisfy the given condition.

The code provided, which finds the numbers where the sum of the digits raised to their respective positions is equal to the original number (known as 
"narcissistic" or "Armstrong" numbers), can be applied in a few real-world scenarios:

    Detecting fraud in financial transactions:
        In the financial industry, credit card numbers and other account identifiers often follow specific patterns or rules.
        The sum of the digits raised to their respective positions can be used as a check to detect potentially fraudulent transactions.
        If the sum of the digits in a credit card number does not match the original number, it could be a sign of a fraudulent transaction, and the 
        system can flag it for further investigation.

    Verifying numerical identifiers:
        Many government-issued IDs, such as national ID numbers, social security numbers, or vehicle registration numbers, follow specific patterns.
        The sum of the digits raised to their respective positions can be used as a way to verify the validity of these numerical identifiers.
        If the sum of the digits in an ID number does not match the original number, it could indicate an invalid or tampered identifier.

    Error detection in data entry:
        When entering numerical data, such as product codes, inventory numbers, or customer IDs, there is a risk of human error.
        The sum of the digits raised to their respective positions can be used as a check to detect potential data entry errors.
        If the sum of the digits in an entered number does not match the original number, it could indicate a typing mistake or a data entry error, 
        prompting the user to double-check the input.

    Cryptographic applications:
        In certain cryptographic algorithms, the manipulation of numerical values, including the sum of the digits raised to their respective positions, 
        can be used as part of the encryption or decryption process.
        This technique can be employed in secure communication systems, digital signatures, or other cryptographic applications where the integrity of 
        numerical data is crucial.

By incorporating the logic from the provided code, developers can build applications or systems that leverage the concept of "narcissistic" or 
"Armstrong" numbers to enhance data validation, fraud detection, and overall data integrity in various industries and use cases.

*/

// Function to check if a credit card number is valid
function isValidCreditCardNumber(cardNumber) {
  // Remove any non-digit characters from the card number
  cardNumber = cardNumber.replace(/\D/g, '');

  // Check if the card number is between 12 and 19 digits long
  if (cardNumber.length < 12 || cardNumber.length > 19) {
    return false;
  }

  // Calculate the sum of the digits raised to their respective positions
  let sum = 0;
  for (let i = 0; i < cardNumber.length; i++) {
    let digit = parseInt(cardNumber.charAt(i));
    sum += Math.pow(digit, i + 1);
  }

  // Check if the sum matches the original card number
  return sum === parseInt(cardNumber);
}

// Example usage
let validCardNumber = '371449635398431';
let invalidCardNumber = '371449635398430';

console.log(isValidCreditCardNumber(validCardNumber)); // true
console.log(isValidCreditCardNumber(invalidCardNumber)); // false

/*In this example, the isValidCreditCardNumber function takes a credit card number as input and checks if it is a valid "narcissistic" or 
"Armstrong" number. Here's how it works:

    The function first removes any non-digit characters from the input card number using a regular expression.
    It then checks if the card number is between 12 and 19 digits long, as this is a common length range for credit card numbers.
    The function calculates the sum of the digits raised to their respective positions, similar to the code provided earlier.
    Finally, it checks if the calculated sum matches the original card number. If so, the function returns true, indicating a valid card number; 
    otherwise, it returns false.

In a real-world fraud detection system, this function could be integrated into the payment processing pipeline to validate the integrity of credit 
card numbers before authorizing a transaction. 
If the function returns false, the system can flag the transaction as potentially fraudulent and take appropriate actions, such as triggering additional 
verification steps or denying the transaction.

By incorporating this validation technique, the fraud detection system can leverage the properties of "narcissistic" or "Armstrong" numbers to enhance 
the overall security and reliability of the payment processing workflow.*/
// --------------------------------------------------------------------------------------------------------------------------------------------------------

function findOdd(arr) {
    return arr.find((item, index) => arr.filter(el => el == item).length % 2)
  };

// Sample customer visit data
const customerVisits = [10, 8, 12, 6, 15, 8, 12, 6, 15, 6];

// Find the customer segment with an odd number of visits
const oddVisits = findOdd(customerVisits);

console.log("Customers with an odd number of visits:", oddVisits); // 10

/*
By identifying the customer segment with an odd number of visits, you can then further investigate this group to understand why they might 
be visiting the store in a different pattern compared to the rest of the customers. This could lead to valuable insights, such as:

    The odd-visit customers might be a niche or underserved segment that the business could target with specific marketing campaigns or product 
    offerings.
    The odd-visit customers might have unique needs or preferences that the business could address to improve their overall experience and 
    potentially increase their loyalty.
    The odd-visit pattern could be indicative of a specific life event or circumstance that affects this group of customers, which the business
    could learn from to better serve all of its customers.

By leveraging the findOdd function in your data analysis, you can efficiently identify these potentially interesting customer segments and dive 
deeper into understanding their behavior and needs. This type of insight can then be used to inform strategic decision-making and drive business 
growth.*/
// -------------------------------------------------------------------------------------------------------------------------------------------------

// method 2
function odds(values){
 
    return values.filter(values => values % 2 !== 0 );
    }
    
console.log(odds([1, 2, 3, 4, 5, 6, 7, 8, 9])); // [ 1, 3, 5, 7, 9 ]

/*
1. findOdd(arr) function:
The findOdd function uses the find() and filter() methods to find the first element in the array that has an odd number of occurrences. 
This can be useful in the following scenarios:

a. Voting systems: In some voting systems, a single winner is determined by having the majority of votes. If there is a tie, the function 
could be used to find the element (candidate) that has an odd number of votes, which could be considered the winner.

b. Data analysis: In data analysis, you might have a dataset with various categories or groups, and you want to find the category that has 
an odd number of elements. This could be useful for identifying outliers or anomalies in the data.

c. Error detection: Imagine you have a system that generates a sequence of numbers, and you want to detect if there is an error in the sequence. 
The findOdd function could be used to identify the number that has an odd number of occurrences, which could indicate a problem in the data.

2. odds(values) function:
The odds function uses the filter() method to create a new array containing only the odd numbers from the input array. This can be useful in the 
following scenarios:

a. Statistical analysis: In statistical analysis, you might need to perform calculations or operations only on the odd numbers in a dataset, such 
as calculating the mean, median, or variance of the odd numbers.

b. Numerical simulations: In numerical simulations or mathematical modeling, you might need to work with only the odd numbers in a dataset, such 
as when simulating the behavior of a system that involves odd numbers.

c. Cryptography: In cryptography, some algorithms or techniques may require working with odd numbers, and the odds function could be used to extract 
the odd numbers from a dataset for further processing.

d. Optimization problems: In some optimization problems, you might need to work with only the odd numbers in a dataset, such as when trying to find 
the optimal arrangement of objects with odd dimensions.*/


// return the two oldest ages within the array of ages passed in.
function twoOldestAges(ages){
  //return ages.sort((a, b) => a-b).slice(-2)
  return ages.sort((a, b) => b-a).splice(0,2).reverse();
    
}
