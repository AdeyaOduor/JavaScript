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

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Integrity Verifier</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .section {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        input, button {
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        .result {
            margin-top: 10px;
            padding: 10px;
            border-radius: 4px;
        }
        .success {
            background-color: #dff0d8;
            color: #3c763d;
        }
        .error {
            background-color: #f2dede;
            color: #a94442;
        }
        .file-list {
            margin-top: 20px;
        }
        .file-item {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>File Integrity Verifier</h1>
        
        <div class="section">
            <h2>Add File Hash</h2>
            <input type="text" id="fileName" placeholder="File name">
            <input type="text" id="fileHash" placeholder="Hash value">
            <button onclick="addFile()">Add File Hash</button>
            <div id="addResult" class="result"></div>
        </div>
        
        <div class="section">
            <h2>Verify File Integrity</h2>
            <input type="text" id="verifyFileName" placeholder="File name">
            <input type="text" id="verifyFileHash" placeholder="Expected hash">
            <button onclick="verifyFile()">Verify File</button>
            <div id="verifyResult" class="result"></div>
        </div>
        
        <div class="section">
            <h2>File List</h2>
            <button onclick="listFiles()">Refresh File List</button>
            <div id="fileList" class="file-list"></div>
        </div>
    </div>

    <script>
        // Implementation of the provided classes
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

            getAllKeys() {
                const keys = [];
                let current = this.head;
                while (current) {
                    keys.push(current.keyValPair[0]);
                    current = current.next;
                }
                return keys;
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
                const value = this.array[hash].find(key);
                if (value === null) {
                    throw new Error('Key does not exist');
                }
                return value;
            }

            delete(key) {
                const hash = getHash(key, this.limit);
                if (!this.array[hash]) {
                    throw new Error('Key does not exist');
                }
                this.array[hash].delete(key);
            }

            getAllKeys() {
                const keys = [];
                for (let i = 0; i < this.limit; i++) {
                    if (this.array[i]) {
                        keys.push(...this.array[i].getAllKeys());
                    }
                }
                return keys;
            }
        }

        // Create a global hash table instance
        const fileHashTable = new HashTable();

        // Function to add a file hash
        function addFile() {
            const fileName = document.getElementById('fileName').value;
            const fileHash = document.getElementById('fileHash').value;
            const resultDiv = document.getElementById('addResult');
            
            if (!fileName || !fileHash) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = 'Please provide both file name and hash value.';
                return;
            }
            
            try {
                fileHashTable.insert(fileName, fileHash);
                resultDiv.className = 'result success';
                resultDiv.innerHTML = `File "${fileName}" added successfully with hash: ${fileHash}`;
                
                // Clear input fields
                document.getElementById('fileName').value = '';
                document.getElementById('fileHash').value = '';
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `Error: ${error.message}`;
            }
        }

        // Function to verify a file
        function verifyFile() {
            const fileName = document.getElementById('verifyFileName').value;
            const expectedHash = document.getElementById('verifyFileHash').value;
            const resultDiv = document.getElementById('verifyResult');
            
            if (!fileName || !expectedHash) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = 'Please provide both file name and expected hash value.';
                return;
            }
            
            try {
                const actualHash = fileHashTable.retrieve(fileName);
                const isMatch = actualHash === expectedHash;
                
                if (isMatch) {
                    resultDiv.className = 'result success';
                    resultDiv.innerHTML = `✓ File integrity verified! Hash matches: ${actualHash}`;
                } else {
                    resultDiv.className = 'result error';
                    resultDiv.innerHTML = `✗ File integrity check failed! Expected: ${expectedHash}, Actual: ${actualHash}`;
                }
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `Error: ${error.message}`;
            }
        }

        // Function to list all files
        function listFiles() {
            const fileListDiv = document.getElementById('fileList');
            const keys = fileHashTable.getAllKeys();
            
            if (keys.length === 0) {
                fileListDiv.innerHTML = '<p>No files in the database.</p>';
                return;
            }
            
            let html = '<h3>Stored Files:</h3><ul>';
            for (const key of keys) {
                try {
                    const hash = fileHashTable.retrieve(key);
                    html += `<li class="file-item"><strong>${key}</strong>: ${hash}</li>`;
                } catch (error) {
                    html += `<li class="file-item error">Error retrieving ${key}: ${error.message}</li>`;
                }
            }
            html += '</ul>';
            
            fileListDiv.innerHTML = html;
        }

        // Initialize with some example data
        fileHashTable.insert("document.txt", "a1b2c3d4e5f6");
        fileHashTable.insert("image.jpg", "f6e5d4c3b2a1");
        fileHashTable.insert("script.js", "1a2b3c4d5e6f");
    </script>
</body>
</html>
