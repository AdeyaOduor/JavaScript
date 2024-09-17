// The isValidIP function checks if a given string is a valid IPv4 address. Validating IP addresses is 
// crucial in various real-world applications, particularly in networking, web development, and cybersecurity.

function isValidIP(str) {
    return str.split('.').filter(function(v){return v==Number(v).toString() && Number(v)<256}).length==4;
  }
-----------------------------------------------------------------------------------------------------------------
// Example
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
