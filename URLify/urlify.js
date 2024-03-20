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

console.log(urlify('Mr John Smith    ', 13), 'Mr%20John%20Smith'); // output Mr%20John%20i Mr%20John%20Smith
---------------------------------------------------------------------------------------------------------------------------
//OR

function urlify(str, len) {
  let s = "";
  let totalSpaces = str.length - len;
  let frontSpaces = 0;
  let flag = false;
  for (let i = 0; i < str.length; i++) {
    if (flag === false) {
      if (str[i] === " ") frontSpaces++;
      else flag = true;
    }
    if (flag === true && i < str.length - (totalSpaces - frontSpaces)) {
      if (str[i] === " ") s += "%20";
      else s += str[i];
    }
  }

  return s;
}

console.log(urlify("Mr John Smith   ", 13)); //Output Mr%20John%20Smith

