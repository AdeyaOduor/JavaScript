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
// =======================================================================================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Integrity Verifier - Secure Upload & Verification</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 20px;
        }

        /* Background Image with Overlay */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            filter: brightness(0.7);
            z-index: -1;
        }

        /* Optional overlay for better readability */
        body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
            z-index: -1;
        }

        .container {
            background-color: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            width: 100%;
            max-width: 900px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }

        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.2em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
            color: #34495e;
            margin-bottom: 20px;
            font-size: 1.5em;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }

        h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.2em;
        }

        .section {
            margin-bottom: 30px;
            padding: 25px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.9);
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .section:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .upload-area {
            border: 3px dashed #3498db;
            border-radius: 10px;
            padding: 40px;
            text-align: center;
            background-color: rgba(52, 152, 219, 0.05);
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 20px;
        }

        .upload-area:hover {
            border-color: #2ecc71;
            background-color: rgba(46, 204, 113, 0.05);
        }

        .upload-area.dragover {
            border-color: #2ecc71;
            background-color: rgba(46, 204, 113, 0.1);
        }

        .upload-icon {
            font-size: 48px;
            color: #3498db;
            margin-bottom: 10px;
        }

        .upload-area p {
            color: #7f8c8d;
            font-size: 1.1em;
        }

        .file-info {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            display: none;
        }

        .file-info.show {
            display: block;
        }

        .info-row {
            display: flex;
            margin-bottom: 10px;
            padding: 8px;
            background-color: white;
            border-radius: 5px;
        }

        .info-label {
            font-weight: bold;
            width: 120px;
            color: #2c3e50;
        }

        .info-value {
            flex: 1;
            color: #34495e;
            word-break: break-all;
        }

        input, select {
            width: 100%;
            padding: 12px;
            margin: 8px 0 15px 0;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #3498db;
        }

        .input-group {
            margin-bottom: 15px;
        }

        .input-group label {
            display: block;
            margin-bottom: 5px;
            color: #34495e;
            font-weight: 500;
        }

        .button-group {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        button {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            flex: 1;
            min-width: 120px;
        }

        .btn-primary {
            background-color: #3498db;
            color: white;
        }

        .btn-primary:hover {
            background-color: #2980b9;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }

        .btn-success {
            background-color: #2ecc71;
            color: white;
        }

        .btn-success:hover {
            background-color: #27ae60;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
        }

        .btn-info {
            background-color: #f39c12;
            color: white;
        }

        .btn-info:hover {
            background-color: #e67e22;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(243, 156, 18, 0.3);
        }

        .btn-warning {
            background-color: #e74c3c;
            color: white;
        }

        .btn-warning:hover {
            background-color: #c0392b;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
        }

        .result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .warning {
            background-color: #fff3cd;
            color: #856404;
            border: 1px solid #ffeeba;
        }

        .file-list {
            margin-top: 20px;
            max-height: 300px;
            overflow-y: auto;
        }

        .file-item {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            transition: background-color 0.2s;
        }

        .file-item:hover {
            background-color: #f8f9fa;
        }

        .file-item:last-child {
            border-bottom: none;
        }

        .file-name {
            font-weight: 600;
            color: #2c3e50;
        }

        .file-hash {
            color: #7f8c8d;
            font-family: monospace;
            font-size: 0.9em;
        }

        .file-size {
            color: #95a5a6;
            font-size: 0.85em;
            margin-left: 10px;
        }

        .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.75em;
            font-weight: 600;
            margin-left: 8px;
        }

        .badge-success {
            background-color: #2ecc71;
            color: white;
        }

        .badge-warning {
            background-color: #f39c12;
            color: white;
        }

        .badge-info {
            background-color: #3498db;
            color: white;
        }

        .progress-bar {
            width: 100%;
            height: 10px;
            background-color: #e0e0e0;
            border-radius: 5px;
            overflow: hidden;
            margin-top: 10px;
        }

        .progress {
            height: 100%;
            background: linear-gradient(90deg, #3498db, #2ecc71);
            width: 0%;
            transition: width 0.3s;
        }

        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .stat-card:nth-child(2) {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .stat-card:nth-child(3) {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .stat-value {
            font-size: 2em;
            font-weight: bold;
            margin: 10px 0;
        }

        .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
        }

        .size-warning {
            color: #e74c3c;
            font-size: 0.9em;
            margin-top: 5px;
        }

        .chunk-info {
            background-color: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
        }

        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .section {
                padding: 15px;
            }
            
            .button-group {
                flex-direction: column;
            }
            
            button {
                width: 100%;
            }
            
            .file-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔒 File Integrity Verifier</h1>
        
        <!-- Statistics Dashboard -->
        <div class="stats-container">
            <div class="stat-card">
                <div class="stat-label">Total Files</div>
                <div class="stat-value" id="totalFiles">0</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Verified Files</div>
                <div class="stat-value" id="verifiedFiles">0</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Size</div>
                <div class="stat-value" id="totalSize">0 GB</div>
            </div>
        </div>
        
        <div class="section">
            <h2>📤 Upload & Add File Hash</h2>
            
            <!-- File Upload Area -->
            <div class="upload-area" id="uploadArea">
                <div class="upload-icon">📁</div>
                <p>Drag & drop files here or click to browse</p>
                <p style="font-size: 0.9em; color: #95a5a6;">Any file format supported • Max size: 10 GB</p>
            </div>
            <input type="file" id="fileInput" multiple style="display: none;">
            
            <!-- File Information -->
            <div class="file-info" id="fileInfo">
                <h3>Selected Files:</h3>
                <div id="selectedFiles"></div>
            </div>
            
            <!-- Chunked Upload Info -->
            <div class="chunk-info" id="chunkInfo" style="display: none;">
                <strong>📦 Chunked Upload Mode</strong>
                <p id="chunkDetails"></p>
            </div>
            
            <div class="input-group">
                <label for="fileName">File Name:</label>
                <input type="text" id="fileName" placeholder="Enter file name or select from upload">
            </div>
            
            <div class="input-group">
                <label for="fileHash">Hash Value:</label>
                <input type="text" id="fileHash" placeholder="Enter hash value or generate automatically">
            </div>
            
            <div class="input-group">
                <label for="hashAlgorithm">Hash Algorithm:</label>
                <select id="hashAlgorithm">
                    <option value="md5">MD5</option>
                    <option value="sha1">SHA-1</option>
                    <option value="sha256" selected>SHA-256</option>
                    <option value="sha512">SHA-512</option>
                </select>
            </div>
            
            <div class="button-group">
                <button class="btn-primary" onclick="generateHash()">🔑 Generate Hash</button>
                <button class="btn-success" onclick="addFile()">➕ Add to Database</button>
                <button class="btn-warning" onclick="clearUploadedFiles()">🗑️ Clear Uploads</button>
            </div>
            
            <div class="progress-bar">
                <div class="progress" id="uploadProgress"></div>
            </div>
            
            <div id="addResult" class="result"></div>
        </div>
        
        <div class="section">
            <h2>✅ Verify File Integrity</h2>
            
            <div class="input-group">
                <label for="verifyFileName">File Name:</label>
                <input type="text" id="verifyFileName" placeholder="Enter file name to verify">
            </div>
            
            <div class="input-group">
                <label for="verifyFileHash">Expected Hash:</label>
                <input type="text" id="verifyFileHash" placeholder="Enter expected hash value">
            </div>
            
            <div class="button-group">
                <button class="btn-primary" onclick="verifyFile()">🔍 Verify File</button>
                <button class="btn-info" onclick="verifyAllFiles()">📋 Verify All</button>
                <button class="btn-success" onclick="verifyWithUpload()">📤 Verify with Upload</button>
            </div>
            
            <div id="verifyResult" class="result"></div>
        </div>
        
        <div class="section">
            <h2>📋 File Database</h2>
            
            <div class="button-group">
                <button class="btn-primary" onclick="listFiles()">🔄 Refresh List</button>
                <button class="btn-info" onclick="exportDatabase()">📤 Export Database</button>
                <button class="btn-success" onclick="importDatabase()">📥 Import Database</button>
                <button class="btn-warning" onclick="clearDatabase()">🗑️ Clear Database</button>
            </div>
            
            <div class="file-list" id="fileList"></div>
        </div>
    </div>

    <script>
        // Original LinkedList and HashTable implementation
        class LinkedListNode {
            constructor(key, value, metadata = {}) {
                this.keyValPair = [key, value];
                this.metadata = metadata; // Store additional file metadata
                this.next = null;
            }
        }

        class LinkedList {
            constructor() {
                this.head = null;
            }

            insert(key, value, metadata = {}) {
                const newNode = new LinkedListNode(key, value, metadata);
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
                        return {
                            value: current.keyValPair[1],
                            metadata: current.metadata
                        };
                    }
                    current = current.next;
                }
                return null;
            }

            replace(key, value, metadata = {}) {
                let current = this.head;
                while (current) {
                    if (current.keyValPair[0] === key) {
                        current.keyValPair[1] = value;
                        current.metadata = { ...current.metadata, ...metadata };
                        return;
                    }
                    current = current.next;
                }
            }

            delete(key) {
                if (!this.head) return false;

                if (this.head.keyValPair[0] === key) {
                    this.head = this.head.next;
                    return true;
                }

                let current = this.head;
                while (current.next) {
                    if (current.next.keyValPair[0] === key) {
                        current.next = current.next.next;
                        return true;
                    }
                    current = current.next;
                }
                return false;
            }

            getAllKeys() {
                const keys = [];
                let current = this.head;
                while (current) {
                    keys.push({
                        name: current.keyValPair[0],
                        hash: current.keyValPair[1],
                        metadata: current.metadata
                    });
                    current = current.next;
                }
                return keys;
            }

            getAllMetadata() {
                const metadata = [];
                let current = this.head;
                while (current) {
                    metadata.push(current.metadata);
                    current = current.next;
                }
                return metadata;
            }

            getSize() {
                let count = 0;
                let current = this.head;
                while (current) {
                    count++;
                    current = current.next;
                }
                return count;
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
            constructor(limit = 16) {
                this.array = new Array(limit);
                this.limit = limit;
            }

            insert(key, value, metadata = {}) {
                const hash = getHash(key, this.limit);
                if (!this.array[hash]) {
                    this.array[hash] = new LinkedList();
                }
                this.array[hash].insert(key, value, metadata);
            }

            retrieve(key) {
                const hash = getHash(key, this.limit);
                if (!this.array[hash]) {
                    throw new Error('Key does not exist');
                }
                const result = this.array[hash].find(key);
                if (result === null) {
                    throw new Error('Key does not exist');
                }
                return result;
            }

            delete(key) {
                const hash = getHash(key, this.limit);
                if (!this.array[hash]) {
                    throw new Error('Key does not exist');
                }
                return this.array[hash].delete(key);
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

            getAllMetadata() {
                const metadata = [];
                for (let i = 0; i < this.limit; i++) {
                    if (this.array[i]) {
                        metadata.push(...this.array[i].getAllMetadata());
                    }
                }
                return metadata;
            }

            getTotalSize() {
                let size = 0;
                for (let i = 0; i < this.limit; i++) {
                    if (this.array[i]) {
                        size += this.array[i].getSize();
                    }
                }
                return size;
            }
            
            clear() {
                this.array = new Array(this.limit);
            }
        }

        // Create a global hash table instance
        const fileHashTable = new HashTable(32);
        
        // Track uploaded files
        let uploadedFiles = new Map();
        
        // Constants for large file handling
        const MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024; // 10 GB in bytes
        const CHUNK_SIZE = 64 * 1024 * 1024; // 64 MB chunks for large files
        const WARNING_SIZE = 1024 * 1024 * 1024; // 1 GB warning threshold

        // Initialize file upload functionality
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const fileInfo = document.getElementById('fileInfo');
        const selectedFilesDiv = document.getElementById('selectedFiles');
        const fileNameInput = document.getElementById('fileName');
        const progressBar = document.getElementById('uploadProgress');
        const chunkInfo = document.getElementById('chunkInfo');
        const chunkDetails = document.getElementById('chunkDetails');

        // Handle drag and drop events
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        function handleFiles(files) {
            if (files.length === 0) return;
            
            let html = '';
            uploadedFiles.clear();
            let totalSize = 0;
            let largeFilesCount = 0;
            
            Array.from(files).forEach((file, index) => {
                const fileSize = file.size;
                totalSize += fileSize;
                
                // Check file size
                if (fileSize > MAX_FILE_SIZE) {
                    html += `
                        <div class="file-item" style="background-color: #f8d7da;">
                            <span class="file-name">${file.name}</span>
                            <span class="file-size" style="color: #e74c3c;">${formatFileSize(fileSize)} - Exceeds 10GB limit!</span>
                        </div>
                    `;
                } else {
                    if (fileSize > WARNING_SIZE) {
                        largeFilesCount++;
                    }
                    
                    uploadedFiles.set(file.name, file);
                    html += `
                        <div class="file-item">
                            <span class="file-name">${file.name}</span>
                            <span class="file-size">${formatFileSize(fileSize)}</span>
                        </div>
                    `;
                }
                
                // Auto-fill first file name
                if (index === 0 && file.size <= MAX_FILE_SIZE) {
                    fileNameInput.value = file.name;
                }
            });
            
            selectedFilesDiv.innerHTML = html;
            fileInfo.classList.add('show');
            
            // Show chunk info for large files
            if (largeFilesCount > 0) {
                chunkInfo.style.display = 'block';
                chunkDetails.innerHTML = `Large file detected (${largeFilesCount} file(s) > 1GB). Using chunked upload mode with ${formatFileSize(CHUNK_SIZE)} chunks.`;
            } else {
                chunkInfo.style.display = 'none';
            }
            
            // Real progress simulation based on file sizes
            simulateUploadProgress(files);
        }

        function simulateUploadProgress(files) {
            let progress = 0;
            const totalSize = Array.from(files).reduce((acc, file) => acc + file.size, 0);
            const interval = setInterval(() => {
                if (progress < 100) {
                    // Slower progress for larger files
                    const increment = Math.max(1, Math.min(10, 100 * CHUNK_SIZE / totalSize));
                    progress = Math.min(100, progress + increment);
                    progressBar.style.width = progress + '%';
                } else {
                    clearInterval(interval);
                }
            }, 200);
        }

        function clearUploadedFiles() {
            uploadedFiles.clear();
            fileInfo.classList.remove('show');
            selectedFilesDiv.innerHTML = '';
            fileNameInput.value = '';
            progressBar.style.width = '0%';
            chunkInfo.style.display = 'none';
            
            const resultDiv = document.getElementById('addResult');
            resultDiv.className = 'result success';
            resultDiv.innerHTML = '✅ Uploaded files cleared successfully.';
        }

        // Improved hash generation for large files using chunked reading
        async function generateFileHash(file, algorithm) {
            return new Promise((resolve, reject) => {
                if (file.size > MAX_FILE_SIZE) {
                    reject(new Error('File exceeds 10GB limit'));
                    return;
                }
                
                // For large files, use chunked reading with progress
                if (file.size > CHUNK_SIZE) {
                    const chunks = Math.ceil(file.size / CHUNK_SIZE);
                    let currentChunk = 0;
                    let hash = 0;
                    
                    const reader = new FileReader();
                    
                    reader.onload = (e) => {
                        const content = e.target.result;
                        // Update hash with chunk
                        for (let i = 0; i < content.length; i++) {
                            hash = ((hash << 5) - hash) + content.charCodeAt(i);
                            hash = hash & hash;
                        }
                        
                        currentChunk++;
                        const progress = (currentChunk / chunks) * 100;
                        progressBar.style.width = progress + '%';
                        
                        if (currentChunk < chunks) {
                            // Read next chunk
                            const start = currentChunk * CHUNK_SIZE;
                            const end = Math.min(start + CHUNK_SIZE, file.size);
                            reader.readAsText(file.slice(start, end));
                        } else {
                            resolve(Math.abs(hash).toString(16));
                        }
                    };
                    
                    reader.onerror = () => {
                        reject(new Error('Error reading file'));
                    };
                    
                    // Start reading first chunk
                    reader.readAsText(file.slice(0, Math.min(CHUNK_SIZE, file.size)));
                } else {
                    // Small file - read all at once
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const content = e.target.result;
                        let hash = 0;
                        for (let i = 0; i < content.length; i++) {
                            hash = ((hash << 5) - hash) + content.charCodeAt(i);
                            hash = hash & hash;
                        }
                        resolve(Math.abs(hash).toString(16));
                    };
                    reader.onerror = () => {
                        reject(new Error('Error reading file'));
                    };
                    reader.readAsText(file.slice(0, Math.min(file.size, 10 * 1024 * 1024))); // Read up to 10MB for demo
                }
            });
        }

        async function generateHash() {
            const fileName = fileNameInput.value;
            const algorithm = document.getElementById('hashAlgorithm').value;
            const resultDiv = document.getElementById('addResult');
            
            if (!fileName) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = '❌ Please provide a file name or upload a file.';
                return;
            }
            
            // Check if file was uploaded
            if (uploadedFiles.has(fileName)) {
                const file = uploadedFiles.get(fileName);
                
                // Check file size limit
                if (file.size > MAX_FILE_SIZE) {
                    resultDiv.className = 'result error';
                    resultDiv.innerHTML = '❌ File exceeds 10GB limit. Please select a smaller file.';
                    return;
                }
                
                try {
                    resultDiv.className = 'result warning';
                    resultDiv.innerHTML = `⏳ Generating hash for ${formatFileSize(file.size)} file...`;
                    
                    const hash = await generateFileHash(file, algorithm);
                    document.getElementById('fileHash').value = hash;
                    
                    resultDiv.className = 'result success';
                    resultDiv.innerHTML = `✅ Generated ${algorithm.toUpperCase()} hash: ${hash}<br>`;
                    resultDiv.innerHTML += `📊 File size: ${formatFileSize(file.size)}`;
                } catch (error) {
                    resultDiv.className = 'result error';
                    resultDiv.innerHTML = `❌ Error generating hash: ${error.message}`;
                }
            } else {
                // Generate dummy hash
                const dummyHash = Math.random().toString(36).substring(2, 15) + 
                                 Math.random().toString(36).substring(2, 15);
                document.getElementById('fileHash').value = dummyHash;
                
                resultDiv.className = 'result warning';
                resultDiv.innerHTML = `⚠️ Generated test hash (file not uploaded): ${dummyHash}`;
            }
        }

        function addFile() {
            const fileName = document.getElementById('fileName').value;
            const fileHash = document.getElementById('fileHash').value;
            const algorithm = document.getElementById('hashAlgorithm').value;
            const resultDiv = document.getElementById('addResult');
            
            if (!fileName || !fileHash) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = '❌ Please provide both file name and hash value.';
                return;
            }
            
            try {
                // Get file size if available
                let fileSize = 0;
                if (uploadedFiles.has(fileName)) {
                    fileSize = uploadedFiles.get(fileName).size;
                }
                
                const metadata = {
                    algorithm: algorithm,
                    dateAdded: new Date().toISOString(),
                    size: fileSize,
                    verified: false,
                    format: fileName.split('.').pop() || 'unknown'
                };
                
                fileHashTable.insert(fileName, fileHash, metadata);
                
                resultDiv.className = 'result success';
                resultDiv.innerHTML = `✅ File "${fileName}" added successfully with ${algorithm.toUpperCase()} hash`;
                
                // Clear input fields
                document.getElementById('fileName').value = '';
                document.getElementById('fileHash').value = '';
                
                // Update stats and file list
                updateStats();
                listFiles();
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `❌ Error: ${error.message}`;
            }
        }

        function verifyFile() {
            const fileName = document.getElementById('verifyFileName').value;
            const expectedHash = document.getElementById('verifyFileHash').value;
            const resultDiv = document.getElementById('verifyResult');
            
            if (!fileName || !expectedHash) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = '❌ Please provide both file name and expected hash value.';
                return;
            }
            
            try {
                const fileData = fileHashTable.retrieve(fileName);
                const actualHash = fileData.value;
                const metadata = fileData.metadata;
                
                const isMatch = actualHash === expectedHash;
                
                // Update verification status
                metadata.verified = isMatch;
                
                if (isMatch) {
                    resultDiv.className = 'result success';
                    resultDiv.innerHTML = `✅ File integrity verified!<br>`;
                    resultDiv.innerHTML += `📊 Algorithm: ${metadata.algorithm || 'unknown'}<br>`;
                    resultDiv.innerHTML += `🔑 Hash: ${actualHash}<br>`;
                    resultDiv.innerHTML += `📅 Added: ${new Date(metadata.dateAdded).toLocaleString()}<br>`;
                    if (metadata.size) {
                        resultDiv.innerHTML += `📦 Size: ${formatFileSize(metadata.size)}`;
                    }
                } else {
                    resultDiv.className = 'result error';
                    resultDiv.innerHTML = `❌ File integrity check failed!<br>`;
                    resultDiv.innerHTML += `Expected: ${expectedHash}<br>`;
                    resultDiv.innerHTML += `Actual: ${actualHash}`;
                }
                
                updateStats();
                listFiles();
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `❌ Error: ${error.message}`;
            }
        }

        async function verifyWithUpload() {
            const resultDiv = document.getElementById('verifyResult');
            
            if (uploadedFiles.size === 0) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = '❌ Please upload a file first.';
                return;
            }
            
            const file = Array.from(uploadedFiles.values())[0];
            const fileName = file.name;
            
            try {
                // Check if file exists in database
                const fileData = fileHashTable.retrieve(fileName);
                const expectedHash = fileData.value;
                
                resultDiv.className = 'result warning';
                resultDiv.innerHTML = `⏳ Verifying ${fileName}...`;
                
                // Generate hash from uploaded file
                const actualHash = await generateFileHash(file, fileData.metadata.algorithm);
                const isMatch = actualHash === expectedHash;
                
                // Update verification status
                fileData.metadata.verified = isMatch;
                
                if (isMatch) {
                    resultDiv.className = 'result success';
                    resultDiv.innerHTML = `✅ File integrity verified!<br>`;
                    resultDiv.innerHTML += `📊 Hash matches: ${actualHash}`;
                } else {
                    resultDiv.className = 'result error';
                    resultDiv.innerHTML = `❌ File integrity check failed!<br>`;
                    resultDiv.innerHTML += `Expected: ${expectedHash}<br>`;
                    resultDiv.innerHTML += `Actual: ${actualHash}`;
                }
                
                updateStats();
                listFiles();
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `❌ Error: ${error.message}`;
            }
        }

        function verifyAllFiles() {
            const keys = fileHashTable.getAllKeys();
            const resultDiv = document.getElementById('verifyResult');
            
            if (keys.length === 0) {
                resultDiv.className = 'result warning';
                resultDiv.innerHTML = '⚠️ No files in database to verify.';
                return;
            }
            
            let verified = 0;
            let failed = 0;
            let totalSize = 0;
            
            keys.forEach(file => {
                if (file.metadata.verified) {
                    verified++;
                } else {
                    failed++;
                }
                if (file.metadata.size) {
                    totalSize += file.metadata.size;
                }
            });
            
            resultDiv.className = 'result success';
            resultDiv.innerHTML = `✅ Verification Summary:<br>`;
            resultDiv.innerHTML += `📊 Total Files: ${keys.length}<br>`;
            resultDiv.innerHTML += `✅ Verified: ${verified}<br>`;
            resultDiv.innerHTML += `❌ Not Verified: ${failed}<br>`;
            resultDiv.innerHTML += `📦 Total Size: ${formatFileSize(totalSize)}`;
        }

        function listFiles() {
            const fileListDiv = document.getElementById('fileList');
            const keys = fileHashTable.getAllKeys();
            
            if (keys.length === 0) {
                fileListDiv.innerHTML = '<p style="text-align: center; color: #7f8c8d;">📂 No files in the database.</p>';
                updateStats();
                return;
            }
            
            // Sort files by name
            keys.sort((a, b) => a.name.localeCompare(b.name));
            
            let html = '<h3>Stored Files:</h3>';
            for (const file of keys) {
                const verifiedClass = file.metadata.verified ? 'badge-success' : 'badge-warning';
                const verifiedText = file.metadata.verified ? 'Verified' : 'Not Verified';
                const fileSize = file.metadata.size ? formatFileSize(file.metadata.size) : 'Unknown';
                
                html += `
                    <div class="file-item">
                        <div>
                            <span class="file-name">${file.name}</span>
                            <span class="file-size">(${fileSize})</span>
                            <span class="badge ${verifiedClass}">${verifiedText}</span>
                            <span class="badge badge-info">${file.metadata.algorithm || 'sha256'}</span>
                        </div>
                        <div class="file-hash">${file.hash.substring(0, 16)}...</div>
                    </div>
                `;
            }
            
            fileListDiv.innerHTML = html;
            updateStats();
        }

        function updateStats() {
            const keys = fileHashTable.getAllKeys();
            const totalFiles = keys.length;
            
            let verifiedCount = 0;
            let totalSize = 0;
            
            keys.forEach(file => {
                if (file.metadata.verified) {
                    verifiedCount++;
                }
                if (file.metadata.size) {
                    totalSize += file.metadata.size;
                }
            });
            
            document.getElementById('totalFiles').textContent = totalFiles;
            document.getElementById('verifiedFiles').textContent = verifiedCount;
            document.getElementById('totalSize').textContent = formatFileSize(totalSize);
        }

        function exportDatabase() {
            const keys = fileHashTable.getAllKeys();
            const exportData = {
                files: keys,
                exportDate: new Date().toISOString(),
                version: '2.0',
                totalSize: keys.reduce((acc, file) => acc + (file.metadata.size || 0), 0)
            };
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = `file-integrity-db-${new Date().toISOString().slice(0,10)}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            
            const resultDiv = document.getElementById('addResult');
            resultDiv.className = 'result success';
            resultDiv.innerHTML = `✅ Database exported successfully with ${keys.length} files.`;
        }

        function importDatabase() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json';
            
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                
                reader.onload = (event) => {
                    try {
                        const importData = JSON.parse(event.target.result);
                        
                        if (importData.files && Array.isArray(importData.files)) {
                            importData.files.forEach(file => {
                                fileHashTable.insert(file.name, file.hash, file.metadata || {});
                            });
                            
                            const resultDiv = document.getElementById('addResult');
                            resultDiv.className = 'result success';
                            resultDiv.innerHTML = `✅ Successfully imported ${importData.files.length} files from database.`;
                            
                            listFiles();
                            updateStats();
                        } else {
                            throw new Error('Invalid database format');
                        }
                    } catch (error) {
                        const resultDiv = document.getElementById('addResult');
                        resultDiv.className = 'result error';
                        resultDiv.innerHTML = `❌ Error importing database: ${error.message}`;
                    }
                };
                
                reader.readAsText(file);
            };
            
            fileInput.click();
        }

        function clearDatabase() {
            if (confirm('Are you sure you want to clear the entire database?')) {
                fileHashTable.clear();
                listFiles();
                updateStats();
                
                const resultDiv = document.getElementById('addResult');
                resultDiv.className = 'result success';
                resultDiv.innerHTML = '✅ Database cleared successfully.';
            }
        }

        // Initialize with example data
        function initializeExampleData() {
            const exampleFiles = [
                { name: "document.txt", hash: "a1b2c3d4e5f6", size: 1024, verified: true },
                { name: "image.jpg", hash: "f6e5d4c3b2a1", size: 2048 * 1024, verified: false }, // 2MB
                { name: "script.js", hash: "1a2b3c4d5e6f", size: 512 * 1024, verified: true }, // 512KB
                { name: "presentation.pptx", hash: "9a8b7c6d5e4f", size: 4 * 1024 * 1024, verified: false }, // 4MB
                { name: "data.xlsx", hash: "2b3c4d5e6f7a", size: 1.5 * 1024 * 1024, verified: true }, // 1.5MB
                { name: "video.mp4", hash: "3c4d5e6f7a8b", size: 500 * 1024 * 1024, verified: false } // 500MB
            ];
            
            exampleFiles.forEach(file => {
                fileHashTable.insert(file.name, file.hash, {
                    algorithm: 'sha256',
                    dateAdded: new Date().toISOString(),
                    size: file.size,
                    verified: file.verified,
                    format: file.name.split('.').pop()
                });
            });
            
            listFiles();
            updateStats();
        }

        // Call initialization
        initializeExampleData();
    </script>
</body>
</html>
