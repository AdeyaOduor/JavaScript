// The isValidIP function checks if a given string is a valid IPv4 address. Validating IP addresses is 
// crucial in various real-world applications, particularly in networking, web development, and cybersecurity.

function isValidIP(str) {
    return str.split('.').filter(function(v){return v==Number(v).toString() && Number(v)<256}).length==4;
  }
