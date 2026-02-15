//program to return the minimum-maximum value of an array, after applying the provided function to set comparing rule. 

const reduce_Which = (arr, comparator = (a, b) => a - b) =>
  arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));
console.log(reduce_Which([1, 3, 2])); 
console.log(reduce_Which([10, 30, 20], (a, b) => b - a));  
console.log(reduce_Which(
  [{ name: 'Kevin', age: 16 }, { name: 'John', age: 20 }, { name: 'Ani', age: 19 }],
  (a, b) => a.age - b.age)); 
/*1
30
{ name: 'Kevin', age: 16 }*/
const numbers = [5, 2, 8, 1, 9];

// Find the minimum value
const minValue = reduce_Which(numbers);
// minValue = 1

// Find the maximum value
const maxValue = reduce_Which(numbers, (a, b) => b - a);
// maxValue = 9

const locations = [
  { name: 'Location A', latitude: 37.7749, longitude: -122.4194 },
  { name: 'Location B', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Location C', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Location D', latitude: 48.8566, longitude: 2.3522 }
];

// Calculate the distance between each location and a reference point
const referencePoint = { latitude: 39.9526, longitude: -75.1652 };
const distances = locations.map(loc => calculateDistance(referencePoint, loc));

// Find the closest location
const closestLocation = reduce_Which(locations, (a, b) => distances[locations.indexOf(a)] - distances[locations.indexOf(b)]);
// closestLocation = { name: 'Location B', latitude: 40.7128, longitude: -74.0060 }

// Find the farthest location
const farthestLocation = reduce_Which(locations, (a, b) => distances[locations.indexOf(b)] - distances[locations.indexOf(a)]);
// farthestLocation = { name: 'Location C', latitude: 51.5074, longitude: -0.1278 }

function calculateDistance(p1, p2) {
  // Implementation of distance calculation formula
}
// --------------------------------------------------------------------------------------------------------------------------------
/* Use Array.prototype.reduce() in combination with the comparator function to get the appropriate element in the array.
Omit the second argument, comparator, to use the default one that returns the minimum element in the array. */

function findLongestWordLength(s) {
  return s
    .split(' ')
    .reduce((longest, word) => Math.max(longest, word.length), 0);
}

// largest 1
function largestOfFour(arr) {
  return arr.map(Function.apply.bind(Math.max, null));
}

// largest 2
function largestOfFour(arr, finalArr = []) {
  return !arr.length
    ? finalArr
    : largestOfFour(arr.slice(1), finalArr.concat(Math.max(...arr[0])))
}

/*Count the number of entries that are smaller than the new value num
The new value would be inserted after these values*/
function getIndexToIns(arr, num) {
  return arr.filter(val => num > val).length;
}

getIndexToIns([40, 60], 50);
// -------------------------------------------------------------------------------------------------------------------------------------

// program to check whether two numbers are in range 40..60 or in the range 70..100 inclusive

function numbers_ranges(x, y) {
  if ((x >= 40 && x <= 60 && y >= 40 && y <= 60) 
      || 
      (x >= 70 && x <= 100 && y >= 70 && y <= 100))
     {
    return true;
     } 
    else 
     {
    return false;
  }
}

console.log(numbers_ranges(44, 56)); // true

/*
examples:

    Quality Control/Assurance:
        In a manufacturing or production process, this function could be used to check if the measurements of a product or component 
        fall within the acceptable quality ranges. If the measurements are within the specified ranges, the product can be considered 
        as passing the quality check.

    Sensor Validation:
        In sensor-based systems, such as environmental monitoring or industrial automation, this function could be used to validate the 
        sensor readings. If the sensor readings for two related parameters fall within the expected ranges, the system can consider the 
        sensor data to be reliable.

    Threshold Checks:
        In various decision-making processes, this function can be used to check if two input values fall within predefined thresholds. 
        For example, in a financial application, it could be used to check if the values of two financial indicators (e.g., price-to-earnings 
        ratio, debt-to-equity ratio) are within the recommended ranges for a particular investment strategy.

    Anomaly Detection:
        In data analysis and monitoring applications, this function could be used to detect anomalies or outliers. If the values of two related 
        variables fall outside the expected ranges, it could indicate a potential issue or an unusual event that requires further investigation.

    Game/Simulation Mechanics:
        In the context of game development or simulations, this function could be used to define valid or acceptable ranges for various game 
        parameters or simulation inputs. For example, in a physics-based game, this function could be used to ensure that the movement or position 
        of in-game objects stays within realistic boundaries.

    Validation in Web/Mobile Applications:
        In web or mobile applications that involve user input, this function could be used to validate the entered values, ensuring they fall within 
        the expected ranges. This can be particularly useful for form validations or user settings.
 */
// Example sensor data
const sensorReadings = [
  { temperature: 55, humidity: 52 },
  { temperature: 72, humidity: 78 },
  { temperature: 45, humidity: 48 },
  { temperature: 62, humidity: 65 },
  { temperature: 85, humidity: 90 },
  { temperature: 35, humidity: 30 }
];

// Detect anomalies
for (const reading of sensorReadings) {
  if (!numbers_ranges(reading.temperature, reading.humidity)) {
    console.log("Anomaly detected: Temperature =", reading.temperature, ", Humidity =", reading.humidity);
  }
}
/*
Anomaly detected: Temperature = 62 , Humidity = 65
Anomaly detected: Temperature = 35 , Humidity = 30*/

// Example in Validation in Web/Mobile Applications:
<!DOCTYPE html>
<html>
<head>
  <title>User Registration</title>
  <style>
    .error { color: red; }
  </style>
</head>
<body>
  <h1>User Registration</h1>
  <form id="registrationForm">
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" required>
    <span id="ageError" class="error"></span>
    <br>
    <label for="income">Annual Income:</label>
    <input type="number" id="income" name="income" required>
    <span id="incomeError" class="error"></span>
    <br>
    <button type="submit">Register</button>
  </form>

  <script>
    function numbers_ranges(x, y) {
      if ((x >= 18 && x <= 65 && y >= 20000 && y <= 150000) 
          || 
          (x >= 65 && x <= 100 && y >= 20000 && y <= 100000))
         {
        return true;
         } 
        else 
         {
        return false;
      }
    }

    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const age = parseInt(document.getElementById('age').value);
      const income = parseInt(document.getElementById('income').value);

      if (!numbers_ranges(age, income)) {
        document.getElementById('ageError').textContent = 'Age must be between 18 and 100 years.';
        document.getElementById('incomeError').textContent = 'Annual income must be between $20,000 and $150,000.';
      } else {
        // Form is valid, submit the data
        form.submit();
      }
    });
  </script>
</body>
</html>
