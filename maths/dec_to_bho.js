// Convert a decimal number to binary, hexadecimal or octal number

dec_to_bho  = function(n, base) {
 
    if (n < 0) {
      n = 0xFFFFFFFF + n + 1;
     } 
switch (base)  
{  
case 'B':  
return parseInt(n, 10).toString(2);
break;  
case 'H':  
return parseInt(n, 10).toString(16);
break;  
case 'O':  
return parseInt(n, 10).toString(8);
break;  
default:  
return("Wrong input.........");  
}  
}

console.log(dec_to_bho(120,'B')); // 1111000
console.log(dec_to_bho(120,'H')); // 78
console.log(dec_to_bho(120,'O')); // 170
/*
Real world applications:

    Bit manipulation and low-level programming: When working with low-level programming, such as device drivers, embedded systems, 
    or system programming, the ability to convert between decimal, binary, hexadecimal, and octal representations is crucial. 
    Developers often need to work with and manipulate individual bits or bytes, and having a function like dec_to_bho can simplify these tasks.

    Data representation and storage: In many applications, data needs to be stored or transmitted in a compact or efficient manner. 
    Representing numbers in binary, hexadecimal, or octal formats can often reduce the required storage space or bandwidth compared to using 
    decimal representation.

    Cryptography and security: Cryptographic algorithms and security protocols commonly use hexadecimal and binary representations for various 
    purposes, such as key generation, hashing, or encryption. The dec_to_bho function can be useful in implementing or understanding these 
    cryptographic mechanisms.

    Computer architecture and hardware design: In the field of computer architecture and hardware design, engineers often work with binary, hexadecimal, 
    and octal representations to describe and manipulate digital circuits, memory layouts, and other hardware-related concepts.

    Network programming and communication protocols: Many network protocols, such as IP addresses, MAC addresses, and various data packet formats, 
    use hexadecimal or binary representations. The dec_to_bho function can be helpful in working with these protocols and translating between different 
    number representations.

    Debugging and troubleshooting: When working with low-level systems or embedded devices, developers often need to interpret and analyze data in 
    various number formats. The dec_to_bho function can be a valuable tool for quickly converting between decimal, binary, hexadecimal, and octal 
    representations, facilitating the debugging and troubleshooting process.*/

// Example Convert IP address: 192.168.1.100 components to decimal,
const ipComponents = [192, 168, 1, 100];

// Convert each component to binary, hexadecimal, and octal
for (let i = 0; i < ipComponents.length; i++) {
  const decimal = ipComponents[i];
  console.log(`Decimal: ${decimal}`);
  console.log(`Binary: ${dec_to_bho(decimal, 'B')}`);
  console.log(`Hexadecimal: ${dec_to_bho(decimal, 'H')}`);
  console.log(`Octal: ${dec_to_bho(decimal, 'O')}`);
  console.log();
}
/*
Decimal: 192, Binary: 11000000, Hexadecimal: C0, Octal: 300
Decimal: 168, Binary: 10101000, Hexadecimal: A8, Octal: 250
Decimal: 1, Binary: 1, Hexadecimal: 1, Octal: 1
Decimal: 100, Binary: 1100100, Hexadecimal: 64,Octal: 144
*/

// Parsing an Ethernet frame header to convert numerical values between different representations, making it easier to understand and work with the protocol data.
const ethernetHeader = {
  destinationMAC: dec_to_bho(0x01234567, 'H'), // Hexadecimal MAC address
  sourceMAC: dec_to_bho(0x89ABCDEF, 'H'),
  etherType: dec_to_bho(0x0800, 'H') // Hexadecimal Ethernet type
};
// Implementing a TCP state machine
function processTCPPacket(packet) {
  const tcpFlags = dec_to_bho(packet.flags, 'B'); // Convert TCP flags to binary
  // Use the tcpFlags binary representation to implement the TCP state machine
  // and handle the packet based on the current connection state
}
// Use the dec_to_bho function to validate the IP header checksum
const ipHeader = {
  version: dec_to_bho(4, 'B'), // Binary IP version
  headerLength: dec_to_bho(5, 'B'), // Binary IP header length
  totalLength: dec_to_bho(1500, 'H'), // Hexadecimal total packet length
  checksum: dec_to_bho(0xABCD, 'H') // Hexadecimal IP header checksum
};

