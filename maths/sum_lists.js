/*
JavaScript code is intended to sum two linked lists representing numbers, where each node contains a single digit. 
The digits are stored in reverse order (i.e., the least significant digit is at the head of the list).

// LinkedList.js 
class LinkedList {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
module.exports = LinkedList;


/project-root
    /util
        LinkedList.js
        printList.js
*/

// main.js
var LinkedList = require('./../util/LinkedList');
var printList = require('./../util/printList');

var sumList = function(head1, head2) {
  
  var node1 = head1;
  var node2 = head2;
  var node3 = null;
  var head3 = null;
  
  var ones;
  var tens = 0;
  
  while (node1 !== null || node2 !== null) {
    var value1 = node1 ? node1.value : 0;
    var value2 = node2 ? node2.value : 0;
    
    var sum = value1 + value2 + tens;
    
    ones = sum % 10;
    tens = Math.floor(sum / 10);
    
    if (node3 === null) {
      head3 = new LinkedList(ones);
      node3 = head3;
    } else {
      node3.next = new LinkedList(ones);
      node3 = node3.next;
    }

    if (node1 !== null) {
      node1 = node1.next;
    }

    if (node2 !== null) {
      node2 = node2.next;
    }
  }
  
  if (tens > 0) {
    node3.next = new LinkedList(tens);
  }

  return head3;
};

/* TEST */

// Input: (7 -> 1 -> 6) + (5 -> 9 -> 2). this case refers to 617 + 295
// Output: 2 -> 1 -> 9. the answer refers to 912

var a = new LinkedList(7);
var b = new LinkedList(1);
var c = new LinkedList(6);
a.next = b;
b.next = c;

var d = new LinkedList(5);
var e = new LinkedList(9);
var f = new LinkedList(2);
d.next = e;
e.next = f;

var newHead = sumList(a, d);
printList(newHead);

// Additional test case
var a2 = new LinkedList(7);
var b2 = new LinkedList(1);
var c2 = new LinkedList(6);
a2.next = b2;
b2.next = c2;

var d2 = new LinkedList(5);
var e2 = new LinkedList(9);
var f2 = new LinkedList(9);
d2.next = e2;
e2.next = f2;

var newHead2 = sumList(a2, d2);
printList(newHead2);

/*Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument 
and returns the sum. For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.*/
const addTogether = ( a, ...arr ) =>
  typeof a !== "number" ? undefined
  : arr.length === 0 ? addT( a )
  : addT( a )( arr[0] )

const addT = a => b =>
  typeof b !== "number"  ? undefined
  : a + b

// Example: Suppose we have a list of monthly expenses
const monthlyExpenses = [1200, 250, 75, 150, 80];
const totalExpenses = addTogether(...monthlyExpenses);

console.log('Total monthly expenses:', totalExpenses);
// Output: Total monthly expenses: 1450
// -------------------------------------------------------------------------------------------
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : undefined;

// Extended addTogether function
const addTogether = (a, ...arr) => {
  // Check the first argument type
  if (typeof a !== "number") return undefined;

  let result = a;
  
  // Process the rest of the arguments
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'function') {
      // If the next argument is a function, apply it
      const operation = arr[i];
      // Ensure there is a number after the function
      if (i + 1 < arr.length && typeof arr[i + 1] === 'number') {
        result = operation(result, arr[i + 1]);
        i++; // Skip the next number since we've used it
      } else {
        return undefined; // Invalid sequence, function not followed by a number
      }
    } else if (typeof arr[i] === 'number') {
      // If the argument is a number, add it directly
      result = add(result, arr[i]);
    } else {
      return undefined; // Invalid argument type
    }
  }

  return result;
};

// Calculate 5 + 3 - 2 * 4 / 2
const result = addTogether(5, 3, subtract, 2, multiply, 4, divide, 2);
console.log(result); // Outputs: 5 + 5 - 2 * 4 / 2
