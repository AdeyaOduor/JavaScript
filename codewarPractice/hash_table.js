// Hashes verify file integrity

class LinkedListNode {
    constructor(key, value) {
        this.keyValPair = [key, value];
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(key, value) {
        const newNode = new LinkedListNode(key, value);
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

    find(key) {
        let current = this.head;
        while (current) {
            if (current.keyValPair[0] === key) {
                return current.keyValPair[1];
            }
            current = current.next;
        }
        return null;
    }

    replace(key, value) {
        let current = this.head;
        while (current) {
            if (current.keyValPair[0] === key) {
                current.keyValPair[1] = value;
                return;
            }
            current = current.next;
        }
    }

    delete(key) {
        if (!this.head) return;

        if (this.head.keyValPair[0] === key) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.keyValPair[0] === key) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }
}

const getHash = (key, limit) => {
    if (typeof key !== 'string') {
        throw new Error('Key must be a string');
    }
    let hash = 0;
    for (let char of key) {
        hash += char.charCodeAt(0);
    }
    return hash % limit;
};

class HashTable {
    constructor(limit = 8) {
        this.array = new Array(limit);
        this.limit = limit;
    }

    insert(key, value) {
        const hash = getHash(key, this.limit);
        if (!this.array[hash]) {
            this.array[hash] = new LinkedList();
        }
        this.array[hash].insert(key, value);
    }

    retrieve(key) {
        const hash = getHash(key, this.limit);
        if (!this.array[hash]) {
            throw new Error('Key does not exist');
        }
        return this.array[hash].find(key);
    }

    delete(key) {
        const hash = getHash(key, this.limit);
        if (!this.array[hash]) {
            throw new Error('Key does not exist');
        }
        this.array[hash].delete(key);
    }
}

// Example of Application: Verifying File Integrity
const fileHashTable = new HashTable();

// Simulating file integrity verification
const addFileHash = (fileName, hashValue) => {
    fileHashTable.insert(fileName, hashValue);
};

const verifyFileIntegrity = (fileName, expectedHash) => {
    try {
        const actualHash = fileHashTable.retrieve(fileName);
        return actualHash === expectedHash;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

// Adding file hashes
addFileHash('file1.txt', 'abc123hash');
addFileHash('file2.txt', 'def456hash');

// Verifying file integrity
console.log(verifyFileIntegrity('file1.txt', 'abc123hash')); // Output: true
console.log(verifyFileIntegrity('file2.txt', 'wronghash'));  // Output: false

/*Example Application: Verifying File Integrity

In this example, the hash table is used to store file names and their corresponding hash values. This is useful in scenarios like verifying the 
integrity of files after transfer or storage.
Use Case

    Adding File Hashes: When files are uploaded or stored, their names and hash values are inserted into the hash table for later verification.
    Verifying Integrity: When a file is accessed, the system checks its hash against the stored hash value to ensure it hasn't been altered or 
    corrupted.
*/
