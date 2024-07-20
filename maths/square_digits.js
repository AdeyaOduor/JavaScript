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

In this example, we first use the squareDigits function to transform each order number by squaring its digits. We then analyze the distribution of the squared digits by counting the frequency of each digit (0-9) in the transformed numbers.

The resulting digitFrequency array shows the frequency of each squared digit. This information could be useful for a variety of purposes, such as:

    Identifying patterns: The distribution of the squared digits might reveal interesting patterns or insights about the customer order numbers, which could inform business decisions or marketing strategies.

    Anomaly detection: If the distribution of the squared digits deviates significantly from the expected pattern, it could indicate potential issues or anomalies in the order data, which could be worth investigating further.

    Visualization and reporting: The frequency data could be used to create visualizations, such as bar charts or histograms, to effectively communicate the insights derived from the analysis.

By using the squareDigits function in this data processing task, you can gain valuable insights into the structure and characteristics of the customer order numbers, which could ultimately help the e-commerce company make more informed decisions and improve its operations.*/
