/*A prime number is a whole number greater than 1 with exactly two divisors: 1 and itself. For example, 
2 is a prime number because it is only divisible by 1 and 2. In contrast, 4 is not prime since it is divisible by 1, 2 and 4.*/
function sumPrimes(num) {
  // primes array with 0 and 1 set to false
  var primes = [false, false];
  
  // add every number up to given number to the primes array
  // and set true until proven false
  for (let i = 2; i <= num; i++) {
    primes[i] = true;
  }

  // square root of given value is the limit for looping
  // ignore any numbers known to be false
  // find primes using the Sieve of Eratosthenes
  // loop from 2 to limit and check if prime
  let limit = Math.sqrt(num);
  for (let j = 2; j < num; j++) {
    if (primes[j] === true) {
      for (let k = j * j; k <= num; k += j) {
        primes[k] = false;
      }
    }
  }
  
  // add everything set to true with reduce
  let primesum = primes.reduce((sum, boo, index) => {
    if (boo === true) {
      return sum + index;
    } else {
      return sum;
    }
  });

  return primesum;
}

sumPrimes(977);
