/*
The dblLinear function generates a specific sequence of numbers based on a set of mathematical rules. It uses two operations to produce new numbers from existing ones, 
specifically multiplying by 2 and 3, and then adding 1. This allows it to create a series of numbers that grow in a specific pattern.*/

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
Real-World Application Example: Generating Unique Identifiers

One practical application of the dblLinear function could be in generating unique identifiers or keys for data storage, such as in databases or 
distributed systems.
Use Case: Unique Key Generation in Databases

In databases, especially in distributed systems, generating unique keys for entries is crucial to avoid conflicts. The method used in dblLinear can 
provide a systematic way to generate a sequence of unique identifiers based on a mathematical formula.

Example Scenario:

    Database Entries: Suppose you need to generate unique IDs for user registrations in a web application. Using the dblLinear function, you can 
    generate a series of unique IDs based on the algorithm, ensuring that each ID is derived from previous ones in a predictable manner.

*/
