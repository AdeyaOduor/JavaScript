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
