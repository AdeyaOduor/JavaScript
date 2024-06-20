// write the quickSort algorithm 1
const swap = (array, left, right) => {
    const temp1 = array[left];
    const temp2 = array[right];
    array[left] = temp2;
    array[right] = temp1;
  };
  
  const partition = (array, left, right) => {
    const pivotIndex = Math.floor((left + right) / 2);
    const pivot = array[pivotIndex]; 
    while(left <= right) {
      while(array[left] < pivot) {
        left++;
      }
      while(pivot < array[right]) {
        right--;
      }
      if (left <= right) {
        console.log(`swap ${array[left]} and ${array[right]}`);
        swap(array, left, right);
        console.log(array);
        left++;
        right--;
      }
    }
    return left;
  };

const quickSort = (array, left, right) => {
    const index = partition(array, left, right);
    if (left < index - 1) {
      quickSort(array, left, index - 1);
    }
    if (index < right) {
      quickSort(array, index, right);
    }
  };
  
  let array = [4, 7, 1, 9, 3, 8, 0, 2];
  quickSort(array, 0, array.length - 1);
  console.log('quicksorted array is', array); 
---------------------------------------------------------------------------------------------------------------------------------------

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

console.log("Original array: " + myArray);
var sortedArray = quick_Sort(myArray);
console.log("Sorted array: " + sortedArray);
/*Original array: 3,0,2,5,-1,4,1
Sorted array: -1,0,1,2,3,4,5*/
---------------------------------------------------------------------------------------------------------------------------
// Sort an Array Alphabetically using the sort Method
function alphabeticalOrder(arr) {
  return arr.sort(function(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
  });
}
alphabeticalOrder(["a", "d", "c", "a", "z", "g"]);
---------------------------------------------------------------------------
// Return a Sorted Array Without Changing the Original Array
const globalArray = [5, 6, 3, 2, 9];
function nonMutatingSort(arr) {
  
  return [].concat(arr).sort(function(a, b) {
    return a - b;
  });
  
}
nonMutatingSort(globalArray);
