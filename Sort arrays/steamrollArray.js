// Flatten a nested array, accounting for varying levels of nesting.
function steamrollArray(arr) {
  let flattened = [];

  arr.map(val => {
    if (!Array.isArray(val)) {
      flattened.push(val);
    }
    else {
      flattened.push(...steamrollArray(val));
    }
  })

  return flattened;
}
