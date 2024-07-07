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
    representations, facilitating the debugging and troubleshooting process.

    Educational and teaching purposes: The dec_to_bho function can also be useful in educational settings, such as computer science or programming 
    courses, where students need to learn about different number representations and how to convert between them.
*/
