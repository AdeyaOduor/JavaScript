//square every digit of a number and concatenate them.
  function squareDigits(num){
    
    let numArray = Array.from(String(num),Number)
    let result = ''
    for(let i=0; i<numArray.length;i++){
      result +=  numArray[i]**2
    }
    return parseInt(result)
  }
console.log(squareDigits(9119)); // Output: 811181
/*
    The function squareDigits(num) takes a number num as input.
    The function converts the number to a string, then uses Array.from() to create an array of individual digits, 
    with each digit converted to a number using Number.
        For the input 9119, the resulting array is [9, 1, 1, 9].
    The function then iterates through the array, squaring each digit using the ** operator.
        The squared digits are concatenated into a new string: "81181".
    Finally, the function converts the string back to an integer using parseInt() and returns the result.
        The final output for the input 9119 is 811181.
*/
