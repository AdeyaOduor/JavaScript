/*
The reverseString function takes a string as input and returns a new string that is the reverse of the original. 
This operation is common in various programming scenarios, such as data manipulation, algorithms, and text processing.*/

function reverseString(str) {
  return str
    .split("")
    .reverse()
    .join("");
}

/* Our goal is to take the input, str, and return it in reverse. Our first step is to split the string by characters using split(''). 
Notice that we don’t leave anything in between the single quotes, this tells the function to split the string by each character.

Using the split() function will turn our string into an array of characters, keep that in mind as we move forward.

Next we chain the reverse() function, which takes our array of characters and reverses them.

Finally, we chain join('') to put our characters back together into a string. Notice once again that we left no spaces in the argument for join, 
this makes sure that the array of characters is joined back together by each character. */
