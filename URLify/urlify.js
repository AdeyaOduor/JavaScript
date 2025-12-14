var urlify = function(str, length) {
  // Trim the input string to remove leading/trailing spaces
  str = str.trim();

  var strArr = str.split('');
  var pointer = 0;
  while (pointer < str.length) {
    if (strArr[pointer] === ' ') {
      // Adjust the range of the inner loop
      for (var i = str.length - 1; i > pointer + 2; i--) {
        strArr[i] = str[i - 2];
      }
      strArr[pointer] = '%';
      strArr[pointer + 1] = '2';
      strArr[pointer + 2] = '0';
    }
    pointer++;
  }

  return strArr.join('');
};

console.log(urlify('Mr John Smith    ', 13), 'Mr%20John%20Smith'); // output Mr%20John%20i Mr%20John%20Smith
// ---------------------------------------------------------------------------------------------------------------------------
//OR

function urlify(str, len) {
  let s = "";
  let totalSpaces = str.length - len;
  let frontSpaces = 0;
  let flag = false;
  for (let i = 0; i < str.length; i++) {
    if (flag === false) {
      if (str[i] === " ") frontSpaces++;
      else flag = true;
    }
    if (flag === true && i < str.length - (totalSpaces - frontSpaces)) {
      if (str[i] === " ") s += "%20";
      else s += str[i];
    }
  }

  return s;
}

console.log(urlify("Mr John Smith   ", 13)); //Output Mr%20John%20Smith
// -------------------------------------------------------------------------------------------------------------------------------------

const replaceUrlSpaces = (str) => {
  const convertToArray = str.trim().split('');
  for(let i in convertToArray) {
    if(convertToArray[i] === " ") {
     convertToArray[i] = "%20"
    }
  }
  return convertToArray.join('');
}

 console.log(replaceUrlSpaces("Sai Charan P")); // Sai%20Charan%20P

/* let's break down the code step by step:

    const replaceUrlSpaces = (str) => { ... }:
        This is an arrow function named replaceUrlSpaces that takes a string parameter str.

    const convertToArray = str.trim().split('');:
        The trim() method is used to remove any leading or trailing whitespace from the input string str.
        The split('') method is then used to convert the trimmed string into an array of individual characters.

    for(let i in convertToArray) { ... }:
        This is a for...in loop that iterates over the indices of the convertToArray array.

    if(convertToArray[i] === " ") { convertToArray[i] = "%20" }:
        Inside the loop, the code checks if the current character in the array (convertToArray[i]) is a space ( ).
        If it is, the character is replaced with the URL-encoded space "%20".

    return convertToArray.join('');:
        After the loop has finished, the modified array is joined back into a string using the join('') method.
        The resulting string is then returned by the replaceUrlSpaces function.

Finally, the code console.log(replaceUrlSpaces("Sai Charan P")); calls the replaceUrlSpaces function with the string 
"Sai Charan P" as an argument, and logs the result to the console.

The replaceUrlSpaces function you provided is useful for converting spaces in a string to %20, which is the URL encoding for spaces. 
This functionality has several real-life applications, particularly in web development and data processing:*/

// Example1: When constructing URLs for API requests, spaces in query parameters must be encoded to ensure the URL is valid.
const query = "search term with spaces";
const encodedQuery = replaceUrlSpaces(query);
const apiUrl = `https://api.example.com/search?q=${encodedQuery}`;
console.log(apiUrl); // Output: "https://api.example.com/search?q=search%20term%20with%20spaces"

// Example2: In web applications, user-generated content often includes spaces. When creating links or redirecting users, it’s essential to encode these spaces to prevent errors.
const userInput = "My Favorite Books";
const link = `https://example.com/books/${replaceUrlSpaces(userInput)}`;
console.log(link); // Output: "https://example.com/books/My%20Favorite%20Books"

// Example3: When users submit forms with text fields that may contain spaces, the data must be encoded before sending it to the server.
const formData = {
  name: "John Doe",
  message: "Hello World"
};

const encodedName = replaceUrlSpaces(formData.name);
const encodedMessage = replaceUrlSpaces(formData.message);
const formUrl = `https://api.example.com/submit?name=${encodedName}&message=${encodedMessage}`;
console.log(formUrl); // Output: "https://api.example.com/submit?name=John%20Doe&message=Hello%20World"

// Example4: When generating download links for files whose names contain spaces, encoding ensures that the link works correctly.
const fileName = "My Document.pdf";
const downloadLink = `https://example.com/download/${replaceUrlSpaces(fileName)}`;
console.log(downloadLink); // Output: "https://example.com/download/My%20Document.pdf"

// Example5: When redirecting users based on input data, ensuring the URL is properly formatted can prevent issues with navigation.
const redirectUrl = "https://example.com/dashboard?user=John Smith";
const safeRedirectUrl = replaceUrlSpaces(redirectUrl);
console.log(safeRedirectUrl); // Output: "https://example.com/dashboard?user=John%20Smith"

