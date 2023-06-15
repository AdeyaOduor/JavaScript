//function taking a list of non-negative integers,strings and returns a new list with the strings filtered out.

function filter_list(l) {
    // Return a new array with the strings filtered out
    var filt = l.filter(function(x) {
      if (typeof(x) === 'number')
        return x;
    });
    return filt;
  }

// find first non consecutive number in an array

function firstNonConsecutive (arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] + 1 !== arr[i]) return arr[i];
    }
    return null;
}

// Split a String into an Array Using the split Method
function splitify(str) {
  
  return str.split(/\W/);
  
}

splitify("Hello World,I-am code");
