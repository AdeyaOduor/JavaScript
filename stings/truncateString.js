/* Truncate a string (first argument) if it is longer than the given maximum string length (second argument). 
Return the truncated string with a ... ending. 

The truncateString function is useful for shortening long strings, particularly in user interfaces and data processing scenarios.*/
function truncateString(str, num) {
  return str.length > num ? str.slice(0, num) + "..." : str;
}
