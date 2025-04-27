// checks if a given value is strictly equal to the number 7. 
// It uses the strict equality operator (===), which checks both the value and the type of the variable being compared. 
function testStrict(val) {
  if (val === 7) {
    return "Equal";
  }
  return "Not Equal";
}

console.log(testStrict(7)); // Output: "Equal"
console.log(testStrict(7.0)); // Output: "Equal" (same value, different type)
console.log(testStrict("7")); // Output: "Not Equal" (string vs number)
console.log(testStrict(5)); // Output: "Not Equal"
// --------------------------------------------------------------------------
/*
The testNotEqual function checks if a given value is not equal to the number 99. 
It uses the loose inequality operator (!=), which evaluates whether two values are not equal, allowing for type coercion.*/
function testNotEqual(val) {
  if (val!= 99) { 
    return "Not Equal";
  }
  return "Equal";
}

console.log(testNotEqual(99));  // Output: "Equal"
console.log(testNotEqual(100)); // Output: "Not Equal"
console.log(testNotEqual("99")); // Output: "Not Equal" (due to type coercion)
console.log(testNotEqual(0));    // Output: "Not Equal"
/*
Real-World Application: Configuration Validation

Consider a scenario in a web application where you need to validate user input against a specific configuration value. 
Let’s say you want to ensure that a user does not select a specific configuration option represented by the value 99.*/ 
function validateConfiguration(option) {
    if (testNotEqual(option) === "Not Equal") {
        console.log("Configuration option is valid.");
    } else {
        console.log("Invalid configuration option selected.");
    }
}

// Example usage
validateConfiguration(99);  // Output: "Invalid configuration option selected."
validateConfiguration(50);   // Output: "Configuration option is valid."
validateConfiguration("99"); // Output: "Invalid configuration option selected."
// --------------------------------------------------------------------------
/*
Function checks if a given value is strictly not equal to the number 17. 
It uses the strict inequality operator (!==), which ensures both the value and type are considered in the comparison. */
function testStrictNotEqual(val) {
  if (val!== 17) { 
    return "Not Equal";
  }
  return "Equal";
}

console.log(testStrictNotEqual(17));   // Output: "Equal"
console.log(testStrictNotEqual(18));   // Output: "Not Equal"
console.log(testStrictNotEqual("17")); // Output: "Not Equal" (string vs number)
console.log(testStrictNotEqual(17.0)); // Output: "Equal" (same value, different type)

/*
Real-World Application: Access Control

Imagine you are developing a web application that has a feature restricted to users with a specific ID, which is 17. 
You want to ensure that only the user with this ID can access certain functionalities.

Define user roles and their permissions */ 
const acl = {
    17: ['module1', 'module2'], // User ID 17 has access to module1 and module2
    18: ['module2'],             // User ID 18 has access only to module2
    19: ['module1', 'module3'],  // User ID 19 has access to module1 and module3
};

// Function to check module access
function hasAccess(userId, module) {
    const userPermissions = acl[userId];
    if (userPermissions && userPermissions.includes(module)) {
        return "Access granted to " + module;
    }
    return "Access denied to " + module;
}

// Example usage
console.log(hasAccess(17, 'module1'));  // Output: "Access granted to module1"
console.log(hasAccess(17, 'module3'));  // Output: "Access denied to module3"
console.log(hasAccess(18, 'module2'));  // Output: "Access granted to module2"
console.log(hasAccess(19, 'module3'));  // Output: "Access granted to module3"
console.log(hasAccess(20, 'module1'));  // Output: "Access denied to module1"
// ---------------------------------------------------------------------------

function testGreaterThan(val) {
  return val > 100 ? "Over 100" :
         val > 10 ? "Over 10" :
         "10 or Under";
}

// Example usage
console.log(testGreaterThan(150)); // "Over 100"
console.log(testGreaterThan(50));  // "Over 10"
console.log(testGreaterThan(5));   // "10 or Under"

// Example in Number checker
// numberChecker.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Number Checker</title>
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
            padding: 10px;
        }
        .result {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Number Checker</h1>
    <input type="number" id="numberInput" placeholder="Enter a number" />
    <button onclick="checkNumber()">Check</button>
    <div class="result" id="result"></div>

    <script src="script.js"></script>
</body>
</html>

// script.js
function testGreaterThan(val) {
  return val > 100 ? "Over 100" :
         val > 10 ? "Over 10" :
         "10 or Under";
}

function checkNumber() {
  const input = document.getElementById('numberInput').value;
  const number = parseFloat(input);
  
  if (isNaN(number)) {
    document.getElementById('result').innerText = "Please enter a valid number.";
    return;
  }

  const result = testGreaterThan(number);
  document.getElementById('result').innerText = result;
}
// ------------------------------------------------------------------------------


function testGreaterOrEqual(val) {
  if (val >= 20) {  
    return "20 or Over";
  }
  
  if (val >= 10) {  
    return "10 or Over";
  }

  return "Less than 10";
}

console.log(testGreaterOrEqual(10)); // Change this value to test
// ---------------------------------------------------------------------------------

function testLessThan(val) {
  if (val < 25) {  
    return "Under 25";
  }
  
  if (val < 55) {  
    return "Under 55";
  }

  return "55 or Over";
}

console.log(testLessThan(10)); // Change this value to test
// ------------------------------------------------------------------------------------

function testLessOrEqual(val) {
  if (val <= 12) {  
    return "Smaller Than or Equal to 12";
  }
  
  if (val <= 24) {  
    return "Smaller Than or Equal to 24";
  }

  return "More Than 24";
}

console.log(testLessOrEqual(10)); // Change this value to test
// --------------------------------------------------------------------------------

function testLogicalAnd(val) {

  if (val <= 50 && val >= 25) {
    return "Yes";
  }

  return "No";
}

console.log(testLogicalAnd(10)); // Change this value to test
// -------------------------------------------------------------------------------------

function testLogicalOr(val) {
  if (val < 10 || val > 20) {
    return "Outside";
  }
  return "Inside";
}

console.log(testLogicalOr(1));// Change this value to test
// ---------------------------------------------------------------------------------

function testElse(val) {
  let result = "";

  if (val > 5) {
    result = "Bigger than 5";
  }else {
    result = "5 or Smaller";
  }

  return result;
}

console.log(testElse(4));
// ---------------------------------------------------------------------------------------
function testElseIf(val) {
  if (val > 10) {
    return "Greater than 10";
  } else if (val < 5) {
    return "Smaller than 5";
  } else {
    return "Between 5 and 10";
  }
}

console.log(testElseIf(7)); // Change this value to test
// ----------------------------------------------------------------------------------------
function orderMyLogic(val) {
  if(val < 5) {
    return "Less than 5";
  } else if (val < 10) {
    return "Less than 10";
  } else {
    return "Greater than or equal to 10";
  }
}
console.log(orderMyLogic(7));
// -----------------------------------------------------------------------------------------

//else if conditionals
function testSize(num) {

  if (num < 5) {
    return "Tiny";
  } else if (num < 10) {
    return "Small";
  } else if (num < 15) {
    return "Medium";
  } else if (num < 20) {
    return "Large";
  } else {
    return "Huge";
  }

}
console.log(testSize(19));
// ----------------------------------------------------------------------------------------------
// multiple else if conditionals
const names = ["Hole-in-one!", "Eagle", "Birdie", "Par", "Bogey", "Double Bogey", "Go Home!"];

function golfScore(par, strokes) {

  if (strokes == 1) {
    return names[0];
  } else if (strokes <= par - 2) {
    return names[1];
  } else if (strokes === par - 1) {
    return names[2];
  } else if (strokes === par) {
    return names[3];
  } else if (strokes === par + 1) {
    return names[4];
  } else if (strokes === par + 2) {
    return names[5];
  } else {
    return names[6];
  }

}

console.log(golfScore(5, 4)); // Birdie
// --------------------------------------------------------------------------------------------------

function caseInSwitch(val) {
  let answer = "";

  switch(val) {
    case 1:
      answer = "alpha";
      break;
    case 2:
      answer = "beta";
      break;
    case 3:
      answer = "gamma";
      break;
    case 4:
      answer = "delta";
      break;
  }

  return answer;
}

console.log(caseInSwitch(3)); // gamma
// -----------------------------------------------------------------------------------------------------------
function switchOfStuff(val) {
  let answer = "";

  switch (val) {
    case "a":
      answer = "apple";
      break;
    case "b":
      answer = "bird";
      break;
    case "c":
      answer = "cat";
      break;
    default:
      answer = "stuff";
  }

  return answer;
}
console.log(switchOfStuff("c")); // cat
// -----------------------------------------------------------------------------------------------------------
// Multiple Identical Options in Switch Statements
function sequentialSizes(val) {
  var answer = "";
  switch (val) {
    case 1:
    case 2:
    case 3:
      answer = "Low";
      break;
    case 4:
    case 5:
    case 6:
      answer = "Mid";
      break;
    case 7:
    case 8:
    case 9:
      answer = "High";
  }
  return answer;

}
console.log(sequentialSizes(1));
// ------------------------------------------------------------------------------------------------------------

  function analyzeScore(score) {
  let grade = '';

  switch (true) {
    case (score >= 80):
      grade = 'A';
      break;
    case (score >= 75):
      grade = 'B';
      break;
    case (score >= 65):
      grade = 'C';
      break;
    case (score >= 45):
      grade = 'D';
      break;
    case (score >= 30):
      grade = 'E';
      break;
    default:
      grade = 'F';
  }

  return grade;
}

// Example usage
const score1 = 85;
const grade1 = analyzeScore(score1);
console.log(`Score: ${score1}, Grade: ${grade1}`);

const score2 = 72;
const grade2 = analyzeScore(score2);
console.log(`Score: ${score2}, Grade: ${grade2}`);

// --------------------------------------------------------------------------------------------------------
function chainToSwitch(val) {
  var answer = "";
// changing else if to switch
  
  switch(val) {
    case "bob":
      answer = "Marley";
      break;
    case 42:
      answer = "The Answer";
      break;
    case 1:
      answer = "There is no #1";
      break;
    case 99:
      answer = "Missed me by this much!";
      break;
    case 7:
      answer = "Ate Nine";
      break;
  }
  

  return answer;  
}

console.log(chainToSwitch(7)); // Change this value to test
// ---------------------------------------------------------------------------------------------------

function isLess(a, b) {
// Returning Boolean Values from Functions
  return a < b;
}

console.log(isLess(20, 15)); // Change these values to test
// ----------------------------------------------------------------------------------------------------

// conditionals OR
function abTest(a, b) {
  if (a < 0 || b < 0) {
    return undefined;
  }

  return Math.round(Math.pow(Math.sqrt(a) + Math.sqrt(b), 2));
}

console.log(abTest(2, 2));
// The output will be 8 because the square root of 2 is approximately 1.414, and the sum of the two square roots is approximately 2.828. 
// Squaring 2.828 gives approximately 7.999, which is then rounded to the nearest whole number, 
// resulting in 8. This value is returned by the abTest function and printed to the console.

