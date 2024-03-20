var urlify = function(str, length) {
  // Trim the input string to remove leading/trailing spaces
  str = str.trim();

  var strArr = str.split('');
  var pointer = 0;
  while (pointer < str.length) {
    if (strArr[pointer] === ' ') {
      // Adjust the range of the inner loop
      for (var i = str.length - 1; i > pointer + 2; i--) {
        strArr[i] = str[i - 2];
      }
      strArr[pointer] = '%';
      strArr[pointer + 1] = '2';
      strArr[pointer + 2] = '0';
    }
    pointer++;
  }

  return strArr.join('');
};

console.log(urlify('Mr John Smith    ', 13), 'Mr%20John%20Smith'); 

// output
[
  'M', 'r', '%', '2', '0',
  'h', 'o', 'h', 'n', ' ',
  'S', 'm', 'i', 't', 'h',
  ' ', ' '
] 17
[
  'M', 'r', '%', '2', '0',
  'h', 'o', 'h', 'n', '%',
  '2', '0', 'i', 't', 'h',
  ' ', ' '
] 17
[
  'M', 'r', '%', '2', '0',
  'h', 'o', 'h', 'n', '%',
  '2', '0', 'i', 't', 'h',
  '%', '2', '0'
] 18
Mr%20hohn%20ith%20 Mr%20John%20Smith
