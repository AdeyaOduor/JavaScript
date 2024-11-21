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
// ---------------------------------------------------------------------------------------------------------------------------
// Sort an Array Alphabetically using the sort Method
function alphabeticalOrder(arr) {
  return arr.sort(function(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
  });
}
alphabeticalOrder(["a", "d", "c", "a", "z", "g"]);
// ---------------------------------------------------------------------------
// Return a Sorted Array Without Changing the Original Array
const globalArray = [5, 6, 3, 2, 9];
function nonMutatingSort(arr) {
  
  return [].concat(arr).sort(function(a, b) {
    return a - b;
  });
  
}

console.log(nonMutatingSort(globalArray)); // [ 2, 3, 5, 6, 9 ]
