var LinkedList = require('./../util/LinkedList');
var printList = require('./../util/printList');

var sumList = function(head1, head2) {
  
  var node1 = head1;
  var node2 = head2;
  var node3 = null;
  var head3 = null;
  
  var ones;
  var tens = 0;
  var sum;
  
  while (node1 !== null && node2 !== null) {
    if (node1 === null) {
      sum = node2.value;
    } else if (node2 === null) {
      sum = node1.value;
    } else {
      sum = node1.value + node2.value;
    }

    sum += tens;
    ones = sum % 10;
    if (node3 === null) {
      head3 = new LinkedList(ones);
      node3 = head3;
    } else {
      node3.next = new LinkedList(ones);
      node3 = node3.next;
    }

    tens = Math.floor(sum / 10);

    if (node1 !== null) {
      node1 = node1.next;
    }

    if (node2 !== null) {
      node2 = node2.next;
    }

  }
  if (tens > 0) {
    node3.next = new LinkedList(tens);
    node3 = node3.next;
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

// Input: (7 -> 1 -> 6) + (5 -> 9 -> 9). this case refers to 617 + 995
// Output: 2 -> 1 -> 9. the answer refers to 1612

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

/*Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument 
and returns the sum. For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.*/
const addTogether = ( a, ...arr ) =>
  typeof a !== "number" ? undefined
  : arr.length === 0 ? addT( a )
  : addT( a )( arr[0] )

const addT = a => b =>
  typeof b !== "number"  ? undefined
  : a + b
// ---------------------------------------------------------------------------------
// Suppose we have a list of monthly expenses
const addTogether = ( a, ...arr ) =>
  typeof a !== "number" ? undefined
  : arr.length === 0 ? addT( a )
  : addT( a )( arr[0] )

const addT = a => b =>
  typeof b !== "number"  ? undefined
  : a + b

// Now use the addTogether function
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

  // Define the operation to use
  let operation = add;
  if (arr.length > 0) {
    operation = arr.shift();
    if (typeof operation !== "function") {
      return undefined;
    }
  }

  // Base case: apply the operation to the first argument
  if (arr.length === 0) {
    return operation(a);
  }

  // Recursive case: apply the operation to the first argument and the next argument
  return operation(a, arr[0]) && addTogether(operation(a, arr[0]), ...arr.slice(1));
};

// Calculate 5 + 3 - 2 * 4 / 2
const result = addTogether(5, 3, subtract, 2, multiply, 4, divide, 2);
console.log(result);
