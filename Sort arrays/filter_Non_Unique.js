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

// =========================================================================================================================================================

const LinkedList = require("../util/LinkedListX");

function removeDuplicates(list) {
    const seenValues = new Set();
    let currentNode = list.head;
    let previousNode = null;

    while (currentNode) {
        if (seenValues.has(currentNode.value)) {
            // Duplicate found; remove it from the list
            previousNode.next = currentNode.next;
            currentNode.next = null; // Clean up reference
        } else {
            // Add value to the set and move previous pointer
            seenValues.add(currentNode.value);
            previousNode = currentNode;
        }
        currentNode = currentNode.next; // Move to the next node
    }

    return list;
}

// Example usage in a real-world application: cleaning up user input
function cleanUserInput(inputArray) {
    const uniqueList = new LinkedList();
    inputArray.forEach(item => uniqueList.append(item));
    return removeDuplicates(uniqueList)._toArray();
}

// Quick test
const userInput = [1, 5, 1, 6, 8, 6, 8, 8, 8, 8];
const cleanedInput = cleanUserInput(userInput);
console.log(cleanedInput); // Output: [1, 5, 6, 8]

/*
Real-World Application Example
Use Case: Cleaning User Input

In applications where user input is collected (e.g., survey responses, user preferences), duplicates can often arise. 
For example, when users submit their favorite items, they might accidentally select the same item multiple times. This could 
skew results or create unnecessary redundancy in a database.

By using the removeDuplicates function, we can ensure that we only store unique items. This is crucial for data integrity and can help in:

    Surveys: Ensuring unique responses.
    Shopping Carts: Preventing the same item from being added multiple times.
    User Preferences: Maintaining a clean list of chosen options.
*/
// A survey example
// Node class for the linked list
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// LinkedList class to manage survey responses
class LinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Method to convert linked list to array for easy testing and output
    _toArray() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.value);
            current = current.next;
        }
        return array;
    }
}

// Function to remove duplicates from a linked list
function removeDuplicates(list) {
    const seenValues = new Set();
    let currentNode = list.head;
    let previousNode = null;

    while (currentNode) {
        if (seenValues.has(currentNode.value)) {
            // Duplicate found; remove it from the list
            previousNode.next = currentNode.next;
            currentNode.next = null; // Clean up reference
        } else {
            // Add value to the set and move previous pointer
            seenValues.add(currentNode.value);
            previousNode = currentNode;
        }
        currentNode = currentNode.next; // Move to the next node
    }

    return list;
}

// Function to clean user input from an array
function cleanUserInput(inputArray) {
    const uniqueList = new LinkedList();
    inputArray.forEach(item => uniqueList.append(item));
    return removeDuplicates(uniqueList)._toArray();
}

// Example usage
const surveyResponses = [
    "Alice",
    "Bob",
    "Alice", // Duplicate
    "Charlie",
    "Bob",   // Duplicate
    "David"
];

const cleanedResponses = cleanUserInput(surveyResponses);
console.log(cleanedResponses); // Output: [ 'Alice', 'Bob', 'Charlie', 'David' ]

