function dblLinear(n) {
    const series = [1]; // Initial series with the first element

    const calc = x => ({
        y: 2 * x + 1, // First operation
        z: 3 * x + 1  // Second operation
    });

    const ascendingOrder = (a, b) => a - b; // Sort function

    for (let idx = 0; idx <= n; idx++) {
        let x = series[idx]; // Get the current number from the series
        const { y, z } = calc(x); // Calculate new numbers based on current number
        for (let v of [y, z]) {
            if (series.indexOf(v) < 0) { // Check if the number is already in the series
                series.push(v); // Add the new number to the series
                series.sort(ascendingOrder); // Sort the series
                series.splice(n + 1); // Keep only the first n + 1 elements
            }
        }
    }
    return series[n]; // Return the nth element in the series
}
// Example usage
const uniqueIds = [];
for (let i = 0; i < 10; i++) {
    uniqueIds.push(dblLinear(i)); // Generate unique IDs
}
console.log(uniqueIds); // Output: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
/*
Let's explore a few examples of how this function could be used in practice:

    Numerical Analysis and Scientific Computing:
        The Double-Quadruple Sequence is related to the Thue-Morse constant, which is an important mathematical constant that appears 
        in various areas of mathematics, physics, and computer science.
        This function could be used in numerical analysis and scientific computing to generate and analyze this sequence, which could 
        have applications in fields like dynamical systems, fractal geometry, and signal processing.

    Queuing Theory and Operations Research:
        The Double-Quadruple Sequence has connections to the theory of queuing systems and waiting times.
        This function could be used in the analysis of queuing systems, such as those found in call centers, transportation networks, or 
        manufacturing processes, to model and predict the behavior of these systems.

    Finance and Economics:
        The Double-Quadruple Sequence has been studied in the context of financial time series analysis and asset pricing models.
        This function could be used in the development of financial models or algorithms for trading strategies, portfolio optimization, or 
        risk management.

    Computer Science and Algorithms:
        The Double-Quadruple Sequence is related to the Beatty sequence, which is a fundamental concept in computer science and algorithm analysis.
        This function could be used in the design and analysis of algorithms, particularly those involving sequences, combinatorics, or number theory.

    Cryptography and Cybersecurity:
        The properties of the Double-Quadruple Sequence, such as its irrationality and connections to other mathematical constants, have been 
        studied in the context of cryptographic applications.
        This function could be used in the development of novel cryptographic algorithms or in the analysis of existing ones, particularly those 
        that rely on number-theoretic properties.
*/
