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
