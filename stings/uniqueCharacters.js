// Bruteforce approach:
var allUniqueChars = function(string) {
  for (var i = 0; i < string.length; i++) {
    for (var j = i + 1; j < string.length; j++) {
      if (string[i] === string[j]) {
        return false; // Duplicate found
      }
    }
  }
  return true; // All characters are unique
};
// Bit Manipulation Approach:
const everyCharUnique = (str, indexOffset = 'a'.charCodeAt()) => {
    let counterTable = Number();
    for(let index of [...str].map(c => c.charCodeAt() - indexOffset)) {
        const mask = 1 << index;
        if(counterTable & mask)
            return false; // Duplicate found
        counterTable |= mask; // Set the bit for this character
    }
    return true; // All characters are unique
};
// Object/Hash Map Approach:
function everyCharUnique(str) {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]] && obj[str[i]] >= 1) {
      return false; // Duplicate found
    } else {
      obj[str[i]] = 1; // Mark character as seen
    }
  }
  return true; // All characters are unique
}

/* Real-World Application: Validating User Input

These functions are useful in scenarios where you need to validate user input, such as:

    Username Creation: When users create usernames, you might want to ensure that all characters are unique to avoid confusion.
    Password Validation: Certain applications may require unique characters in passwords for added security.

Example Usage */
const username = "uniqueUser";
console.log(allUniqueChars(username)); // Output: true
console.log(everyCharUnique(username)); // Output: true
console.log(everyCharUnique(username)); // Output: true
