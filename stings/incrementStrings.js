 /*
 The incrementString function is useful for incrementing numeric suffixes in strings, 
 which is particularly applicable in various real-world scenarios, such as file naming, versioning, and user-generated content. 
 
 incrementString function  increments a string, to create a new string. If the string already ends with a number, 
 the number should be incremented by 1. If the string does not end with a number. the number 1 should be appended to the new string. */

function incrementString (strng) {
    // return incrementedString
    return strng.replace(/(\d*)$/, (_, p1) => p1 ? String(+p1 + 1).padStart(p1.length, 0) : 1);
  }

// Example: File Versioning
let fileName = "report";
fileName = incrementString(fileName); // Output: "report1"
fileName = incrementString(fileName); // Output: "report2"
console.log(fileName); // Output: "report2"
