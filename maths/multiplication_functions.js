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
