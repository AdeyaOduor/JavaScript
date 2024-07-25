/*
  Compresses a string using a simple run-length encoding algorithm. This algorithm replaces consecutive occurrences of the 
  same character with a single character and its count.
  
  @param {string} input - The input string to be compressed.
  @returns {string} - The compressed string.
 */
function compressString(input) {
  let compressed = '';
  let currentChar = '';
  let currentCount = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== currentChar) {
      if (currentCount > 0) {
        compressed += currentChar + currentCount;
      }
      currentChar = input[i];
      currentCount = 1;
    } else {
      currentCount++;
    }
  }

  // Add the last character and its count
  compressed += currentChar + currentCount;

  return compressed;
}

/**
 * Decompresses a string that was compressed using the compressString function.
 *
 * @param {string} compressed - The compressed string.
 * @returns {string} - The decompressed string.
 */
function decompressString(compressed) {
  let decompressed = '';

  for (let i = 0; i < compressed.length; i += 2) {
    const char = compressed[i];
    const count = parseInt(compressed[i + 1]);

    decompressed += char.repeat(count);
  }

  return decompressed;
}

// Example usage
const originalText = 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.';
const compressedText = compressString(originalText);
console.log('Original text:', originalText);
console.log('Compressed text:', compressedText);

const decompressedText = decompressString(compressedText);
console.log('Decompressed text:', decompressedText);

/*
In this example, the compressString function takes an input string and compresses it using a simple run-length encoding algorithm. 
The algorithm replaces consecutive occurrences of the same character with a single character and its count.

The decompressString function takes the compressed string and decompresses it back to the original form.

This compression algorithm can be useful in various real-world scenarios, such as:

    File compression: You can use this algorithm to compress text-based files, such as log files, configuration files, or even source 
    code, to reduce the file size and save storage space.

    Network communication: When transferring text-based data over a network, you can compress the data using this algorithm to reduce 
    the amount of data being transmitted, improving network efficiency and reducing the overall data usage. Imagine you have a client-server 
    application where the client needs to send text-based data to the server. To optimize the network communication, you can use the string 
    compression algorithm to reduce the size of the data being transmitted.

    Data storage: You can store compressed data in a database or other storage systems to reduce the amount of space required, while 
    still being able to decompress the data when needed.

    Caching and memory optimization: In applications where memory usage is critical, such as in-memory databases or caching systems, 
    you can use this compression algorithm to reduce the memory footprint of your data structures.
*/

// Server-side code
const express = require('express');
const app = express();

// Decompression function
function decompressString(compressed) {
  let decompressed = '';

  for (let i = 0; i < compressed.length; i += 2) {
    const char = compressed[i];
    const count = parseInt(compressed[i + 1]);

    decompressed += char.repeat(count);
  }

  return decompressed;
}

// API endpoint to receive compressed data
app.post('/data', (req, res) => {
  const compressedData = req.body.data;
  const decompressedData = decompressString(compressedData);

  console.log('Received compressed data:', compressedData);
  console.log('Decompressed data:', decompressedData);

  // Process the decompressed data as needed
  // ...

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Client-side code
const axios = require('axios');

/**
 * Compresses a string using a simple run-length encoding algorithm.
 */
function compressString(input) {
  let compressed = '';
  let currentChar = '';
  let currentCount = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== currentChar) {
      if (currentCount > 0) {
        compressed += currentChar + currentCount;
      }
      currentChar = input[i];
      currentCount = 1;
    } else {
      currentCount++;
    }
  }

  compressed += currentChar + currentCount;
  return compressed;
}

// Example usage
const originalData = 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.';
const compressedData = compressString(originalData);

axios.post('http://localhost:3000/data', { data: compressedData })
  .then(() => {
    console.log('Data sent successfully!');
  })
  .catch((error) => {
    console.error('Error sending data:', error);
  });

/*
In this example, the client-side code compresses the text data using the compressString function and sends it to the server 
using an HTTP POST request. The server-side code receives the compressed data, decompresses it using the decompressString 
function, and then processes the decompressed data as needed.

The benefits of using this compression algorithm in a network communication scenario include:

    Reduced data transfer: By compressing the data before sending it over the network, you can significantly reduce the amount 
    of data being transmitted, resulting in faster transfer times and lower bandwidth usage.

    Improved network efficiency: Reducing the data size can improve the overall efficiency of the network, especially in scenarios 
    with limited bandwidth or high network congestion.

    Lower data usage: For mobile applications or scenarios with data caps, the reduced data transfer can lead to lower overall data usage, 
    which can be important for users.

    Lower server load: By reducing the amount of data that needs to be processed on the server-side, the compression can help lower the 
    server's computational load and improve its overall performance.

Of course, the actual performance benefits will depend on the specific use case, the size and complexity of the data being transmitted, and 
the network conditions. But in general, integrating a simple string compression algorithm like the one presented here can be a valuable optimization 
technique for network-based applications.*/
