/* The function int32ToIp converts a 32-bit integer (often used to represent an IP address in numeric form) into its standard dotted-decimal notation.
This is commonly used in network programming and applications that require IP address manipulation.*/

const int32ToIp = (num) => {
   return (num >>> 24 & 0xFF) + '.' +  // Extract the first octet
          (num >>> 16 & 0xFF) + '.' +  // Extract the second octet
          (num >>> 8 & 0xFF) + '.' +   // Extract the third octet
          (num & 0xFF);                 // Extract the fourth octet
};
const ip = int32ToIp(3232235777);
console.log(ip); // Output: "192.168.1.1"

/*Explanation

    Right Shift (>>>):
        The >>> operator is the unsigned right shift operator. It shifts the bits of num to the right by the specified number of bits, 
        filling in zeros from the left. This effectively discards bits that are shifted out.
        For example, num >>> 24 shifts the bits 24 positions to the right, moving the first octet to the least significant position.

    Bitwise AND (&):
        The & operator performs a bitwise AND operation. By using 0xFF (which is 11111111 in binary), we isolate the last 8 bits of the number, 
        effectively extracting one octet of the IP address.
        For example, (num >>> 24 & 0xFF) extracts the first octet from the integer.

    Concatenation:
        The function concatenates the four octets with a dot (.) to form the standard IP address format.

Example of Application
Converting a 32-Bit Integer to an IP Address

Let's say you have the 32-bit integer representation of the IP address 192.168.1.1. The integer representation of this IP address can be calculated 
as follows:

    Convert Each Octet:
        192 is represented in binary as 11000000
        168 is represented in binary as 10101000
        1 is represented in binary as 00000001
        1 is represented in binary as 00000001

    Combine the Octets:
        The binary representation of 192.168.1.1 is:
        11000000.10101000.00000001.00000001
        When combined into a 32-bit integer, this becomes: 
        11000000 10101000 00000001 00000001
        As a single integer, this is 3232235777.
*/
