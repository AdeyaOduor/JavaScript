/* The function int32ToIp converts a 32-bit integer (often used to represent an IP address in numeric form) into its standard dotted-decimal notation.
This is commonly used in network programming and applications that require IP address manipulation.*/

const int32ToIp = (num) => {
   return (num >>> 24 & 0xFF) + '.' +  // Extract the first octet
          (num >>> 16 & 0xFF) + '.' +  // Extract the second octet
          (num >>> 8 & 0xFF) + '.' +   // Extract the third octet
          (num & 0xFF);                 // Extract the fourth octet
};


/*
*/
