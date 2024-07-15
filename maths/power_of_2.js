// JavaScript function to test if a number is a power of 2

function power_of_2(n) {
 if (typeof n !== 'number') 
      return 'Not a number'; 

    return n && (n & (n - 1)) === 0;
}

console.log(power_of_2(16));
console.log(power_of_2(18));
console.log(power_of_2(256));

/* output
true
false
true */
---------------------------------------------------------------------------
function raiseToPower(b, e) {
  return Math.pow(b, e);
}

let base = 2;
let exp = 3;
let power = raiseToPower(base, exp);
console.log(power); // output is 8
/*
Let's explore a few examples:

    Scientific and Engineering Calculations:
        In science and engineering, many calculations involve raising numbers to powers, such as calculations in physics (e.g., energy, force, power), chemistry (e.g., reaction rates, equilibrium constants), and mathematics (e.g., exponential growth and decay, logarithmic functions).
        The raiseToPower function could be used to automate these calculations, making them more efficient and less prone to human error.

    Financial Modeling and Projections:
        In financial planning and analysis, the raiseToPower function can be used to calculate compound interest, future value, and other financial metrics that involve exponential growth or decay.
        For example, when calculating the future value of an investment or the growth of a portfolio, the raiseToPower function can be used to accurately project the end value based on the initial investment, interest rate, and time period.

    Cryptography and Encryption:
        In the field of cryptography, raising numbers to powers is a fundamental operation in various encryption algorithms, such as the RSA (Rivest-Shamir-Adleman) algorithm.
        The raiseToPower function could be used as a building block in implementing these encryption algorithms, ensuring the accurate calculation of the ciphertext or other cryptographic operations.

    Computer Graphics and Rendering:
        In computer graphics and 3D rendering, raising numbers to powers is often used in transformations, such as scaling, rotation, and projection.
        The raiseToPower function could be used to efficiently calculate these transformations, which are essential for creating realistic and visually appealing 3D scenes and animations.

    Optimization and Simulation Modeling:
        In optimization algorithms and simulation models, raising numbers to powers is a common operation, particularly in functions involving exponential or polynomial relationships.
        The raiseToPower function could be used to improve the accuracy and performance of these optimization and simulation techniques, which are widely used in fields like operations research, engineering, and decision-making.

    Data Analysis and Visualization:
        In data analysis and visualization, raising numbers to powers can be used to transform data, such as in the calculation of logarithmic scales or the application of power transformations (e.g., Box-Cox transformation) to improve the linearity of data.
        The raiseToPower function could be integrated into data analysis and visualization tools to provide users with a convenient way to apply these transformations to their data.
*/
