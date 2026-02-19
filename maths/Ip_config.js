// Convert a decimal number to binary, hexadecimal or octal number
dec_to_bho  = function(n, base) {
 
    if (n < 0) {
      n = 0xFFFFFFFF + n + 1;
     } 
switch (base)  
{  
case 'B':  
return parseInt(n, 10).toString(2);
break;  
case 'H':  
return parseInt(n, 10).toString(16);
break;  
case 'O':  
return parseInt(n, 10).toString(8);
break;  
default:  
return("Wrong input.........");  
}  
}

console.log(dec_to_bho(120,'B')); // 1111000
console.log(dec_to_bho(120,'H')); // 78
console.log(dec_to_bho(120,'O')); // 170
/*
Real world applications:

    Bit manipulation and low-level programming: When working with low-level programming, such as device drivers, embedded systems, 
    or system programming, the ability to convert between decimal, binary, hexadecimal, and octal representations is crucial. 
    Developers often need to work with and manipulate individual bits or bytes, and having a function like dec_to_bho can simplify these tasks.

    Data representation and storage: In many applications, data needs to be stored or transmitted in a compact or efficient manner. 
    Representing numbers in binary, hexadecimal, or octal formats can often reduce the required storage space or bandwidth compared to using 
    decimal representation.

    Cryptography and security: Cryptographic algorithms and security protocols commonly use hexadecimal and binary representations for various 
    purposes, such as key generation, hashing, or encryption. The dec_to_bho function can be useful in implementing or understanding these 
    cryptographic mechanisms.

    Computer architecture and hardware design: In the field of computer architecture and hardware design, engineers often work with binary, hexadecimal, 
    and octal representations to describe and manipulate digital circuits, memory layouts, and other hardware-related concepts.

    Network programming and communication protocols: Many network protocols, such as IP addresses, MAC addresses, and various data packet formats, 
    use hexadecimal or binary representations. The dec_to_bho function can be helpful in working with these protocols and translating between different 
    number representations.

    Debugging and troubleshooting: When working with low-level systems or embedded devices, developers often need to interpret and analyze data in 
    various number formats. The dec_to_bho function can be a valuable tool for quickly converting between decimal, binary, hexadecimal, and octal 
    representations, facilitating the debugging and troubleshooting process.*/

// Example Convert IP address: 192.168.1.100 components to decimal,
const ipComponents = [192, 168, 1, 100];

// Convert each component to binary, hexadecimal, and octal
for (let i = 0; i < ipComponents.length; i++) {
  const decimal = ipComponents[i];
  console.log(`Decimal: ${decimal}`);
  console.log(`Binary: ${dec_to_bho(decimal, 'B')}`);
  console.log(`Hexadecimal: ${dec_to_bho(decimal, 'H')}`);
  console.log(`Octal: ${dec_to_bho(decimal, 'O')}`);
  console.log();
}
/*
Decimal: 192, Binary: 11000000, Hexadecimal: C0, Octal: 300
Decimal: 168, Binary: 10101000, Hexadecimal: A8, Octal: 250
Decimal: 1, Binary: 1, Hexadecimal: 1, Octal: 1
Decimal: 100, Binary: 1100100, Hexadecimal: 64,Octal: 144

Parsing an Ethernet frame header to convert numerical values between different representations, making it easier to understand and 
work with the protocol data.
*/
const ethernetHeader = {
  destinationMAC: dec_to_bho(0x01234567, 'H'), // Hexadecimal MAC address
  sourceMAC: dec_to_bho(0x89ABCDEF, 'H'),
  etherType: dec_to_bho(0x0800, 'H') // Hexadecimal Ethernet type
};
// Implementing a TCP state machine
function processTCPPacket(packet) {
  const tcpFlags = dec_to_bho(packet.flags, 'B'); 
 /* Convert TCP flags to binary, Use the tcpFlags binary representation to implement the TCP state machine
  and handle the packet based on the current connection state */ 
}
// Use the dec_to_bho function to validate the IP header checksum
const ipHeader = {
  version: dec_to_bho(4, 'B'), // Binary IP version
  headerLength: dec_to_bho(5, 'B'), // Binary IP header length
  totalLength: dec_to_bho(1500, 'H'), // Hexadecimal total packet length
  checksum: dec_to_bho(0xABCD, 'H') // Hexadecimal IP header checksum
};


// =====================================================================================================================================================
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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
            max-width: 1400px;
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
            grid-template-columns: repeat(2, 1fr);
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
        
        .result.success {
            background-color: #065f46;
            border-left: 4px solid #10b981;
        }
        
        .result.error {
            background-color: #7f1d1d;
            border-left: 4px solid #ef4444;
        }
        
        .current-ip-panel {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .current-ip-label {
            font-weight: bold;
            font-size: 1.1rem;
        }
        
        .current-ip-value {
            font-family: monospace;
            font-size: 1.3rem;
            background: rgba(0, 0, 0, 0.3);
            padding: 8px 15px;
            border-radius: 20px;
        }
        
        .status-badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
        }
        
        .status-active {
            background-color: #10b981;
            color: #064e3b;
        }
        
        .status-inactive {
            background-color: #ef4444;
            color: #7f1d1d;
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
        
        .log-container {
            max-height: 200px;
            overflow-y: auto;
            background-color: #0f172a;
            border-radius: 5px;
            padding: 10px;
        }
        
        .log-entry {
            padding: 8px;
            border-bottom: 1px solid #334155;
            font-family: monospace;
            font-size: 0.9rem;
        }
        
        .log-time {
            color: #60a5fa;
            margin-right: 10px;
        }
        
        .log-ip {
            color: #10b981;
            font-weight: bold;
        }
        
        .chart-container {
            position: relative;
            height: 300px;
            margin-top: 20px;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            margin-top: 5px;
        }
        
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .controls {
            display: flex;
            gap: 10px;
            margin-top: 15px;
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
            <p class="subtitle">32-bit Integer to IP Address Conversion & Real-time Network Monitoring</p>
        </header>
        
        <div class="dashboard">
            <div class="card">
                <h2>IP Address Converter</h2>
                <div class="converter">
                    <input type="number" id="intInput" placeholder="Enter 32-bit integer (e.g., 3232235777)" min="0" max="4294967295" value="3232235777">
                    <button onclick="convertToIp()">Convert to IP</button>
                    <div class="result" id="conversionResult">IP Address: 192.168.1.1</div>
                </div>
                
                <div class="converter" style="margin-top: 20px;">
                    <input type="text" id="ipInput" placeholder="Enter IP address (e.g., 192.168.1.1)" value="192.168.1.1">
                    <button onclick="convertToInt()">Convert to Integer</button>
                    <div class="result" id="conversionResult2">32-bit Integer: 3232235777</div>
                </div>
            </div>
            
            <div class="card">
                <h2>Connection Status</h2>
                <div class="current-ip-panel">
                    <span class="current-ip-label">Selected IP:</span>
                    <span class="current-ip-value" id="currentSelectedIp">192.168.1.1</span>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Total Connections</div>
                        <div class="stat-value" id="totalConnections">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Active</div>
                        <div class="stat-value" id="activeConnections">0</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Inactive</div>
                        <div class="stat-value" id="inactiveConnections">0</div>
                    </div>
                </div>
                
                <div class="controls">
                    <select id="statusFilter" onchange="filterConnections()">
                        <option value="all">All Connections</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                    </select>
                    <button onclick="checkConnectionStatus()" style="flex: 1;">Check Status</button>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Source IP</th>
                            <th>Destination IP</th>
                            <th>Status</th>
                            <th>Connection</th>
                        </tr>
                    </thead>
                    <tbody id="connectionsTable">
                        <!-- Will be populated by JavaScript -->
                    </tbody>
                </table>
            </div>
            
            <div class="card card-full">
                <h2>Network Activity & Performance</h2>
                <div class="chart-container">
                    <canvas id="networkChart"></canvas>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Avg Response Time</div>
                        <div class="stat-value" id="avgResponseTime">45ms</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Peak Traffic</div>
                        <div class="stat-value" id="peakTraffic">156</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Packet Loss</div>
                        <div class="stat-value" id="packetLoss">0.3%</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Bandwidth</div>
                        <div class="stat-value" id="bandwidth">100</div>
                    </div>
                </div>
            </div>
            
            <div class="card card-full">
                <h2>Network Activity Log</h2>
                <div class="log-container" id="activityLog">
                    <!-- Will be populated by JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <script>
        // Chart instance
        let networkChart;
        
        // Network connections data
        const connections = [
            { src: 3232235521, dest: 3232235776, status: 'Active', latency: 23, packets: 45 },
            { src: 16777343, dest: 167772160, status: 'Active', latency: 45, packets: 78 },
            { src: 2886732670, dest: 2886732671, status: 'Inactive', latency: 0, packets: 0 },
            { src: 16885952, dest: 16885953, status: 'Active', latency: 67, packets: 112 },
            { src: 3232235777, dest: 3232235522, status: 'Active', latency: 34, packets: 89 }
        ];
        
        // Historical data for chart
        const historicalData = [
            { time: '00:00', active: 4, inactive: 1, latency: 45 },
            { time: '01:00', active: 3, inactive: 2, latency: 52 },
            { time: '02:00', active: 2, inactive: 3, latency: 38 },
            { time: '03:00', active: 2, inactive: 3, latency: 41 },
            { time: '04:00', active: 1, inactive: 4, latency: 35 },
            { time: '05:00', active: 3, inactive: 2, latency: 44 },
            { time: '06:00', active: 4, inactive: 1, latency: 48 },
            { time: '07:00', active: 5, inactive: 0, latency: 32 },
            { time: '08:00', active: 4, inactive: 1, latency: 39 },
            { time: '09:00', active: 3, inactive: 2, latency: 43 },
            { time: '10:00', active: 4, inactive: 1, latency: 51 },
            { time: '11:00', active: 4, inactive: 1, latency: 47 }
        ];
        
        // Current selected IP (integer and string)
        let currentSelectedInt = 3232235777;
        let currentSelectedIp = '192.168.1.1';
        
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
        
        // Update current selected IP
        function updateCurrentSelectedIp(ip, intValue) {
            currentSelectedIp = ip;
            currentSelectedInt = intValue;
            document.getElementById('currentSelectedIp').textContent = ip;
            
            // Update chart to highlight connections for this IP
            updateChart();
            
            // Filter connections based on current IP
            filterConnections();
            
            // Log the selection
            addLogEntry(`Selected IP changed to ${ip} (${intValue})`);
        }
        
        // DOM manipulation functions
        function convertToIp() {
            const intInput = document.getElementById('intInput');
            const resultDiv = document.getElementById('conversionResult');
            
            if (!intInput.value) {
                resultDiv.textContent = 'IP Address: Please enter a value';
                resultDiv.className = 'result error';
                return;
            }
            
            const num = parseInt(intInput.value);
            if (isNaN(num) || num < 0 || num > 4294967295) {
                resultDiv.textContent = 'IP Address: Please enter a valid 32-bit integer (0-4294967295)';
                resultDiv.className = 'result error';
                return;
            }
            
            const ip = int32ToIp(num);
            resultDiv.textContent = `IP Address: ${ip}`;
            resultDiv.className = 'result success';
            
            // Automatically update the selected IP
            updateCurrentSelectedIp(ip, num);
            
            // Update the IP input field
            document.getElementById('ipInput').value = ip;
            
            addLogEntry(`Converted integer ${num} to IP ${ip}`);
            
            // Check connection status for this IP
            setTimeout(() => checkConnectionStatus(), 100);
        }
        
        function convertToInt() {
            const ipInput = document.getElementById('ipInput');
            const resultDiv = document.getElementById('conversionResult2');
            
            if (!ipInput.value) {
                resultDiv.textContent = '32-bit Integer: Please enter a value';
                resultDiv.className = 'result error';
                return;
            }
            
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (!ipRegex.test(ipInput.value)) {
                resultDiv.textContent = '32-bit Integer: Please enter a valid IP address';
                resultDiv.className = 'result error';
                return;
            }
            
            const parts = ipInput.value.split('.');
            for (let part of parts) {
                if (parseInt(part) < 0 || parseInt(part) > 255) {
                    resultDiv.textContent = '32-bit Integer: Each octet must be between 0 and 255';
                    resultDiv.className = 'result error';
                    return;
                }
            }
            
            const intValue = ipToInt32(ipInput.value);
            resultDiv.textContent = `32-bit Integer: ${intValue}`;
            resultDiv.className = 'result success';
            
            // Automatically update the selected IP
            updateCurrentSelectedIp(ipInput.value, intValue);
            
            // Update the integer input field
            document.getElementById('intInput').value = intValue;
            
            addLogEntry(`Converted IP ${ipInput.value} to integer ${intValue}`);
            
            // Check connection status for this IP
            setTimeout(() => checkConnectionStatus(), 100);
        }
        
        // Check connection status for current IP
        function checkConnectionStatus() {
            addLogEntry(`Checking connection status for ${currentSelectedIp}...`);
            
            // Find connections involving the current IP
            const relevantConnections = connections.filter(conn => 
                conn.src === currentSelectedInt || conn.dest === currentSelectedInt
            );
            
            if (relevantConnections.length === 0) {
                addLogEntry(`No connections found for ${currentSelectedIp}`);
            } else {
                relevantConnections.forEach(conn => {
                    const srcIp = int32ToIp(conn.src);
                    const destIp = int32ToIp(conn.dest);
                    const direction = conn.src === currentSelectedInt ? 'source' : 'destination';
                    addLogEntry(`Connection: ${srcIp} → ${destIp} (${conn.status}, latency: ${conn.latency}ms)`);
                });
            }
            
            // Update the display
            filterConnections();
        }
        
        // Filter connections based on current IP and status filter
        function filterConnections() {
            const filterValue = document.getElementById('statusFilter').value;
            
            // Filter connections that involve the current IP
            let filteredConnections = connections.filter(conn => 
                conn.src === currentSelectedInt || conn.dest === currentSelectedInt
            );
            
            // Apply status filter
            if (filterValue !== 'all') {
                filteredConnections = filteredConnections.filter(conn => 
                    conn.status.toLowerCase() === filterValue.toLowerCase()
                );
            }
            
            populateConnectionsTable(filteredConnections);
            
            // Update statistics
            updateStatistics(filteredConnections);
        }
        
        // Populate connections table
        function populateConnectionsTable(connectionsToShow = connections) {
            const tableBody = document.getElementById('connectionsTable');
            tableBody.innerHTML = '';
            
            connectionsToShow.forEach(conn => {
                const srcIp = int32ToIp(conn.src);
                const destIp = int32ToIp(conn.dest);
                
                // Check if this connection involves the current IP
                const isCurrentIp = conn.src === currentSelectedInt || conn.dest === currentSelectedInt;
                const connectionType = conn.src === currentSelectedInt ? 'Outgoing' : 
                                     (conn.dest === currentSelectedInt ? 'Incoming' : '');
                
                const row = document.createElement('tr');
                row.style.backgroundColor = isCurrentIp ? 'rgba(59, 130, 246, 0.3)' : '';
                row.innerHTML = `
                    <td>${srcIp} ${conn.src === currentSelectedInt ? '← (Current)' : ''}</td>
                    <td>${destIp} ${conn.dest === currentSelectedInt ? '← (Current)' : ''}</td>
                    <td><span class="status-badge ${conn.status === 'Active' ? 'status-active' : 'status-inactive'}">${conn.status}</span></td>
                    <td>${connectionType}</td>
                `;
                
                tableBody.appendChild(row);
            });
        }
        
        // Update statistics
        function updateStatistics(filteredConnections) {
            const totalConnections = connections.length;
            const activeConnections = connections.filter(c => c.status === 'Active').length;
            const inactiveConnections = totalConnections - activeConnections;
            
            const filteredActive = filteredConnections.filter(c => c.status === 'Active').length;
            
            document.getElementById('totalConnections').textContent = filteredConnections.length;
            document.getElementById('activeConnections').textContent = filteredActive;
            document.getElementById('inactiveConnections').textContent = filteredConnections.length - filteredActive;
            
            // Calculate average stats from historical data
            const avgLatency = Math.round(historicalData.reduce((sum, d) => sum + d.latency, 0) / historicalData.length);
            const peakTraffic = Math.max(...historicalData.map(d => d.active * 25 + 20));
            
            document.getElementById('avgResponseTime').textContent = `${avgLatency}ms`;
            document.getElementById('peakTraffic').textContent = peakTraffic;
            document.getElementById('packetLoss').textContent = '0.3%';
            document.getElementById('bandwidth').textContent = '100 Mbps';
        }
        
        // Create/update chart
        function createChart() {
            const ctx = document.getElementById('networkChart').getContext('2d');
            
            if (networkChart) {
                networkChart.destroy();
            }
            
            networkChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: historicalData.map(d => d.time),
                    datasets: [
                        {
                            label: 'Active Connections',
                            data: historicalData.map(d => d.active),
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Latency (ms)',
                            data: historicalData.map(d => d.latency),
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#e2e8f0'
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        if (context.dataset.label === 'Active Connections') {
                                            label += context.parsed.y + ' connections';
                                        } else {
                                            label += context.parsed.y + ' ms';
                                        }
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#e2e8f0'
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Connections',
                                color: '#10b981'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#e2e8f0',
                                callback: function(value) {
                                    return value + ' conn';
                                }
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Latency (ms)',
                                color: '#3b82f6'
                            },
                            grid: {
                                drawOnChartArea: false,
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#e2e8f0',
                                callback: function(value) {
                                    return value + ' ms';
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Update chart to highlight current IP
        function updateChart() {
            // Add a new data point for current time
            const now = new Date();
            const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
            
            // Get current stats
            const currentActive = connections.filter(c => 
                (c.src === currentSelectedInt || c.dest === currentSelectedInt) && c.status === 'Active'
            ).length;
            
            const currentLatency = connections
                .filter(c => c.src === currentSelectedInt || c.dest === currentSelectedInt)
                .reduce((sum, c) => sum + (c.latency || 0), 0) / 
                Math.max(1, connections.filter(c => c.src === currentSelectedInt || c.dest === currentSelectedInt).length);
            
            // Update chart data
            if (networkChart) {
                networkChart.data.labels.push(timeString);
                networkChart.data.datasets[0].data.push(currentActive);
                networkChart.data.datasets[1].data.push(Math.round(currentLatency));
                
                // Remove oldest data point if too many
                if (networkChart.data.labels.length > 15) {
                    networkChart.data.labels.shift();
                    networkChart.data.datasets[0].data.shift();
                    networkChart.data.datasets[1].data.shift();
                }
                
                networkChart.update();
            }
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
            
            // Keep only last 50 entries
            while (logContainer.children.length > 50) {
                logContainer.removeChild(logContainer.firstChild);
            }
        }
        
        // Generate random network events
        function simulateNetworkActivity() {
            setInterval(() => {
                // Randomly update a connection status
                const randomIndex = Math.floor(Math.random() * connections.length);
                const connection = connections[randomIndex];
                
                if (Math.random() > 0.7) {
                    const newStatus = connection.status === 'Active' ? 'Inactive' : 'Active';
                    connection.status = newStatus;
                    
                    const srcIp = int32ToIp(connection.src);
                    const destIp = int32ToIp(connection.dest);
                    
                    addLogEntry(`Connection ${srcIp} → ${destIp} changed to ${newStatus}`);
                    
                    // Update chart if this involves current IP
                    if (connection.src === currentSelectedInt || connection.dest === currentSelectedInt) {
                        filterConnections();
                        updateChart();
                    }
                }
                
                // Update latency randomly
                if (connection.status === 'Active') {
                    connection.latency = Math.floor(Math.random() * 50) + 20;
                    connection.packets = Math.floor(Math.random() * 150) + 30;
                }
                
            }, 5000); // Every 5 seconds
        }
        
        // Initialize the dashboard
        function initDashboard() {
            // Set initial values
            document.getElementById('intInput').value = currentSelectedInt;
            document.getElementById('ipInput').value = currentSelectedIp;
            document.getElementById('currentSelectedIp').textContent = currentSelectedIp;
            
            populateConnectionsTable();
            createChart();
            updateStatistics(connections);
            
            // Add initial log entries
            addLogEntry('System initialized');
            addLogEntry('Network monitoring started');
            addLogEntry(`Current selected IP: ${currentSelectedIp} (${currentSelectedInt})`);
            
            connections.forEach(conn => {
                const srcIp = int32ToIp(conn.src);
                const destIp = int32ToIp(conn.dest);
                addLogEntry(`Connection detected: ${srcIp} → ${destIp} (${conn.status})`);
            });
            
            // Add event listeners for Enter key
            document.getElementById('intInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') convertToIp();
            });
            
            document.getElementById('ipInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') convertToInt();
            });
            
            // Start simulation
            simulateNetworkActivity();
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
