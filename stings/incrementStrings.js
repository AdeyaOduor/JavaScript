 //Your job is to write a function which increments a string, to create a new string.
 //If the string already ends with a number, the number should be incremented by 1.
//If the string does not end with a number. the number 1 should be appended to the new string.


function incrementString (strng) {
    // return incrementedString
    return strng.replace(/(\d*)$/, (_, p1) => p1 ? String(+p1 + 1).padStart(p1.length, 0) : 1);
  }