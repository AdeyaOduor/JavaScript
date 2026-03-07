var RomanNumerals = {
  toRoman: function (number) {
    if (typeof number !== 'number' || number <= 0 || number > 3999) {
      throw new Error("Input must be a positive integer between 1 and 3999.");
    }
    
    var ret = '';
    while (number > 0) {
      if (number >= 1000) {
        ret += 'M';
        number -= 1000;
      } else if (number >= 900) {
        ret += 'CM';
        number -= 900;
      } else if (number >= 500) {
        ret += 'D';
        number -= 500;
      } else if (number >= 400) {
        ret += 'CD';
        number -= 400;
      } else if (number >= 100) {
        ret += 'C';
        number -= 100;
      } else if (number >= 90) {
        ret += 'XC';
        number -= 90;
      } else if (number >= 50) {
        ret += 'L';
        number -= 50;
      } else if (number >= 40) {
        ret += 'XL';
        number -= 40;
      } else if (number >= 10) {
        ret += 'X';
        number -= 10;
      } else if (number >= 9) {
        ret += 'IX';
        number -= 9;
      } else if (number >= 5) {
        ret += 'V';
        number -= 5;
      } else if (number >= 4) {
        ret += 'IV';
        number -= 4;
      } else if (number >= 1) {
        ret += 'I';
        number -= 1;
      } 
    }
    return ret;
  },

  fromRoman: function (str) {
    if (typeof str !== 'string') {
      throw new Error("Input must be a string.");
    }
    
    var ret = 0;
    var i = 0;
  
    while (i < str.length) {
      switch (str.charAt(i)) {
        case 'M':
          ret += 1000;
          i++;
          break;
        case 'D':
          ret += 500;
          i++;
          break;
        case 'L':
          ret += 50;
          i++;
          break;
        case 'C':
          if (i + 1 < str.length && (str.charAt(i + 1) === 'M' || str.charAt(i + 1) === 'D')) {
            ret += (str.charAt(i + 1) === 'M') ? 900 : 400;
            i += 2; // move past the next character
          } else {
            ret += 100;
            i++;
          }
          break;
        case 'X':
          if (i + 1 < str.length && (str.charAt(i + 1) === 'C' || str.charAt(i + 1) === 'L')) {
            ret += (str.charAt(i + 1) === 'C') ? 90 : 40;
            i += 2;
          } else {
            ret += 10;
            i++;
          }
          break;
        case 'V':
          ret += 5;
          i++;
          break;
        case 'I':
          if (i + 1 < str.length && (str.charAt(i + 1) === 'X' || str.charAt(i + 1) === 'V')) {
            ret += (str.charAt(i + 1) === 'X') ? 9 : 4;
            i += 2;
          } else {
            ret += 1;
            i++;
          }
          break;
        default:
          throw new Error("Invalid Roman numeral character.");
      }
    }
    return ret;
  }
};

// Example usage
console.log(RomanNumerals.toRoman(2026)); // MCMXC
console.log(RomanNumerals.fromRoman('MCMXC')); // 1990
