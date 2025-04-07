/*
The repeatStringNumTimes function recursively generates a new string by repeating a given string a specified number of times. 
This kind of function can be useful in various programming scenarios, such as formatting text or generating patterns. */

function repeatStringNumTimes(str, num) {
  return num > 0 ? str + repeatStringNumTimes(str, num - 1) : '';
}

// Example 1
const placeholder = repeatStringNumTimes("Lorem Ipsum ", 3);
console.log(placeholder); // Output: "Lorem Ipsum Lorem Ipsum Lorem Ipsum "

function promptUser(message, times) {
    return repeatStringNumTimes(message + "\n", times);
}
// Example 2
const prompts = promptUser("Please enter your name:", 2);
console.log(prompts);
// Output:
// "Please enter your name:
// Please enter your name:"
