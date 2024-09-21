/*
The confirmEnding function checks if a given string ends with a specified target string. 
This functionality has several practical applications in real-world scenarios, particularly in text processing, 
user input validation, and file handling. */

function confirmEnding(str, target) {
  return str.slice(-target.length) === target
}

confirmEnding("Bastian", "n");

// Example 1
function isValidImageFile(fileName) {
    return confirmEnding(fileName, ".jpg") || confirmEnding(fileName, ".png") || confirmEnding(fileName, ".gif");
}

const fileName = "profile_picture.jpg";
console.log(isValidImageFile(fileName)); // Output: true
