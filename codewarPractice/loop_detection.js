class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const loopDetection = (head) => {
    // Handle lists with no loops
    if (!head || !head.next) return null;

    let slow = head;
    let fast = head;

    // Detect loop using the Floyd's Cycle detection algorithm
    do {
        slow = slow.next; // Move slow pointer by one
        fast = fast.next; // Move fast pointer by two
        if (!fast || !fast.next) return null; // If fast reaches the end, no loop
        fast = fast.next;
    } while (slow !== fast);

    // Find the start of the loop
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow; // Return the node where the loop starts
};

// Example Usage

// Create a linked list with a loop: A -> B -> C -> D -> E -> C
const a = new ListNode('A');
const b = new ListNode('B');
const c = new ListNode('C');
const d = new ListNode('D');
const e = new ListNode('E');

a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = c; // Creates a loop back to C

console.log(loopDetection(a) === c); // Output: true (loop starts at C)

// Create a linked list without a loop: A -> B -> C -> D -> E -> F
const A = new ListNode('A');
const B = new ListNode('B');
const C = new ListNode('C');
const D = new ListNode('D');
const E = new ListNode('E');
const F = new ListNode('F');

A.next = B;
B.next = C;
C.next = D;
D.next = E;
E.next = F;

console.log(loopDetection(A) === null); // Output: true (no loop)
