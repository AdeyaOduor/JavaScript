// Flatten a nested array, accounting for varying levels of nesting.
function steamrollArray(arr) {
  let flattened = [];

  arr.map(val => {
    if (!Array.isArray(val)) {
      flattened.push(val);
    }
    else {
      flattened.push(...steamrollArray(val));
    }
  })

  return flattened;
}
// This could be used to prepare data for further processing or analysis, where a flat data structure is required.
const nestedData = [1, [2, [3, 4], 5], [6, [7, 8]]];
const flatData = steamrollArray(nestedData); // flatData = [1, 2, 3, 4, 5, 6, 7, 8]

const sensorData = [
  {
    id: 1,
    readings: [
      { timestamp: '2023-07-29', value: 10 },
      { timestamp: '2023-07-30', value: 12 }
    ]
  },
  {
    id: 2,
    readings: [
      { timestamp: '2023-07-29', value: 8 },
      { timestamp: '2023-07-30', value: 9 },
      { timestamp: '2023-07-31', value: 11 }
    ]
  }
];

const flatSensorData = steamrollArray(sensorData);
// flatSensorData is an array containing all the sensor readings
