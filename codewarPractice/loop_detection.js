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

// network monitoring tool that analyzes packet routes:
const routeA = new ListNode('Router A');
const routeB = new ListNode('Router B');
const routeC = new ListNode('Router C');
const routeD = new ListNode('Router D');

routeA.next = routeB;
routeB.next = routeC;
routeC.next = routeD;
routeD.next = routeB; // Creates a loop back to Router B

const loopNode = loopDetection(routeA);
if (loopNode) {
    console.log(`Loop detected at: ${loopNode.value}`); // Output: Loop detected at: Router B
} else {
    console.log('No loop detected.');
}

/*
Real-World Application: Detecting Cycles in Data Streams

One practical application of the loopDetection function is in monitoring and managing data streams, particularly in systems that process 
linked data structures such as real-time analytics, event processing, or network packets.
Use Case: Network Packet Analysis

In a networking context, data packets can traverse through nodes (like routers) in a network. If there’s a cycle in the routing paths due 
to misconfiguration, packets can get stuck in an infinite loop, leading to resource exhaustion and network congestion.

    Detecting Routing Loops:
        By representing the routing paths as a linked list, where each node represents a router and each link indicates the next router to which 
        a packet is sent, you can use the loopDetection function to identify if a packet is caught in a loop.

    Preventing Resource Exhaustion:
        Upon detecting a loop, the system can log the issue, alert network administrators, and take corrective actions, such as rerouting packets 
        or adjusting routing tables.
*/
