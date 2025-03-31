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

// Application Example in Network Programming
// Scenario: IP Address Management in a Network Application, Logging Network Activity using Incoming Connection Data:
const connections = [
    { src: 3232235521, dest: 3232235776 }, // 192.168.1.1 to 192.168.1.255
    { src: 16777343, dest: 167772160 }     // 10.0.0.1 to 10.0.0.0
];
// Converting to Dotted Decimal Format:
connections.forEach(connection => {
    const srcIp = int32ToIp(connection.src);
    const destIp = int32ToIp(connection.dest);
    console.log(`Connection from ${srcIp} to ${destIp}`);
});

// Output
// Connection from 192.168.1.1 to 192.168.1.255
// Connection from 10.0.0.1 to 10.0.0.0

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

   Real-World Applications

    Network Configuration:
        In network device configurations, IP addresses are often stored as 32-bit integers for efficiency. Functions like int32ToIp help convert 
        these integers back to a human-readable format for display or logging.

    Database Storage:
        In databases, it’s common to store IP addresses in a binary format (as integers) for space efficiency. When retrieving these addresses, 
        they can be converted back to the standard dotted-decimal format using this function.

    Network Programming:
        In applications that require low-level network programming (like creating sockets), IP addresses may be manipulated in their integer form. 
        Converting them to string representation makes it easier to log, display, or compare.

    IP Address Management:
        In systems that manage IP addresses, such as DHCP servers or IP address allocation systems, converting between formats is essential to ensure 
        compatibility with various protocols and logging mechanisms.

*/
