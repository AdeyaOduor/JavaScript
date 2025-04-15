// implement a difference function which subtracts one list from another and returns the result
function array_diff(a, b) {
  return a.filter(function(x) { return b.indexOf(x) == -1; });
}

console.log(array_diff([1, 2], [1]));  // Output: [2]
console.log(array_diff([3, 4], [3]));  // Output: [4]
// -----------------------------------------------------------------------------------------------------------------------------------
/*Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, 
return the symmetric difference of the two arrays. diffArray function takes two arrays as input and returns an array containing 
the elements that are unique to each input array. */
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

/*
Real-World Application: Inventory Management

Imagine you are managing inventory for a retail store and you want to find out which items are unique to each of two suppliers' lists.

    Supplier A's Inventory:
        array1: [101, 102, 103, 105] (IDs of items supplied by Supplier A)

    Supplier B's Inventory:
        array2: [101, 102, 103, 104, 106] (IDs of items supplied by Supplier B)

    Using diffArray:
        You want to identify items that are unique to each supplier, which helps you understand what additional products you might need to source from either supplier.
*/
const supplierA = [101, 102, 103, 105];
const supplierB = [101, 102, 103, 104, 106];
const uniqueItems = diffArray(supplierA, supplierB);
console.log(uniqueItems); // Output: [105, 104, 106]


const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log(diffArray(array1, array2));
// Output: [1, 2, 6, 7] in filtering and transformation

console.log(array1.filter(item => array2.includes(item)));
// Output: [3, 4, 5] in filtering and transformation
// --------------------------------------------------------------------------------------------------------------------------------------
/*destroyer function is designed to remove specified values from an array. 
It takes an array as its first argument and any number of additional values to remove.
*/
function destroyer(arr, ...valsToRemove) {
  return arr.filter(elem => !valsToRemove.includes(elem));
}
const result = destroyer([1, 2, 3, 1, 2, 3], 2, 3);
console.log(result); // Output: [1, 1]

/*
Real-World Application: Cleaning Up User Input

Imagine you have a list of items that a user has selected, and you want to remove certain unwanted items (like banned items) from their 
selection before processing it further.
Example Scenario

    User's Selected Items:
        arr: ["apple", "banana", "orange", "grape", "banana"]

    Items to Remove:
        valsToRemove: ["banana", "grape"]

    Using destroyer:
        You can use the function to clean the user's selection by removing the unwanted items.
*/
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
