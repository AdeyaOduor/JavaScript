const LinkedList = require("../util/LinkedListX");

var findKthToLast = function(k, list) {
  let fast = list.head; // Initialize fast pointer
  let slow = list.head; // Initialize slow pointer

  // Move fast pointer k steps ahead
  for (let i = 0; i < k; i++) {
    if (fast === null) return null; // If k is larger than the length of the list
    fast = fast.next;
  }

  // Move both pointers until fast reaches the end
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next; // Move slow pointer
  }

  return slow; // Slow is now at the kth node from the end
};

/*
Real-World Application: Retrieving Recent Records

One practical application of this function is in scenarios where you need to retrieve recent user activity 
or records from a data structure. For example:*/
