/*
QuickSort can be used to sort large arrays of data efficiently. For example, you might have a dataset of numerical values representing user transactions, 
sensor readings, or performance metrics. Sorting this data can help in various analyses, such as identifying trends, finding outliers, or preparing 
data for further statistical analysis.
*/

// quickSort algorithm 1
// Function to swap two elements in an array
const swap = (array, left, right) => {
    const temp = array[left];
    array[left] = array[right];
    array[right] = temp;
};

// Function to partition the array around a pivot
const partition = (array, left, right) => {
    const pivotIndex = Math.floor((left + right) / 2);
    const pivotValue = array[pivotIndex];
    let i = left;
    let j = right;

    while (i <= j) {
        // Move the left index to the right until we find an element greater than the pivot
        while (array[i] < pivotValue) {
            i++;
        }
        // Move the right index to the left until we find an element less than the pivot
        while (array[j] > pivotValue) {
            j--;
        }
        // Swap the elements and move the indices
        if (i <= j) {
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i; // Return the index where the partitioning ended
};

// Main QuickSort function
const quickSort = (array, left = 0, right = array.length - 1) => {
    if (left < right) {
        const index = partition(array, left, right); // Partition the array
        quickSort(array, left, index - 1); // Recursively sort the left subarray
        quickSort(array, index, right); // Recursively sort the right subarray
    }
};

// Example usage in big data analysis
const analyzeData = (data) => {
    console.log('Original Data:', data);
    quickSort(data); // Sort the data using QuickSort
    console.log('Sorted Data:', data);
};

// Simulated large dataset for analysis
let bigDataArray = [42, 31, 24, 5, 12, 67, 89, 2, 45, 78, 23, 56, 91, 10, 33];
analyzeData(bigDataArray);
// ---------------------------------------------------------------------------------------------------------------------------------------

/* QuickSort algorithm 2
 Quick sort is a comparison sort, meaning that it can sort items of any type for which a "less-than" relation (formally, a total order)
is defined. */
function quick_Sort(origArray) {
	if (origArray.length <= 1) { 
		return origArray;
	} else {

		var left = [];
		var right = [];
		var newArray = [];
		var pivot = origArray.pop();
		var length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i] <= pivot) {
				left.push(origArray[i]);
			} else {
				right.push(origArray[i]);
			}
		}

		return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
	}
}

var myArray = [3, 0, 2, 5, -1, 4, 1 ];

console.log("Original array: " + myArray); //Original array: 3,0,2,5,-1,4,1
var sortedArray = quick_Sort(myArray);
console.log("Sorted array: " + sortedArray);// Sorted array: -1,0,1,2,3,4,5
// ------------------------------------------------------------------------------------------------------

/**
In a database context, the QuickSort algorithm can be used to sort records based on a 
specific field, such as sorting user IDs, prices, or timestamps. 
 * QuickSort algorithm to sort an array.
 * @param {Array} array - The array to be sorted.
 * @returns {Array} - The sorted array.
 */
function quickSort(array) {
    // Base case: if the array is empty or has one element, return it as is
    if (array.length <= 1) {
        return array;
    }

    // Choose the pivot (here we use the last element for simplicity)
    const pivot = array[array.length - 1];
    const left = [];   // Elements less than or equal to pivot
    const right = [];  // Elements greater than pivot

    // Partition the array into left and right arrays
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] <= pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    // Recursively sort left and right arrays, and concatenate results
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage
const myArray = [3, 0, 2, 5, -1, 4, 1];
console.log("Original array:", myArray); // Output: Original array: [3, 0, 2, 5, -1, 4, 1]
const sortedArray = quickSort(myArray);
console.log("Sorted array:", sortedArray); // Output: Sorted array: [-1, 0, 1, 2, 3, 4, 5]

const transactions = [200, 50, 150, 300, 100];
console.log("Original transactions:", transactions);
const sortedTransactions = quickSort(transactions);
console.log("Sorted transactions:", sortedTransactions); // Output: Sorted transactions: [50, 100, 150, 200, 300]

// -------------------------------------------------------------------------------------------

// Node express app connecting to a database
const mysql = require('mysql2');

function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[array.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] <= pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', // Your database host
    user: 'root',      // Your database username
    password: 'password', // Your database password
    database: 'test_db' // Your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');

    // Fetch the transaction amounts
    connection.query('SELECT amount FROM transactions', (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            return;
        }

        // Extract amounts into an array
        const amounts = results.map(row => row.amount);
        console.log("Original amounts:", amounts);

        // Sort the amounts using QuickSort
        const sortedAmounts = quickSort(amounts);
        console.log("Sorted amounts:", sortedAmounts);

        // Close the database connection
        connection.end();
    });
});
	

// ---------------------------------------------------------------------------------------------------------------------------
// Sort an Array Alphabetically using the sort Method
function alphabeticalOrder(arr) {
  return arr.sort(function(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
  });
}
console.log(alphabeticalOrder(["a", "d", "c", "a", "z", "g"]));

// ---------------------------------------------------------------------------
// Return a Sorted Array Without Changing the Original Array
const globalArray = [5, 6, 3, 2, 9];
function nonMutatingSort(arr) {
  
  return [].concat(arr).sort(function(a, b) {
    return a - b;
  });
  
}

console.log(nonMutatingSort(globalArray)); // [ 2, 3, 5, 6, 9 ]
// -------------------------------------------------------------------------------

/*
descendingOrder function is intended to take a number, rearrange its digits in descending order, and return that as a string. */
function descendingOrder(num) {
    
   // Convert the number to a string, then to an array of digits
   let arr_num = Array.from(num.toString());
   // Sort the array in descending order
   arr_num.sort((a, b) => b - a);
   // Join the sorted array back into a string
   let str_arr = arr_num.join("");

   return str_arr; // Return the resulting string
}

// Example usage
const sortedNumber = descendingOrder(209482);
console.log(sortedNumber); // 984220
/*
Real-World Application: Sorting User IDs or Transaction Numbers

This function can be applied in various scenarios, such as:

    User ID Generation: If you need to create a unique identifier by rearranging digits.
    Transaction Processing: Rearranging transaction numbers based on certain criteria for prioritization or display.
*/
// -------------------------------------------------------------------------------------------------------------------------------

/* A JavaScript program to get a sorted array of objects ordered by properties and orders.
 Uses Array.prototype.sort(), Array.prototype.reduce() on the props array with a default value of 0.
 Use array destructuring to swap the properties position depending on the order supplied.
 If no orders array is supplied, sort by 'asc' by default.

 Application Examples:
 1. Sorting User Data in Applications
In web applications, you often need to display user data (e.g., usernames, registration dates) in a sorted manner.

2. Sorting Product Listings in E-commerce
In e-commerce platforms, products can be sorted by price, rating, or availability.

3. Sorting Orders in a Management System
In order management systems, sorting orders by date and status can help in tracking and managing them effectively.

4. Sorting Student Records in Educational Software
In educational applications, student records might need to be sorted by GPA and then by last name.
*/

const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );
const users = [{ name: 'Peter', age: 43 }, { name: 'David', age: 41 }, { name: 'Margaret', age: 54 }];

console.log(orderBy(users, ['name', 'age'], ['asc', 'desc'])); 
console.log(orderBy(users, ['name', 'age']));

const users = [
  { name: 'Alice', age: 30, registrationDate: '2023-01-15' },
  { name: 'Bob', age: 25, registrationDate: '2023-02-10' },
  { name: 'Charlie', age: 35, registrationDate: '2023-01-20' }
];

const sortedUsers = orderBy(users, ['age', 'registrationDate'], ['asc', 'desc']);
console.log(sortedUsers);
/*
Output:
[
  { name: 'Bob', age: 25, registrationDate: '2023-02-10' },
  { name: 'Alice', age: 30, registrationDate: '2023-01-15' },
  { name: 'Charlie', age: 35, registrationDate: '2023-01-20' }
]
*/
// ----------------------------------------------------------------------------------------------------------------------------

const products = [
  { id: 1, name: 'Product A', price: 10, category: 'Electronics' },
  { id: 2, name: 'Product B', price: 20, category: 'Clothing' },
  { id: 3, name: 'Product C', price: 15, category: 'Electronics' },
  { id: 4, name: 'Product D', price: 25, category: 'Clothing' },
];

// Sort products by price in ascending order, then by category in descending order
const sortedProducts = orderBy(products, ['price', 'category'], ['asc', 'desc']);
// --------------------------------------------------------------------------------------
const products = [
  { name: 'Laptop', price: 999, rating: 4.5 },
  { name: 'Phone', price: 699, rating: 4.7 },
  { name: 'Tablet', price: 499, rating: 4.3 }
];

const sortedProducts = orderBy(products, ['price', 'rating'], ['asc', 'desc']);
console.log(sortedProducts);
/*
Output:
[
  { name: 'Tablet', price: 499, rating: 4.3 },
  { name: 'Phone', price: 699, rating: 4.7 },
  { name: 'Laptop', price: 999, rating: 4.5 }
]
*/
// ----------------------------------------------------------------------------------------------------------------------------------------

const orders = [
  { id: 1, date: '2023-03-01', status: 'shipped' },
  { id: 2, date: '2023-02-28', status: 'pending' },
  { id: 3, date: '2023-03-02', status: 'delivered' }
];

const sortedOrders = orderBy(orders, ['date', 'status'], ['asc', 'desc']);
console.log(sortedOrders);
/*
Output:
[
  { id: 2, date: '2023-02-28', status: 'pending' },
  { id: 1, date: '2023-03-01', status: 'shipped' },
  { id: 3, date: '2023-03-02', status: 'delivered' }
]
*/
// ----------------------------------------------------------------------------------------

cconst students = [
  { name: 'John Doe', gpa: 3.5 },
  { name: 'Jane Smith', gpa: 3.8 },
  { name: 'Alice Johnson', gpa: 3.5 }
];

const sortedStudents = orderBy(students, ['gpa', 'name'], ['desc', 'asc']);
console.log(sortedStudents);
/*
Output:
[
  { name: 'Jane Smith', gpa: 3.8 },
  { name: 'Alice Johnson', gpa: 3.5 },
  { name: 'John Doe', gpa: 3.5 }
]
*/
// ---------------------------------------------------------------------------------------------

const flights = [
  { id: 1, from: 'New York', to: 'Los Angeles', duration: 6, price: 400 },
  { id: 2, from: 'London', to: 'Paris', duration: 1.5, price: 150 },
  { id: 3, from: 'Tokyo', to: 'Seoul', duration: 2.5, price: 300 },
  { id: 4, from: 'Sydney', to: 'Melbourne', duration: 1, price: 80 },
];

// Sort flights by price in ascending order, then by duration in descending order
const sortedFlights = orderBy(flights, ['price', 'duration'], ['asc', 'desc']);

