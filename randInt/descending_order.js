function descendingOrder() {
   let num = 209482; // The number to be rearranged
   let arr_num = Array.from(num + ""); // Convert the number to an array of characters
   arr_num = arr_num.map(e => parseInt(e)); // Convert each character back to an integer
   arr_num.sort(); // Sort the array in ascending order
   arr_num.reverse(); // Reverse the array to get descending order
   arr_num.sort((a, b) => a - b); // This line is unnecessary and incorrect
   let str_arr = arr_num.join(""); // Join the array back into a string

   return str_arr; // Return the resulting string
}
console.log(descendingOrder()); //022489
