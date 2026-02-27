/*
How to get the current date and time using JavaScript. 
It formats the output to indicate the day of the week and the current time in a user-friendly manner. */

// DateTime.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Date and Time Display</title>
    <style>
       body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 300px;
}

h1 {
    color: #333;
}

p {
    font-size: 1.2em;
    color: #555;
}

button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
}

button:hover {
    background-color: #218838;
}
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Current Date and Time</h1>
            <p id="day"></p>
            <p id="time"></p>
            <button id="refresh" onclick="updateTime()">Refresh Time</button>
        </div>
    </div>
    <script>
       function updateTime() {
       const today = new Date(); // Get the current date and time
       const day = today.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
       const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
       let hour = today.getHours(); // Get the hour (0-23)
       const minute = today.getMinutes(); // Get the minutes (0-59)
       const second = today.getSeconds(); // Get the seconds (0-59)
       let prepand = (hour >= 12) ? " PM " : " AM "; // Determine AM or PM

    // Convert to 12-hour format
       hour = hour % 12; 
       hour = hour ? hour : 12; // Correct hour 0 to be 12
    
    // Update UI
    document.getElementById('day').textContent = `Today is: ${daylist[day]}`;
    document.getElementById('time').textContent = `Current Time: ${hour}${prepand} : ${minute} : ${second}`;
}

// Initialize the time display
updateTime();
    </script>
</body>
</html>
