// Return an English-translated sentence of the passed binary string.
// function converting a given string into its binary representation, where each character in the string is represented by its ASCII value in binary format. 
// This can be useful in various applications, especially in computer science and digital communication.
function binaryAgent(str) {
  const result = str.split(' ')
                    .map(b => String.fromCharCode(parseInt(b, 2)))
                    .join('');
  console.log(result);
  return result;
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 
            00100000 01100010 01101111 01101110 01100110 01101001 
            01110010 01100101 01110011 00100000 01100110 01110101 
            01101110 00100001 00111111"); 
/* The binary values in the input string are converted into their respective ASCII characters, resulting in the following text string.
 "Aren't bonfires fun?!".
 
 The binaryAgent function is a real-world application that can be used to convert binary-encoded text back to its original form. This type 
 of functionality can be useful in a variety of scenarios, such as:

    Decoding Binary Transmissions: In some communication protocols or data exchange formats, information can be transmitted in binary format. 
    The binaryAgent function can be used to decode these binary transmissions and retrieve the original text.

    Example use case: Decoding binary data received from IoT (Internet of Things) devices or sensor networks, where data is transmitted in a 
    compact binary format to conserve bandwidth.

    Cryptography and Encryption: In the field of cryptography, binary representations are often used to encode and encrypt data. The binaryAgent 
    function can be used as part of a decryption process to convert the binary-encoded ciphertext back to plaintext.

    Example use case: Decoding encrypted messages or data that have been transmitted over insecure channels, as part of a secure communication system.

    Data Manipulation and Conversion: Binary representations can be used to store and transmit various types of data, such as text, numbers, or even 
    images and other multimedia content. The binaryAgent function can be used to convert these binary-encoded data back to their original format.

    Example use case: Extracting and converting binary-encoded data embedded within other file formats or data structures, such as image metadata or 
    custom data formats.

    Educational and Debugging Purposes: The binaryAgent function can be useful in educational contexts, where students or developers need to work with 
    binary representations and understand how to convert them to human-readable text.

    Example use case: Providing a tool or utility for learning about binary data representation and encoding/decoding processes in computer science or 
    programming courses.
*/

// Assume you have the binary data as a string
const binaryData = "00000001 00000010 00000011 00000100 00000101";

// Split the binary data into individual 8-bit sequences
const binaryValues = binaryData.split(" ");

// Define a function to decode the binary value to a decimal number
function decodeBinary(binaryString) {
  return parseInt(binaryString, 2);
}

// Use myMap to decode the binary values
const sensorReadings = binaryValues.myMap(decodeBinary);
console.log(sensorReadings); // Output: [1, 2, 3, 4, 5]
// ---------------------------------------------------------------------------------------------------------------------------------------------

// Convert a string to binary representation
function stringToBinary(str) {
  return str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

// Convert binary to text
function binaryToString(binaryStr) {
  return binaryStr.split(' ').map(binary => String.fromCharCode(parseInt(binary, 2))).join('');
}

// Encrypt the message using a key
function encrypt(message, key) {
  const messageBinary = stringToBinary(message).split(' ');
  const keyBinary = stringToBinary(key).split(' ');

  const encryptedBinary = messageBinary.map((char, i) => {
    const messageBit = parseInt(char, 2);
    const keyBit = parseInt(keyBinary[i % keyBinary.length], 2); // Cycle through key
    return (messageBit ^ keyBit).toString(2).padStart(8, '0');
  }).join(' ');

  return encryptedBinary; // Return the encrypted binary string
}

// Decrypt the encrypted message using the same key
function decrypt(encryptedBinary, key) {
  const encryptedBits = encryptedBinary.split(' ');
  const keyBinary = stringToBinary(key).split(' ');

  const decryptedBinary = encryptedBits.map((char, i) => {
    const encryptedBit = parseInt(char, 2);
    const keyBit = parseInt(keyBinary[i % keyBinary.length], 2); // Cycle through key
    return (encryptedBit ^ keyBit).toString(2).padStart(8, '0');
  }).join(' ');

  return binaryToString(decryptedBinary); // Convert back to string
}

// Example usage
const message = 'Hello, World!';
const key = 'MySecretKey';

const encryptedMessage = encrypt(message, key);
console.log('Encrypted message (binary):', encryptedMessage);

const decryptedMessage = decrypt(encryptedMessage, key);
console.log('Decrypted message:', decryptedMessage);
/*
In this example, the binaryAgent function is used to convert between binary and text representations. 
The encrypt and decrypt functions demonstrate a simple encryption/decryption algorithm using the XOR operation.*/
// -----------------------------------------------------------------------------------------------------------------------------

const CryptoJS = require('crypto-js');

// Encrypt a message using AES
function encrypt(message, key) {
  // Encrypt the message with the key using AES
  const encrypted = CryptoJS.AES.encrypt(message, key).toString();
  return encrypted; // Return the encrypted message
}

// Decrypt the encrypted message using the same key
function decrypt(encryptedMessage, key) {
  // Decrypt the message with the key using AES
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted; // Return the decrypted message
}

// Example usage
const message = 'Hello, World!';
const key = 'MySecretKey123'; // Key must be of sufficient length (16, 24, or 32 characters for AES)

const encryptedMessage = encrypt(message, key);
console.log('Encrypted message:', encryptedMessage);

const decryptedMessage = decrypt(encryptedMessage, key);
console.log('Decrypted message:', decryptedMessage);
