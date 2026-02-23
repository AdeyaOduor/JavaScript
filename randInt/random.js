// Initialize a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Function to handle the user's guess
function guessNumber() {
    // Retrieve the user's input
    const userInput = document.getElementById('UserInput').value;
    const resultDisplay = document.getElementById('result');

    // Parse the input to a number
    const guess = parseInt(userInput, 10);
    attempts++;

    // Validate the input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        resultDisplay.textContent = "Please enter a number between 1 and 100.";
        return;
    }

    // Check the guess against the random number
    if (guess < randomNumber) {
        resultDisplay.textContent = "Too low! Try again.";
    } else if (guess > randomNumber) {
        resultDisplay.textContent = "Too high! Try again.";
    } else {
        resultDisplay.textContent = `Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts.`;
        resetGame();  // Reset the game for a new round
    }

    // Clear the input for the next guess
    document.getElementById('UserInput').value = '';
}

// Function to reset the game by generating a new random number
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    // Optionally, reset the displayed result message after a few seconds
    setTimeout(() => {
        document.getElementById('result').textContent = "";
    }, 3000);
}

// Attach event listener to the button
document.getElementById('Submit').addEventListener('click', guessNumber);
