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
