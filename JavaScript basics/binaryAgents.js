// Return an English-translated sentence of the passed binary string.
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
---------------------------------------------------------------------------------------------------------------------------------------------
// The binary values in the input string are converted into their respective ASCII characters, resulting in the following text string.
// "Aren't bonfires fun?!".

function stringToBinary(str) {
  let binaryCodes = '';
  
  for (let i = 0; i < str.length; i++) {
    const asciiCode = str.charCodeAt(i);
    const binaryCode = asciiCode.toString(2).padStart(8, '0');
    binaryCodes += binaryCode + ' ';
  }
  
  return binaryCodes.trim();
}

console.log(stringToBinary("Hello, world!"));
// Output
// "01001000 01100101 01101100 01101100 01101111 00101100 00100000 01110111 01101111 01110010 01101100 01100100 00100001".
