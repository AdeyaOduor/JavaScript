/*A prime number is a whole number greater than 1 with exactly two divisors: 1 and itself. For example, 
2 is a prime number because it is only divisible by 1 and 2. In contrast, 4 is not prime since it is divisible by 1, 2 and 4.*/
function sumPrimes(num) {
  // primes array with 0 and 1 set to false
  var primes = [false, false];
  
  // add every number up to given number to the primes array, and set true until proven false
  for (let i = 2; i <= num; i++) {
    primes[i] = true;
  }

  /* square root of given value is the limit for looping ignore any numbers known to be false, find primes using the Sieve of Eratosthenes
     loop from 2 to limit and check if prime */
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

/* Above is a Sieve of Eratosthenes algorithm to find the sum of all prime numbers up to a given number. 
This algorithm is a well-known and efficient method for finding prime numbers, and it has several real-world applications. Here are a few examples:

    Cryptography:
        In cryptography, prime numbers are essential for generating secure keys and encryption algorithms.
        The RSA (Rivest-Shamir-Adleman) algorithm, a widely used public-key cryptographic system, relies on the use of large prime numbers.
        The code provided can be used to generate large prime numbers or calculate the sum of primes, which can be useful in the implementation of 
        RSA and other cryptographic algorithms.

    Number Theory and Mathematics:
        Prime numbers have been a subject of fascination in number theory and mathematics for centuries.
        Mathematicians and researchers often study the distribution and properties of prime numbers, and the code provided can be used to explore these 
        concepts.
        For example, the code can be used to generate prime numbers or calculate the sum of primes up to a given limit, which can be useful in various 
        mathematical and analytical tasks.

    Pseudorandom Number Generation:
        Pseudorandom number generators (PRNGs) often use prime numbers as part of their underlying algorithms to generate random numbers.
        The code provided can be used to generate a list of prime numbers, which can then be incorporated into PRNG algorithms to enhance the randomness
        and security of the generated numbers. These random numbers have applications in simulations, gaming, cryptography, and other areas where 
        randomness is important.

    Data Compression and Encoding:
        Prime numbers can be used in data compression and encoding techniques, such as the Huffman coding algorithm.
        The code provided can be used to generate prime numbers, which can then be used as part of these compression and encoding algorithms to optimize
        the storage and transmission of data.

    Optimization and Algorithm Design:
        The Sieve of Eratosthenes algorithm used in the provided code is a fundamental algorithm in computer science and has numerous applications in 
        optimization and algorithm design. Researchers and developers can use the code as a starting point to explore and understand the Sieve of 
        Eratosthenes algorithm, which can then be applied to various optimization problems, such as finding the smallest set of prime factors for a 
        given number or identifying prime numbers in a range.

*/
