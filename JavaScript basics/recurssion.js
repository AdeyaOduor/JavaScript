const LinkedList = require('./../util/LinkedList')
const printList = require('./../util/printList')

function sumLinkedLists(node1, node2, carry=0){
  if(!node1 && !node2 && carry===0){
    return null
  }
  let value = carry
  value += node1 ? node1.value : 0
  value += node2 ? node2.value : 0
  const node  = new LinkedList(value%10)
  node.next = sumLinkedLists(
    node1 ? node1.next : null,
    node2 ? node2.next : null,
    value > 10 ? 1 : 0)
  return node
}

// Input: (7 -> 1 -> 6) + (5 -> 9 -> 2). this case refers to 617 + 295
// Output: 2 -> 1 -> 9. the answer refers to 912

var a = new LinkedList(7)
var b = new LinkedList(1)
var c = new LinkedList(6)

a.next = b
b.next = c

var d = new LinkedList(5)
var e = new LinkedList(9)
var f = new LinkedList(2)

d.next = e
e.next = f

printList(sumLinkedLists(a,d))

// The sumLinkedLists function is designed to add two numbers represented as linked lists. Each node contains a single digit, and the digits are stored in reverse order. This approach has several real-world applications, particularly in scenarios where large numbers are handled or when using linked lists for data structure manipulation. Here are some practical applications with examples:
// 1. Handling Large Numbers in Financial Applications

// In financial applications, you might need to perform arithmetic operations on very large numbers, such as account balances or transaction amounts, which can exceed standard number limits.

// Example:
// Linked lists representing large numbers
var num1 = new LinkedList(9);
num1.next = new LinkedList(9); // Represents 99

var num2 = new LinkedList(1); // Represents 1

// Sum: 99 + 1 = 100
console.log(printList(sumLinkedLists(num1, num2))); // Output: 0 -> 0 -> 1 (represents 100)

// 2. Data Structure for Polynomial Arithmetic

// Linked lists can be used to represent polynomials, where each node represents a coefficient and an exponent. The sumLinkedLists function can be adapted to add two polynomial expressions.

// Example:
// Polynomial: 2x^2 + 3x + 5 represented as a linked list
var poly1 = new LinkedList(2);
poly1.next = new LinkedList(3);
poly1.next.next = new LinkedList(5); // Represents 2x^2 + 3x + 5

// Polynomial: 4x^2 + 1 represented as a linked list
var poly2 = new LinkedList(4);
poly2.next = new LinkedList(1); // Represents 4x^2 + 1

// Sum: (2x^2 + 3x + 5) + (4x^2 + 1) = 6x^2 + 3x + 6
console.log(printList(sumLinkedLists(poly1, poly2))); // Outputs the sum
