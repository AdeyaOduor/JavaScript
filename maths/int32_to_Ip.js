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

// =============== Out of Band implementation =======================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Out-of-Band Network Management</title>
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
        
        input, button, select {
            padding: 12px;
            border-radius: 5px;
            border: none;
            font-size: 1rem;
        }
        
        input, select {
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
        
        .oob-diagram {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            padding: 20px;
            background-color: #1e293b;
            border-radius: 10px;
        }
        
        .network-node {
            text-align: center;
            padding: 15px;
        }
        
        .node-icon {
            width: 80px;
            height: 80px;
            background-color: #3b82f6;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 15px;
            font-size: 2rem;
        }
        
        .oob-connection {
            flex-grow: 1;
            height: 2px;
            background: linear-gradient(90deg, #3b82f6, #10b981, #3b82f6);
            margin: 0 20px;
            position: relative;
        }
        
        .oob-connection::before {
            content: 'OOB Connection';
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #10b981;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
        }
        
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }
        
        .status-active {
            background-color: #10b981;
        }
        
        .status-inactive {
            background-color: #ef4444;
        }
        
        .status-warning {
            background-color: #f59e0b;
        }
        
        @media (max-width: 768px) {
            .dashboard {
                grid-template-columns: 1fr;
            }
            
            .oob-diagram {
                flex-direction: column;
            }
            
            .oob-connection {
                width: 2px;
                height: 50px;
                margin: 20px 0;
            }
            
            .oob-connection::before {
                top: 50%;
                left: -70px;
                transform: translateY(-50%) rotate(-90deg);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Out-of-Band Network Management</h1>
            <p class="subtitle">Remote Network Management via Dedicated OOB Channel</p>
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
                <h2>OOB Device Management</h2>
                <div class="converter">
                    <select id="deviceSelect">
                        <option value="">Select a device to manage</option>
                        <option value="3232235777">Core Router (192.168.1.1)</option>
                        <option value="3232235778">Switch 1 (192.168.1.2)</option>
                        <option value="3232235779">Firewall (192.168.1.3)</option>
                        <option value="3232235780">Server (192.168.1.4)</option>
                    </select>
                    <select id="actionSelect">
                        <option value="">Select an action</option>
                        <option value="reboot">Reboot Device</option>
                        <option value="config">Update Configuration</option>
                        <option value="status">Check Status</option>
                        <option value="logs">Retrieve Logs</option>
                    </select>
                    <button onclick="executeOobAction()">Execute via OOB</button>
                    <div class="result" id="oobResult">OOB Result: </div>
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
            
            <div class="card">
                <h2>OOB Channel Status</h2>
                <div id="oobStatus">
                    <p><span class="status-indicator status-active"></span> OOB Main Channel: Active</p>
                    <p><span class="status-indicator status-active"></span> OOB Backup Channel: Active</p>
                    <p><span class="status-indicator status-warning"></span> Cellular OOB: Degraded</p>
                    <p><span class="status-indicator status-inactive"></span> Satellite OOB: Offline</p>
                </div>
                <button style="margin-top: 15px;" onclick="testOobConnection()">Test OOB Connections</button>
            </div>
            
            <div class="card card-full">
                <h2>Out-of-Band Network Diagram</h2>
                <div class="oob-diagram">
                    <div class="network-node">
                        <div class="node-icon">🖥️</div>
                        <h3>Management Station</h3>
                        <p>OOB Controller</p>
                    </div>
                    
                    <div class="oob-connection"></div>
                    
                    <div class="network-node">
                        <div class="node-icon">📡</div>
                        <h3>OOB Gateway</h3>
                        <p>10.0.0.1</p>
                    </div>
                    
                    <div class="oob-connection"></div>
                    
                    <div class="network-node">
                        <div class="node-icon">🔧</div>
                        <h3>Managed Device</h3>
                        <p>192.168.1.1</p>
                    </div>
                </div>
            </div>
            
            <div class="card card-full">
                <h2>OOB Activity Log</h2>
                <div id="activityLog">
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
        
        // OOB Management functions
        function executeOobAction() {
            const deviceSelect = document.getElementById('deviceSelect');
            const actionSelect = document.getElementById('actionSelect');
            const resultDiv = document.getElementById('oobResult');
            
            if (!deviceSelect.value || !actionSelect.value) {
                resultDiv.textContent = 'OOB Result: Please select both a device and an action';
                return;
            }
            
            const ip = int32ToIp(parseInt(deviceSelect.value));
            const action = actionSelect.value;
            
            // Simulate OOB execution delay
            resultDiv.textContent = `OOB Result: Executing ${action} on ${ip} via OOB channel...`;
            
            setTimeout(() => {
                let result;
                switch(action) {
                    case 'reboot':
                        result = `Device ${ip} rebooted successfully via OOB`;
                        break;
                    case 'config':
                        result = `Configuration updated on ${ip} via OOB`;
                        break;
                    case 'status':
                        result = `Status check completed on ${ip} via OOB: All systems normal`;
                        break;
                    case 'logs':
                        result = `Logs retrieved from ${ip} via OOB: 125 entries found`;
                        break;
                }
                
                resultDiv.textContent = `OOB Result: ${result}`;
                addLogEntry(`OOB Action: ${result}`);
            }, 2000);
        }
        
        function testOobConnection() {
            addLogEntry("Testing OOB connections...");
            
            setTimeout(() => {
                addLogEntry("OOB Main Channel: Response time 45ms");
                addLogEntry("OOB Backup Channel: Response time 78ms");
                addLogEntry("Cellular OOB: Response time 215ms (Degraded)");
                addLogEntry("Satellite OOB: No response (Offline)");
            }, 1500);
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
                
                const statusClass = conn.status === 'Active' ? 'status-active' : 
                                  conn.status === 'Inactive' ? 'status-inactive' : 'status-warning';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${srcIp}</td>
                    <td>${destIp}</td>
                    <td><span class="status-indicator ${statusClass}"></span>${conn.status}</td>
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
            
            // Check if this is an OOB message for special formatting
            if (message.includes('OOB')) {
                logEntry.innerHTML = `<span class="log-time">[${timeString}]</span> <span style="color: #10b981;">${message}</span>`;
            } else {
                logEntry.innerHTML = `<span class="log-time">[${timeString}]</span> ${message}`;
            }
            
            logContainer.appendChild(logEntry);
            logContainer.scrollTop = logContainer.scrollHeight;
        }
        
        // Initialize the dashboard
        function initDashboard() {
            populateConnectionsTable();
            
            // Add initial log entries
            addLogEntry('System initialized');
            addLogEntry('OOB Management: Primary OOB channel established');
            addLogEntry('OOB Management: Backup OOB channel established');
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
