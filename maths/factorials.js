// product of all positive integers less than or equal to x

function factorial(x, runningTotal = 1 ) {
   return x == 0 ? runningTotal : factorial( x-1, x*runningTotal);
}

console.log(factorial(10))
