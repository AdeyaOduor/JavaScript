<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Game</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
         * {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-image: url('your-background-image.jpg'); /* Replace with your image URL */
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 300px;
}

h1 {
    color: #333;
}

button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Card Counting Game</h1>
            <p>Enter a card value (2-10, J, Q, K, A):</p>
            <input type="text" id="UserInput" placeholder="Enter card value" />
            <button id="Submit" onclick="updateCount()">Submit</button>
            <p id="result"></p>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>

  // count card game 2
let count = 0;

function cc(card) {
  
  var regex = /[JQKA]/;
  if (card > 1 && card < 7) {
    count++;
  } else if (card === 10 || regex.test(card)) {
    count--;
  }

  if (count > 0) return count + " Bet";
  return count + " Hold";

}
