// The every Method to Check that Every Element in an Array Meets a Criteria
function checkPositive(arr) {
  const result = arr.every(function(value) {
    return value > 0; // Check if each value is greater than 0
  });

  console.log(result); // Log the result (true or false)
  return result; // Return the result
}

const expenses = [200, 150, -50]; // Example expenses in financial application
if (!checkPositive(expenses)) {
  console.error('All expenses must be positive values.');
}

const quantities = [5, 10, 15]; // Example user input in data validation
if (checkPositive(quantities)) {
  // Proceed with order submission
} else {
  console.log('All quantities must be positive.');
// } True
  
// --------------------------------------------------------------------------------------------------------------------------------------------------
// The some Method to Check that Any Elements in an Array Meet a Criteria
function checkPositive(arr) {
  const result = arr.some(elem => elem > 0); // Check if any element is greater than 0
  
  console.log(result); // Log the result (true or false)
  return result; // Return the result
}

const scores = [0, -2, 5]; // Example user input
if (checkPositive(scores)) {
  // Proceed with further processing
} else {
  console.log('At least one score must be positive.');
}

const transactions = [-100, -50, 0]; // Example transactions
if (checkPositive(transactions)) {
  console.log('There are positive income entries.');
} else {
  console.error('No positive income entries found.');
}

checkPositive([1, 2, 3, -4, 5]);
// The output will be true because the array [1, 2, 3, -4, 5] contains values that are greater than 0 (1, 2, 3, and 5).
