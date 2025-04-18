/* Return the provided string with the first letter of each word capitalized. 
Make sure the rest of the word is in lower case.

The titleCase function is useful for formatting strings to a title case, where the first letter of each word is capitalized. 
This functionality can be applied in various real-world scenarios, particularly in data presentation and user interfaces.*/
function titleCase(str) {
  return str
    .toLowerCase() // Convert the entire string to lowercase
    .replace(/(^|\s)\S/g, L => L.toUpperCase()); // Capitalize the first letter of each word
}

// Example 1
const blogPostTitle = "the quick brown fox jumps over the lazy dog";
const formattedTitle = titleCase(blogPostTitle);
console.log(formattedTitle); // Output: "The Quick Brown Fox Jumps Over The Lazy Dog"
// Example 2
const productName = "apple macbook pro 16-inch";
const formattedProductName = titleCase(productName);
console.log(formattedProductName); // Output: "Apple Macbook Pro 16-Inch"
// Example 3
const mixedTitle = "tHe cAt In tHe HaT";
const formattedMixedTitle = titleCase(mixedTitle);
console.log(formattedMixedTitle); //The Cat In The Hat
