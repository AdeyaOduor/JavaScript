/* The function int32ToIp converts a 32-bit integer (often used to represent an IP address in numeric form) into its standard dotted-decimal notation.
This is commonly used in network programming and applications that require IP address manipulation.*/

const int32ToIp = (num) => {
   return (num >>> 24 & 0xFF) + '.' +  // Extract the first octet
          (num >>> 16 & 0xFF) + '.' +  // Extract the second octet
          (num >>> 8 & 0xFF) + '.' +   // Extract the third octet
          (num & 0xFF);                 // Extract the fourth octet
};
const ip = int32ToIp(3232235777);
console.log(ip); // Output: "192.168.1.1"

// Application Example in Network Programming
// Scenario: IP Address Management in a Network Application, Logging Network Activity using Incoming Connection Data:
const connections = [
    { src: 3232235521, dest: 3232235776 }, // 192.168.1.1 to 192.168.1.255
    { src: 16777343, dest: 167772160 }     // 10.0.0.1 to 10.0.0.0
];
// Converting to Dotted Decimal Format:
connections.forEach(connection => {
    const srcIp = int32ToIp(connection.src);
    const destIp = int32ToIp(connection.dest);
    console.log(`Connection from ${srcIp} to ${destIp}`);
});

// Output
// Connection from 192.168.1.1 to 192.168.1.255
// Connection from 10.0.0.1 to 10.0.0.0

/*Explanation

    Right Shift (>>>):
        The >>> operator is the unsigned right shift operator. It shifts the bits of num to the right by the specified number of bits, 
        filling in zeros from the left. This effectively discards bits that are shifted out.
        For example, num >>> 24 shifts the bits 24 positions to the right, moving the first octet to the least significant position.

    Bitwise AND (&):
        The & operator performs a bitwise AND operation. By using 0xFF (which is 11111111 in binary), we isolate the last 8 bits of the number, 
        effectively extracting one octet of the IP address.
        For example, (num >>> 24 & 0xFF) extracts the first octet from the integer.

    Concatenation:
        The function concatenates the four octets with a dot (.) to form the standard IP address format.

Example of Application
Converting a 32-Bit Integer to an IP Address

Let's say you have the 32-bit integer representation of the IP address 192.168.1.1. The integer representation of this IP address can be calculated 
as follows:

    Convert Each Octet:
        192 is represented in binary as 11000000
        168 is represented in binary as 10101000
        1 is represented in binary as 00000001
        1 is represented in binary as 00000001

    Combine the Octets:
        The binary representation of 192.168.1.1 is:
        11000000.10101000.00000001.00000001
        When combined into a 32-bit integer, this becomes: 
        11000000 10101000 00000001 00000001
        As a single integer, this is 3232235777.

   Real-World Applications

    Network Configuration:
        In network device configurations, IP addresses are often stored as 32-bit integers for efficiency. Functions like int32ToIp help convert 
        these integers back to a human-readable format for display or logging.

    Database Storage:
        In databases, it’s common to store IP addresses in a binary format (as integers) for space efficiency. When retrieving these addresses, 
        they can be converted back to the standard dotted-decimal format using this function.

    Network Programming:
        In applications that require low-level network programming (like creating sockets), IP addresses may be manipulated in their integer form. 
        Converting them to string representation makes it easier to log, display, or compare.

    IP Address Management:
        In systems that manage IP addresses, such as DHCP servers or IP address allocation systems, converting between formats is essential to ensure 
        compatibility with various protocols and logging mechanisms.

*/

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Network Management Automation</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #0f172a;
            color: #e2e8f0;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .dashboard {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .card {
            background-color: #1e293b;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .card-full {
            grid-column: 1 / -1;
        }
        
        h2 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: #60a5fa;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 10px;
        }
        
        .converter {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        input, button {
            padding: 12px;
            border-radius: 5px;
            border: none;
            font-size: 1rem;
        }
        
        input {
            background-color: #334155;
            color: #e2e8f0;
            border: 1px solid #475569;
        }
        
        button {
            background-color: #3b82f6;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s;
            font-weight: bold;
        }
        
        button:hover {
            background-color: #2563eb;
        }
        
        .result {
            margin-top: 15px;
            padding: 15px;
            background-color: #334155;
            border-radius: 5px;
            font-family: monospace;
            font-size: 1.2rem;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #334155;
        }
        
        th {
            background-color: #334155;
            font-weight: bold;
        }
        
        tr:hover {
            background-color: #2d3748;
        }
        
        .log-entry {
            padding: 10px;
            border-bottom: 1px solid #334155;
            font-family: monospace;
        }
        
        .log-time {
            color: #60a5fa;
            margin-right: 10px;
        }
        
        .log-ip {
            color: #10b981;
            font-weight: bold;
        }
        
        .visualization {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 200px;
            margin-top: 20px;
        }
        
        .node {
            width: 50px;
            height: 50px;
            background-color: #3b82f6;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: bold;
            position: relative;
        }
        
        .connection {
            height: 2px;
            background: linear-gradient(90deg, #3b82f6 0%, transparent 100%);
            position: absolute;
            transform-origin: left center;
        }
        
        .highlight {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        @media (max-width: 768px) {
            .dashboard {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Network Management Automation</h1>
            <p class="subtitle">32-bit Integer to IP Address Conversion & Network Monitoring</p>
        </header>
        
        <div class="dashboard">
            <div class="card">
                <h2>IP Address Converter</h2>
                <div class="converter">
                    <input type="number" id="intInput" placeholder="Enter 32-bit integer (e.g., 3232235777)" min="0" max="4294967295">
                    <button onclick="convertToIp()">Convert to IP</button>
                    <div class="result" id="conversionResult">IP Address: </div>
                </div>
                
                <div class="converter" style="margin-top: 20px;">
                    <input type="text" id="ipInput" placeholder="Enter IP address (e.g., 192.168.1.1)">
                    <button onclick="convertToInt()">Convert to Integer</button>
                    <div class="result" id="conversionResult2">32-bit Integer: </div>
                </div>
            </div>
            
            <div class="card">
                <h2>Network Connections</h2>
                <p>Active connections in the network:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Source IP</th>
                            <th>Destination IP</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="connectionsTable">
                        <!-- Will be populated by JavaScript -->
                    </tbody>
                </table>
            </div>
            
            <div class="card card-full">
                <h2>Network Activity Log</h2>
                <div id="activityLog">
                    <!-- Will be populated by JavaScript -->
                </div>
            </div>
            
            <div class="card card-full">
                <h2>Network Visualization</h2>
                <div class="visualization" id="networkVisualization">
                    <!-- Will be populated by JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <script>
        // IP conversion functions
        function int32ToIp(num) {
            return (num >>> 24 & 0xFF) + '.' +
                   (num >>> 16 & 0xFF) + '.' +
                   (num >>> 8 & 0xFF) + '.' +
                   (num & 0xFF);
        }
        
        function ipToInt32(ip) {
            return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
        }
        
        // DOM manipulation functions
        function convertToIp() {
            const intInput = document.getElementById('intInput');
            const resultDiv = document.getElementById('conversionResult');
            
            if (!intInput.value) {
                resultDiv.textContent = 'IP Address: Please enter a value';
                return;
            }
            
            const num = parseInt(intInput.value);
            if (isNaN(num) || num < 0 || num > 4294967295) {
                resultDiv.textContent = 'IP Address: Please enter a valid 32-bit integer (0-4294967295)';
                return;
            }
            
            const ip = int32ToIp(num);
            resultDiv.textContent = `IP Address: ${ip}`;
            addLogEntry(`Converted integer ${num} to IP ${ip}`);
        }
        
        function convertToInt() {
            const ipInput = document.getElementById('ipInput');
            const resultDiv = document.getElementById('conversionResult2');
            
            if (!ipInput.value) {
                resultDiv.textContent = '32-bit Integer: Please enter a value';
                return;
            }
            
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (!ipRegex.test(ipInput.value)) {
                resultDiv.textContent = '32-bit Integer: Please enter a valid IP address';
                return;
            }
            
            const intValue = ipToInt32(ipInput.value);
            resultDiv.textContent = `32-bit Integer: ${intValue}`;
            addLogEntry(`Converted IP ${ipInput.value} to integer ${intValue}`);
        }
        
        // Network connections data
        const connections = [
            { src: 3232235521, dest: 3232235776, status: 'Active' },
            { src: 16777343, dest: 167772160, status: 'Active' },
            { src: 2886732670, dest: 2886732671, status: 'Inactive' },
            { src: 16885952, dest: 16885953, status: 'Active' },
            { src: 3232235777, dest: 3232235522, status: 'Active' }
        ];
        
        // Populate connections table
        function populateConnectionsTable() {
            const tableBody = document.getElementById('connectionsTable');
            tableBody.innerHTML = '';
            
            connections.forEach(conn => {
                const srcIp = int32ToIp(conn.src);
                const destIp = int32ToIp(conn.dest);
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${srcIp}</td>
                    <td>${destIp}</td>
                    <td>${conn.status}</td>
                `;
                
                tableBody.appendChild(row);
            });
        }
        
        // Activity log
        function addLogEntry(message) {
            const logContainer = document.getElementById('activityLog');
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            
            logEntry.innerHTML = `<span class="log-time">[${timeString}]</span> ${message}`;
            logContainer.appendChild(logEntry);
            logContainer.scrollTop = logContainer.scrollHeight;
        }
        
        // Network visualization
        function createNetworkVisualization() {
            const visualization = document.getElementById('networkVisualization');
            visualization.innerHTML = '';
            
            // Create nodes for each unique IP
            const uniqueIps = new Set();
            connections.forEach(conn => {
                uniqueIps.add(conn.src);
                uniqueIps.add(conn.dest);
            });
            
            const ipArray = Array.from(uniqueIps);
            const nodes = [];
            
            // Create node elements
            ipArray.forEach((ip, index) => {
                const node = document.createElement('div');
                node.className = 'node';
                node.textContent = index + 1;
                node.style.left = `${20 + (index * 15)}%`;
                nodes.push({ element: node, ip: ip });
                visualization.appendChild(node);
            });
            
            // Create connections
            connections.forEach(conn => {
                const srcIndex = ipArray.indexOf(conn.src);
                const destIndex = ipArray.indexOf(conn.dest);
                
                if (srcIndex !== -1 && destIndex !== -1) {
                    const srcNode = nodes[srcIndex].element;
                    const destNode = nodes[destIndex].element;
                    
                    const srcRect = srcNode.getBoundingClientRect();
                    const destRect = destNode.getBoundingClientRect();
                    
                    const visualizationRect = visualization.getBoundingClientRect();
                    
                    const srcX = srcRect.left + srcRect.width/2 - visualizationRect.left;
                    const srcY = srcRect.top + srcRect.height/2 - visualizationRect.top;
                    const destX = destRect.left + destRect.width/2 - visualizationRect.left;
                    const destY = destRect.top + destRect.height/2 - visualizationRect.top;
                    
                    const length = Math.sqrt(Math.pow(destX - srcX, 2) + Math.pow(destY - srcY, 2));
                    const angle = Math.atan2(destY - srcY, destX - srcX) * 180 / Math.PI;
                    
                    const connection = document.createElement('div');
                    connection.className = 'connection';
                    connection.style.width = `${length}px`;
                    connection.style.left = `${srcX}px`;
                    connection.style.top = `${srcY}px`;
                    connection.style.transform = `rotate(${angle}deg)`;
                    
                    visualization.appendChild(connection);
                }
            });
            
            // Bring nodes to front
            nodes.forEach(node => {
                visualization.appendChild(node.element);
            });
        }
        
        // Initialize the dashboard
        function initDashboard() {
            populateConnectionsTable();
            createNetworkVisualization();
            
            // Add initial log entries
            addLogEntry('System initialized');
            addLogEntry('Network monitoring started');
            connections.forEach(conn => {
                const srcIp = int32ToIp(conn.src);
                const destIp = int32ToIp(conn.dest);
                addLogEntry(`Connection detected: ${srcIp} → ${destIp} (${conn.status})`);
            });
            
            // Add event listener for Enter key
            document.getElementById('intInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') convertToIp();
            });
            
            document.getElementById('ipInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') convertToInt();
            });
        }
        
        // Run initialization when page loads
        window.onload = initDashboard;
    </script>
</body>
</html>
