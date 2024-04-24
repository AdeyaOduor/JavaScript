// The every Method to Check that Every Element in an Array Meets a Criteria
function checkPositive(arr) {
  const result = arr.every(function(value) {
    return value > 0;
  });

  console.log(result);
  return result;
}

checkPositive([1, 2, 3, -4, 5]);// The output will be false because the array [1, 2, 3, -4, 5] contains the value -4, which is not greater than 0.

// The some Method to Check that Any Elements in an Array Meet a Criteria
function checkPositive(arr) {
  return arr.some(elem => elem > 0); 
}
checkPositive([1, 2, 3, -4, 5]);
// The output will be true because the array [1, 2, 3, -4, 5] contains values that are greater than 0 (1, 2, 3, and 5).

