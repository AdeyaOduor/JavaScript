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
