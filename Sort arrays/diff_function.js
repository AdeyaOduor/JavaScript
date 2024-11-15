// implement a difference function which subtracts one list from another and returns the result
function array_diff(a, b) {
  return a.filter(function(x) { return b.indexOf(x) == -1; });
}

console.log(array_diff([1, 2], [1]));  // Output: [2]
console.log(array_diff([3, 4], [3]));  // Output: [4]
// -----------------------------------------------------------------------------------------------------------------------------------
/*Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, 
return the symmetric difference of the two arrays.*/
function diffArray(arr1, arr2) {
  return [...diff(arr1, arr2), ...diff(arr2, arr1)];

  function diff(a, b) {
    return a.filter(item => b.indexOf(item) === -1);
  }
}
const array1 = [1, 2, 3, 5];
const array2 = [1, 2, 3, 4, 6];
console.log(diffArray(array1, array2));
// Output: [4, 5, 6] in data comparison and synchronization
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log(diffArray(array1, array2));
// Output: [1, 2, 6, 7] in filtering and transformation

console.log(array1.filter(item => array2.includes(item)));
// Output: [3, 4, 5] in filtering and transformation
// --------------------------------------------------------------------------------------------------------------------------------------
/*Remove all elements from the initial array that are of the same value as these arguments. 
    Using spread operator to retrieve the arguments.
    Return the filtered array, using includes().
*/
function destroyer(arr, ...valsToRemove) {
  return arr.filter(elem => !valsToRemove.includes(elem));
}
// ---------------------------------------------------------------------------------------------------------------------------------------
/*an algorithm that will take an array for the first argument and return an array with all the 
objects that matches all the properties and values in the Object passed as second parameter.

Applied where you need to filter or search through a collection of objects based on specific criteria in effective data processing .*/
function whatIsInAName(collection, source) {
  const sourceKeys = Object.keys(source);

  return collection
    .filter(obj => sourceKeys
      .every(key => obj.hasOwnProperty(key) &&
        obj[key] === source[key]));
}

//Example Filtering and Searching in User Interfaces:
const whatIsInAName = (collection, source) => {
  const sourceKeys = Object.keys(source);
  return collection.filter(obj =>
    sourceKeys.every(key => obj.hasOwnProperty(key) && obj[key] === source[key])
  );
};

const items = [
  { id: 1, name: 'Item A', category: 'electronics', price: 9.99 },
  { id: 2, name: 'Item B', category: 'clothing', price: 19.99 },
  { id: 3, name: 'Item C', category: 'electronics', price: 14.99 },
  { id: 4, name: 'Item D', category: 'books', price: 7.99 },
];

// Filtering and searching in a UI
const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('results');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredItems = whatIsInAName(items, { name: searchTerm });
  resultsContainer.innerHTML = '';

  filteredItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.textContent = item.name;
    resultsContainer.appendChild(itemElement);
  });
});
