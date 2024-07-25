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
