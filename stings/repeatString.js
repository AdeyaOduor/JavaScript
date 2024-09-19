/*
The repeatStringNumTimes function recursively repeats a given string a specified number of times. 
This functionality has several practical applications in programming, particularly in scenarios where string manipulation is required. */

function repeatStringNumTimes(str, num) {
  return num > 0 ? str + repeatStringNumTimes(str, num - 1) : '';
}
