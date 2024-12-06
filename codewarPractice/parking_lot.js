const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Middleware to parse JSON bodies

// ParkingLot class definition
class ParkingLot {
  constructor(spaces) {
    this.limit = spaces;
    this.number = 0;
    this.cars = {};
  }

  park(car) {
    if (this.number < this.limit) {
      if (this.cars[car.name] !== undefined) {
        return 'Car is already inside parking lot';
      } else {
        this.cars[car.name] = car;
        this.number++;
        return 'Car parked successfully';
      }
    } else {
      return 'The parking lot is full!';
    }
  }

  exit(car) {
    if (this.number === 0) {
      return 'There are no cars in the parking lot';
    } else if (this.cars[car.name] === undefined) {
      return 'The car is not in the parking lot';
    } else {
      delete this.cars[car.name];
      this.number--;
      return 'Car exited successfully';
    }
  }

  available() {
    return this.number < this.limit;
  }
}

// Create a ParkingLot instance with a limit of 5 spaces
const parkingLot = new ParkingLot(5);

// API endpoints
app.post('/park', (req, res) => {
  const car = req.body; // Expecting { name: 'CarName' }
  const message = parkingLot.park(car);
  res.send(message);
});

app.post('/exit', (req, res) => {
  const car = req.body; // Expecting { name: 'CarName' }
  const message = parkingLot.exit(car);
  res.send(message);
});

app.get('/available', (req, res) => {
  const isAvailable = parkingLot.available();
  res.send({ available: isAvailable });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
