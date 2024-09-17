/* The isValidIP function checks if a given string is a valid IPv4 address. Validating IP addresses is 
   crucial in various real-world applications, particularly in networking, web development, and cybersecurity.*/

function isValidIP(str) {
    return str.split('.').filter(function(v){return v==Number(v).toString() && Number(v)<256}).length==4;
  }

/* In security applications, validating IP addresses can be crucial for access control mechanisms (e.g., 
   allowing or denying access based on IP address).*/
const allowedIPs = ["192.168.1.10", "10.0.0.5"];

function checkAccess(ipAddress) {
    if (!isValidIP(ipAddress)) {
        console.log("Invalid IP address.");
        return;
    }
    if (allowedIPs.includes(ipAddress)) {
        console.log("Access granted.");
    } else {
        console.log("Access denied.");
    }
}

checkAccess("192.168.1.10"); // Access granted
checkAccess("999.999.999.999"); // Invalid IP address
-----------------------------------------------------------------------------------------------------------------
// Example 1
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IP Address Validator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        input {
            padding: 10px;
            margin-right: 10px;
        }
        button {
            padding: 10px 15px;
        }
        .message {
            margin-top: 20px;
        }
    </style>
</head>
<body>

<h1>IP Address Validator</h1>
<input type="text" id="ipAddress" placeholder="Enter an IP address">
<button id="submit">Validate IP</button>
<div class="message" id="message"></div>

<script>
    function isValidIP(str) {
        return str.split('.').filter(function(v) {
            return v == Number(v).toString() && Number(v) < 256;
        }).length == 4;
    }

    document.getElementById('submit').addEventListener('click', function() {
        const ipInput = document.getElementById('ipAddress').value;
        const messageDiv = document.getElementById('message');
        
        if (!isValidIP(ipInput)) {
            messageDiv.textContent = "Please enter a valid IPv4 address.";
            messageDiv.style.color = "red";
        } else {
            messageDiv.textContent = `IP Address: ${ipInput} is valid.`;
            messageDiv.style.color = "green";
        }
    });
</script>

</body>
</html>
--------------------------------------------------------------------------------------------
   /* Example 2
   Implementing API input validation for an IP address using Node.js and Express. 
   This application includes an endpoint where users can submit an IP address, which is then validated using the isValidIP funct*/
