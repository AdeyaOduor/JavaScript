// Use the every Method to Check that Every Element in an Array Meets a Criteria
function checkPositive(arr) {
  
  return arr.every(function(value) {
    return value > 0;
  });
  
}
checkPositive([1, 2, 3, -4, 5]);
