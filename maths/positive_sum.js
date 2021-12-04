// You get an array of numbers, return the sum of all of the positives ones.

function positiveSum(arr) {
    var sum = 0;
    for(var i = 0; i < arr.length; i++) {
      if(arr[i] > 0) {
       sum += arr[i];
     }
    }
   return sum;
   }

// method 2

function positiveSum(arr) {
    let b= arr.filter(a => a>=0)
    let c= b.reduce((a,b)=> a+=b, 0)
    return c
    } 