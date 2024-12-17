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

One practical application of this function is in scenarios where you need to retrieve recent user activity or records from a data structure. 
The findKthToLast function is a powerful tool for efficiently accessing specific elements in a linked list. 
Its application in retrieving recent records, such as user logins, demonstrates its utility in real-world scenarios where data is sequentially stored.
For example:*/

class LoginRecord {
    constructor(timestamp) {
        this.timestamp = timestamp;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(timestamp) {
        const newNode = new LoginRecord(timestamp);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
}

const loginList = new LinkedList();
loginList.append('2024-12-01 10:00:00'); // Most recent
loginList.append('2024-12-01 09:00:00');
loginList.append('2024-12-01 08:00:00');
loginList.append('2024-12-01 07:00:00');

const k = 2; // find the login record that occurred 2 logins before the most recent one:
const kthLogin = findKthToLast(k, loginList);
console.log(kthLogin.timestamp); // Output: '2024-12-01 08:00:00'
