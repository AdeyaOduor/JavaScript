/* Return the provided string with the first letter of each word capitalized. 
Make sure the rest of the word is in lower case.

The titleCase function is useful for formatting strings to a title case, where the first letter of each word is capitalized. 
This functionality can be applied in various real-world scenarios, particularly in data presentation and user interfaces.*/
function titleCase(str) {
  return str
    .toLowerCase()
    .replace(/(^|\s)\S/g, L => L.toUpperCase());
}
