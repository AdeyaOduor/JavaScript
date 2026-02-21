<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Game</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
    
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
