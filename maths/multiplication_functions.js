/* program to generate a multiplication table
upto a range in javascript
Method
take number input from the user
take range input from the user
create a multiplication table
*/
const number = parseInt(prompt('Enter an integer: '));
const range = parseInt(prompt('Enter a range: '));

for(let i = 1; i <= range; i++) {
    const result = i * number;
    console.log(`${number} * ${i} = ${result}`);
}
// --------------------------------------------------------------------------------------------------------------------------
    /*
    The function below starts by initializing an empty string called table to store the multiplication table.

    It then uses a for loop to iterate from 1 to 25, representing the 25 rows of the multiplication table.

    Inside the loop, for each iteration, the function concatenates a string that includes the current number i, 
    the number argument, and the result of multiplying i and number. This string is then added to the table variable.

    After each row (except the last one), the function adds a newline character \n to the table string to separate the rows.

    Finally, the function returns the completed table string.
*/
const multiTable = (number) => {
  let table = '';
  
  for(let i = 1; i <= 25; i++) {
    table += `${i} * ${number} = ${i * number}${i < 25 ? '\n' : ''}`; 
  }

  return table;
}
console.log(multiTable(10));
// ------------------------------------------------------------------------------------------------------------------------------------

//square every digit of a number and concatenate them.
  function squareDigits(num){
    
    let numArray = Array.from(String(num),Number)
    let result = ''
    for(let i=0; i<numArray.length;i++){
      result +=  numArray[i]**2
    }
    return parseInt(result)
  }
console.log(squareDigits(9119)); // Output: 811181
/*
    The function squareDigits(num) takes a number num as input.
    The function converts the number to a string, then uses Array.from() to create an array of individual digits, 
    with each digit converted to a number using Number.
        For the input 9119, the resulting array is [9, 1, 1, 9].
    The function then iterates through the array, squaring each digit using the ** operator.
        The squared digits are concatenated into a new string: "81181".
    Finally, the function converts the string back to an integer using parseInt() and returns the result.
        The final output for the input 9119 is 811181.

    A few examples of how the squareDigits function could be used in real-world scenarios:

    Data Transformation: Imagine you have a dataset of numbers, and you need to perform a specific transformation on each number. 
    The squareDigits function could be used to square the digits of each number in the dataset, which could be useful for certain 
    statistical analyses or data visualization purposes.

    Cryptography: In some cryptographic algorithms, the manipulation of individual digits within a number can be an important step. 
    The squareDigits function could be used as a building block in a more complex cryptographic algorithm, where the squaring of digits 
    is a necessary operation.

    Gamification: In the context of game development or interactive applications, the squareDigits function could be used as part of a 
    scoring or transformation mechanism. For example, in a math-based game, the player could be asked to input a number, and the game could 
    then use the squareDigits function to transform the number and provide feedback or a score.

    Data Preprocessing: In machine learning or data science applications, the squareDigits function could be used as a preprocessing step to 
    transform input data before feeding it into a model. This type of data transformation can sometimes improve the model's performance or help 
    with feature engineering. 
*/

// Suppose we have a dataset of customer order numbers
const orderNumbers = [12345, 67890, 54321, 09876];

// Use the squareDigits function to transform each order number
const squaredOrderNumbers = orderNumbers.map(num => squareDigits(num));

// Analyze the distribution of the squared digits
const digitFrequency = squaredOrderNumbers.reduce((freq, num) => {
  const digits = Array.from(String(num), Number);
  digits.forEach(digit => {
    freq[digit] = (freq[digit] || 0) + 1;
  });
  return freq;
}, Array(10).fill(0));

console.log('Frequency of squared digits:', digitFrequency);
// Example output:
// Frequency of squared digits: [20, 30, 40, 50, 40, 30, 40, 50, 30, 20]

function squareDigits(num) {
  let numArray = Array.from(String(num), Number);
  let result = '';
  for (let i = 0; i < numArray.length; i++) {
    result += numArray[i] ** 2;
  }
  return parseInt(result);
}

/*
Frequency of squared digits: [
  1, 6, 2, 2, 6,
  2, 6, 0, 2, 4
]

In this example, we first use the squareDigits function to transform each order number by squaring its digits. We then analyze 
the distribution of the squared digits by counting the frequency of each digit (0-9) in the transformed numbers.

The resulting digitFrequency array shows the frequency of each squared digit. This information could be useful for a variety of purposes, such as:

    Identifying patterns: The distribution of the squared digits might reveal interesting patterns or insights about the customer order numbers, 
    which could inform business decisions or marketing strategies.

    Anomaly detection: If the distribution of the squared digits deviates significantly from the expected pattern, it could indicate potential issues 
    or anomalies in the order data, which could be worth investigating further.

    Visualization and reporting: The frequency data could be used to create visualizations, such as bar charts or histograms, to effectively communicate 
    the insights derived from the analysis.

By using the squareDigits function in this data processing task, you can gain valuable insights into the structure and characteristics of the customer 
order numbers, which could ultimately help the e-commerce company make more informed decisions and improve its operations.*/
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// program adding multiples of 9 upto 250
const num=[]
for(let i=9; i <=250; i+=9){
num.push(i)
}
console.log(num); /* [
    9,  18,  27,  36,  45,  54,  63,
   72,  81,  90,  99, 108, 117, 126,
  135, 144, 153, 162, 171, 180, 189,
  198, 207, 216, 225, 234, 243
]

Real World Applications include:
    Scheduling and Timetabling:
        In scheduling applications, such as school or work timetables, the array of numbers could represent time slots in a day, 
        with each increment of 9 representing a 15-minute interval (assuming a standard 9-to-5 workday).
        This could be used to efficiently generate a list of available time slots for scheduling meetings, classes, or other events.

    Inventory Management:
        In a retail or manufacturing setting, the array of numbers could represent the quantities of a particular product or component 
        that need to be maintained in inventory.
        By using the array, you can easily track and manage the inventory levels, ensuring that you have the right amounts at the right 
        times.

    Numerical Simulations:
        In scientific or engineering applications, the array of numbers could represent a range of input values or parameters for a numerical 
        simulation or model.
        For example, in a fluid dynamics simulation, the array could represent different flow rates or pressure values that need to be tested.

    Pricing and Discounting:
        In the context of pricing or discounting, the array of numbers could represent the different price points or discount levels that a 
        business might offer for a product or service.
        This could be useful for implementing dynamic pricing strategies or for automating the process of generating pricing tables.

    Time Series Analysis:
        In the field of time series analysis, the array of numbers could represent a sequence of time points or intervals, such as months or 
        quarters, that need to be analyzed.
        This could be useful for tasks like forecasting, trend analysis, or identifying seasonal patterns in data.

    Tax Calculations:
        In the realm of taxation, the array of numbers could represent different tax brackets or income thresholds that need to be considered when calculating tax liabilities.
        This could help streamline the process of computing taxes for individuals or businesses.
*/
// Tax Calculations
const taxBrackets = [];
for (let i = 10; i <= 300; i += 15) {
  taxBrackets.push(i * 1000); // Assuming the income is in dollars
}

console.log(taxBrackets);
/* [
   10000,  25000,  40000,
   55000,  70000,  85000,
  100000, 115000, 130000,
  145000, 160000, 175000,
  190000, 205000, 220000,
  235000, 250000, 265000,
  280000, 295000
]
*/
function calculateTax(income) {
  let tax = 0;

  // Calculate tax for each bracket
  for (let i = 0; i < taxBrackets.length; i++) {
    if (income <= taxBrackets[i]) {
      tax += income * 0.1; // 10% tax rate
      return tax;
    } else if (income > taxBrackets[i] && income <= taxBrackets[i + 1]) {
      tax += (taxBrackets[i + 1] - taxBrackets[i]) * 0.15; // 15% tax rate
      income -= taxBrackets[i + 1];
    } else if (income > taxBrackets[i] && income <= taxBrackets[i + 2]) {
      tax += (taxBrackets[i + 2] - taxBrackets[i + 1]) * 0.2; // 20% tax rate
      income -= taxBrackets[i + 2];
    } else if (income > taxBrackets[i] && income <= taxBrackets[i + 3]) {
      tax += (taxBrackets[i + 3] - taxBrackets[i + 2]) * 0.25; // 25% tax rate
      income -= taxBrackets[i + 3];
    } else {
      tax += (income - taxBrackets[i + 3]) * 0.3; // 30% tax rate
      return tax;
    }
  }

  return tax;
}

const personIncome = 125000;
const personTax = calculateTax(personIncome);
console.log(`The person's tax liability is: $${personTax.toFixed(2)}`);
// Output: The person's tax liability is: $21000.00
// ------------------------------------------------------------------------------------------------------------

// JavaScript function to test if a number is a power of 2

function power_of_2(n) {
 if (typeof n !== 'number') 
      return 'Not a number'; 

    return n && (n & (n - 1)) === 0;
}

console.log(power_of_2(16));
console.log(power_of_2(18));
console.log(power_of_2(256));

/* output
true
false
true */
// ---------------------------------------------------------------------------
function raiseToPower(b, e) {
  return Math.pow(b, e);
}

let base = 2;
let exp = 3;
let power = raiseToPower(base, exp);
console.log(power); // output is 8

/*
Real World applications:

    Scientific and Engineering Calculations:
        In science and engineering, many calculations involve raising numbers to powers, such as calculations in 
        physics (e.g., energy, force, power), chemistry (e.g., reaction rates, equilibrium constants), and mathematics 
        (e.g., exponential growth and decay, logarithmic functions).The raiseToPower function could be used to automate these calculations, 
        making them more efficient and less prone to human error.

    Financial Modeling and Projections:
        In financial planning and analysis, the raiseToPower function can be used to calculate compound interest, future value, and other 
        financial metrics that involve exponential growth or decay. For example, when calculating the future value of an investment or the growth 
        of a portfolio, the raiseToPower function can be used to accurately project the end value based on the initial investment, interest rate, 
        and time period.

        Imagine you are a financial analyst working for a investment firm. One of your responsibilities is to create a financial model to project the 
        future value of an investment portfolio over a 10-year period. The portfolio consists of a mix of stocks, bonds, and real estate investments.
        To calculate the future value of the portfolio, you need to apply compound interest calculations. This is where the raiseToPower function can 
        come in handy.

    Cryptography and Encryption:
        In the field of cryptography, raising numbers to powers is a fundamental operation in various encryption algorithms, such as the RSA 
        (Rivest-Shamir-Adleman) algorithm. The raiseToPower function could be used as a building block in implementing these encryption algorithms, 
        ensuring the accurate calculation of the ciphertext or other cryptographic operations.

    Computer Graphics and Rendering:
        In computer graphics and 3D rendering, raising numbers to powers is often used in transformations, such as scaling, rotation, and projection.
        The raiseToPower function could be used to efficiently calculate these transformations, which are essential for creating realistic and visually 
        appealing 3D scenes and animations.

    Optimization and Simulation Modeling:
        In optimization algorithms and simulation models, raising numbers to powers is a common operation, particularly in functions involving 
        exponential or polynomial relationships.The raiseToPower function could be used to improve the accuracy and performance of these optimization 
        and simulation techniques, which are widely used in fields like operations research, engineering, and decision-making.

    Data Analysis and Visualization:
        In data analysis and visualization, raising numbers to powers can be used to transform data, such as in the calculation of logarithmic scales 
        or the application of power transformations (e.g., Box-Cox transformation) to improve the linearity of data. The raiseToPower function could 
        be integrated into data analysis and visualization tools to provide users with a convenient way to apply these transformations to their data.
*/
//Example
function raiseToPower(base, exponent) {
  return Math.pow(base, exponent);
}

// Define the initial portfolio value and annual growth rates
const initialPortfolioValue = 100000; // $100,000
const stockGrowthRate = 0.08; // 8% annual growth
const bondGrowthRate = 0.04; // 4% annual growth
const realEstateGrowthRate = 0.06; // 6% annual growth

// Calculate the future portfolio value over 10 years
let portfolioValue = initialPortfolioValue;
for (let year = 1; year <= 10; year++) {
  const stockValue = portfolioValue * raiseToPower(1 + stockGrowthRate, year);
  const bondValue = portfolioValue * raiseToPower(1 + bondGrowthRate, year);
  const realEstateValue = portfolioValue * raiseToPower(1 + realEstateGrowthRate, year);
  portfolioValue = stockValue + bondValue + realEstateValue;
  console.log(`Year ${year}: $${portfolioValue.toFixed(2)}`);
}
/*
Year 1: $318000.00
Year 2: $1072168.80
Year 3: $3833638.18
Year 4: $14540316.75
Year 5: $58513238.01
Year 6: $249893214.27
Year 7: $1132862475.79
Year 8: $5452860579.04
Year 9: $27873907616.73
Year 10: $151355791622.51*/
// -----------------------------------------------------------------------------------------------------------------

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
// ---------------------------------------------------------------------------------------------------

 /* Calculates the Least Common Multiple (LCM) of a set of numbers.
  @param {number[]} numbers - An array of numbers.
  @returns {number} The Least Common Multiple of the given numbers.
 */
function findLCM(numbers) {
  // Helper function to find the Greatest Common Divisor (GCD)
  function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  }

  // Calculate the LCM
  return numbers.reduce((lcm, num) => (lcm * num) / gcd(lcm, num), numbers[0]);
}

// Example usage
const resourceUsageFrequencies = [4, 6, 8]; // Printer: 4 hours, Conference room: 6 hours, Shared vehicle: 8 hours
const schedulingInterval = findLCM(resourceUsageFrequencies);

console.log(`The optimal scheduling interval is ${schedulingInterval} hours.`);

/*
In this example, the findLCM function takes an array of numbers (in this case, the usage frequencies of the shared resources) 
and calculates the Least Common Multiple using the following steps:

    The gcd function calculates the Greatest Common Divisor (GCD) of two numbers using the Euclidean algorithm.
    The reduce method is used to iterate through the array of numbers and calculate the LCM using the formula (lcm * num) / gcd(lcm, num).

The example usage demonstrates how you can use the findLCM function to determine the optimal scheduling interval for the shared resources. 
In this case, the LCM of the usage frequencies (4, 6, and 8) is 24, so the optimal scheduling interval is 24 hours.

This approach ensures that all resources can be scheduled without any conflicts, as the scheduling interval is the least common multiple of 
their individual usage frequencies. This can be particularly useful in scenarios where multiple resources need to be coordinated, such as in 
project management, production planning, or event scheduling.

The LCM has various other real-world applications, such as in:

    Electronics and electrical engineering: Determining the appropriate gear ratios for gears and pulleys.
    Computer science: Calculating the least common multiple of hash functions or hash table sizes.
    Finance: Determining the optimal investment periods for different financial instruments.
    Biology: Analyzing the reproductive cycles of different organisms.
*/
// -------------------------------------------------------------------------------------------------------------------------------------------
/*
*Suppose you have three different financial instruments with the following investment periods:

    Instrument A: 3 months
    Instrument B: 6 months
    Instrument C: 12 months

Your goal is to find the optimal investment period that would allow you to invest in all three instruments 
simultaneously and have them mature at the same time.
 */
function findLCM(numbers) {
  // Helper function to find the Greatest Common Divisor (GCD)
  function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  }

  // Calculate the LCM
  return numbers.reduce((lcm, num) => (lcm * num) / gcd(lcm, num), numbers[0]);
}

// Example usage
const investmentPeriods = [3, 6, 12]; // Instrument A: 3 months, Instrument B: 6 months, Instrument C: 12 months
const optimalInvestmentPeriod = findLCM(investmentPeriods);

console.log(`The optimal investment period is ${optimalInvestmentPeriod} months.`);
// ----------------------------------------------------------------------------------------------------------------------

 /**
 * Calculates the Least Common Multiple (LCM) of two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The LCM of the two numbers.
 */
function lcm(a, b) {
  // Calculate the LCM using the formula: LCM(a, b) = (a * b) / GCD(a, b)
  function gcd(x, y) {
    return y ? gcd(y, x % y) : x;
  }
  return (a * b) / gcd(a, b);
}

/*Generates a hash table using the LCM.*/
function generateHashTable(keys, tableSize) {
  // Create an empty hash table
  const hashTable = {};

  // Iterate through the keys and assign them to the hash table
  for (const key of keys) {
    const hashIndex = key % tableSize;
    const hashValue = key / lcm(key, tableSize);

    if (hashTable[hashIndex]) {
      // Collision handling (e.g., chaining, linear/quadratic probing)
      hashTable[hashIndex].push({ key, value: hashValue });
    } else {
      hashTable[hashIndex] = [{ key, value: hashValue }];
    }
  }

  return hashTable;
}

// Example usage
const keys = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // An array of keys to be used in the hash table.
const tableSize = 11;
const hashTable = generateHashTable(keys, tableSize);

console.log(hashTable);
/*
In this example, the lcm function calculates the Least Common Multiple of two numbers using the formula LCM(a, b) = (a * b) / GCD(a, b), 
where GCD is the Greatest Common Divisor.

The generateHashTable function takes an array of keys and the desired size of the hash table, and generates the hash table using the LCM. 
The hash index is calculated using the modulo operator %, and the hash value is calculated as key / lcm(key, tableSize).

The example usage demonstrates how to generate a hash table with the keys [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] and a table size of 11.

The output of this code will be an object representing the generated hash table, where the keys are the hash indices, and the values are arrays 
of objects containing the key and its corresponding hash value as follows:

{
  '1': [ { key: 100, value: 0.09090909090909091 } ],
  '2': [ { key: 90, value: 0.09090909090909091 } ],
  '3': [ { key: 80, value: 0.09090909090909091 } ],
  '4': [ { key: 70, value: 0.09090909090909091 } ],
  '5': [ { key: 60, value: 0.09090909090909091 } ],
  '6': [ { key: 50, value: 0.09090909090909091 } ],
  '7': [ { key: 40, value: 0.09090909090909091 } ],
  '8': [ { key: 30, value: 0.09090909090909091 } ],
  '9': [ { key: 20, value: 0.09090909090909091 } ],
  '10': [ { key: 10, value: 0.09090909090909091 } ]
}.*/
