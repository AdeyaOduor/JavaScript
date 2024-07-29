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
// This could be used to prepare data for further processing or analysis, where a flat data structure is required.
const nestedData = [1, [2, [3, 4], 5], [6, [7, 8]]];
const flatData = steamrollArray(nestedData); // flatData = [1, 2, 3, 4, 5, 6, 7, 8]


