/* Truncate a string (first argument) if it is longer than the given maximum string length (second argument). 
Return the truncated string with a ... ending. 

The truncateString function is useful for shortening long strings, particularly in user interfaces and data processing scenarios.*/
function truncateString(str, num) {
  return str.length > num ? str.slice(0, num) + "..." : str;
}

// Example 1
const title = "A Very Long Title That Exceeds The Display Limit";
const truncatedTitle = truncateString(title, 20);
console.log(truncatedTitle); // Output: "A Very Long Title..."

// Example 2
const postContent = "This is a very long post content that might not fit into the designated area of the application.";
const displayedContent = truncateString(postContent, 50);
console.log(displayedContent); // Output: "This is a very long post content that..."
