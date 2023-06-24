// Return an English-translated sentence of the passed binary string.
function binaryAgent(str) {
  return str.split(' ')
            .map(b => String.fromCharCode(parseInt(b, 2)))
            .join('');
}
