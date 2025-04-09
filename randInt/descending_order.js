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
console.log(sortedNumber); 
