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


/*
The reverseString function takes a string as input and returns a new string that is the reverse of the original. 
This operation is common in various programming scenarios, such as data manipulation, algorithms, and text processing.*/

function reverseString(str) {
  return str
    .split("") // Split the string into an array of characters
    .reverse() // Reverse the array of characters
    .join(""); // Join the reversed array back into a string
}

function isPalindrome(str) {
  const reversed = reverseString(str);
  return str === reversed;
}

// Example usage
const word = "racecar";
console.log(`Is "${word}" a palindrome? ${isPalindrome(word)}`); // Output: true


/* Our goal is to take the input, str, and return it in reverse. Our first step is to split the string by characters using split(''). 
Notice that we don’t leave anything in between the single quotes, this tells the function to split the string by each character.

Using the split() function will turn our string into an array of characters, keep that in mind as we move forward.

Next we chain the reverse() function, which takes our array of characters and reverses them.

Finally, we chain join('') to put our characters back together into a string. Notice once again that we left no spaces in the argument for join, 
this makes sure that the array of characters is joined back together by each character. */
