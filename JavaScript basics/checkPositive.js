// The every Method to Check that Every Element in an Array Meets a Criteria
function checkPositive(arr) {
  
  return arr.every(function(value) {
    return value > 0;
  });
  
}
checkPositive([1, 2, 3, -4, 5]);

// The some Method to Check that Any Elements in an Array Meet a Criteria
function checkPositive(arr) {
  return arr.some(elem => elem > 0); // The output will be false because the array [1, 2, 3, -4, 5] contains the value -4, which is not greater than 0.
}
checkPositive([1, 2, 3, -4, 5]);
