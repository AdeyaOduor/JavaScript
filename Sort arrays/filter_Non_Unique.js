//program to filter out the non-unique values in an array.
const filter_Non_Unique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

console.log(filter_Non_Unique([1, 2, 2, 3, 4, 4, 5]));  // Outputs: [1, 3, 5]
console.log(filter_Non_Unique([1, 2, 3, 4]));            // Outputs: [1, 2, 3, 4]  

/* The function filters an array to return only the elements that are unique (i.e., appear exactly once).
    It checks each element's first occurrence (indexOf) against its last occurrence (lastIndexOf). If they are the same, the element is unique.

 Example Scenario
Context: Product Inventory Management

    Inventory List:
        A retail store maintains a list of product IDs in its inventory. Each ID represents a unique product. However, due to various reasons (returns, restocking, etc.), some IDs may appear multiple times.

    Objective:
        The store manager wants to identify which products are truly unique in the inventory to ensure they are listed correctly for sales and stock tracking.
*/
const productIDs = [101, 202, 202, 303, 404, 404, 505];

const uniqueProducts = filter_Non_Unique(productIDs);
console.log(uniqueProducts);  // Outputs: [101, 303, 505]

/*
Explanation of Output

    Input IDs:
        The input array [101, 202, 202, 303, 404, 404, 505] contains product IDs where 202 and 404 are duplicates.

    Filtered Unique IDs:
        After applying the filter_Non_Unique function, we get [101, 303, 505].
        These IDs are unique, meaning they only appear once in the inventory list.

Real-World Application

    Stock Management: The output can be used to generate reports for stock availability, ensuring only unique items are considered for sales.
    Sales Reporting: Unique product IDs can be prioritized in sales reports to analyze which products are not duplicated in stock.
    Inventory Audits: During inventory audits, focusing on unique IDs helps to streamline the verification process, reducing confusion over duplicates.
*/
