function findOdd(arr) {
    return arr.find((item, index) => arr.filter(el => el == item).length % 2)
  };

// Sample customer visit data
const customerVisits = [10, 8, 12, 6, 15, 8, 12, 6, 15, 6];

// Find the customer segment with an odd number of visits
const oddVisits = findOdd(customerVisits);

console.log("Customers with an odd number of visits:", oddVisits); // 10

/*
By identifying the customer segment with an odd number of visits, you can then further investigate this group to understand why they might 
be visiting the store in a different pattern compared to the rest of the customers. This could lead to valuable insights, such as:

    The odd-visit customers might be a niche or underserved segment that the business could target with specific marketing campaigns or product 
    offerings.
    The odd-visit customers might have unique needs or preferences that the business could address to improve their overall experience and 
    potentially increase their loyalty.
    The odd-visit pattern could be indicative of a specific life event or circumstance that affects this group of customers, which the business
    could learn from to better serve all of its customers.

By leveraging the findOdd function in your data analysis, you can efficiently identify these potentially interesting customer segments and dive 
deeper into understanding their behavior and needs. This type of insight can then be used to inform strategic decision-making and drive business 
growth.*/
-----------------------------------------------------------------------------------------------------

// method 2
function odds(values){
 
    return values.filter(values => values % 2 !== 0 );
    }
    
console.log(odds([1, 2, 3, 4, 5, 6, 7, 8, 9])); // [ 1, 3, 5, 7, 9 ]

/*
1. findOdd(arr) function:
The findOdd function uses the find() and filter() methods to find the first element in the array that has an odd number of occurrences. 
This can be useful in the following scenarios:

a. Voting systems: In some voting systems, a single winner is determined by having the majority of votes. If there is a tie, the function 
could be used to find the element (candidate) that has an odd number of votes, which could be considered the winner.

b. Data analysis: In data analysis, you might have a dataset with various categories or groups, and you want to find the category that has 
an odd number of elements. This could be useful for identifying outliers or anomalies in the data.

c. Error detection: Imagine you have a system that generates a sequence of numbers, and you want to detect if there is an error in the sequence. 
The findOdd function could be used to identify the number that has an odd number of occurrences, which could indicate a problem in the data.

2. odds(values) function:
The odds function uses the filter() method to create a new array containing only the odd numbers from the input array. This can be useful in the 
following scenarios:

a. Statistical analysis: In statistical analysis, you might need to perform calculations or operations only on the odd numbers in a dataset, such 
as calculating the mean, median, or variance of the odd numbers.

b. Numerical simulations: In numerical simulations or mathematical modeling, you might need to work with only the odd numbers in a dataset, such 
as when simulating the behavior of a system that involves odd numbers.

c. Cryptography: In cryptography, some algorithms or techniques may require working with odd numbers, and the odds function could be used to extract 
the odd numbers from a dataset for further processing.

d. Optimization problems: In some optimization problems, you might need to work with only the odd numbers in a dataset, such as when trying to find 
the optimal arrangement of objects with odd dimensions.*/
