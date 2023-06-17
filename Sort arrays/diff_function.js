// implement a difference function which subtracts one list from another and returns the result
function array_diff(a, b) {
  return a.filter(function(x) { return b.indexOf(x) == -1; });
}

/*Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, 
return the symmetric difference of the two arrays.*/
function diffArray(arr1, arr2) {
  return [...diff(arr1, arr2), ...diff(arr2, arr1)];

  function diff(a, b) {
    return a.filter(item => b.indexOf(item) === -1);
  }
}
