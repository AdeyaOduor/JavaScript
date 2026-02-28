// steamrollArray function is designed to recursively flatten a multi-dimensional array into a single-dimensional array.
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

const nestedData = [1, [2, [3, 4], 5], [6, [7, 8]]];
const flatData = steamrollArray(nestedData);
console.log(flatData); 

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
console.log(flatSensorData); 

const userPreferences = [
    "notifications",
    ["email", ["sms", "push"]],
    "language",
    ["English", ["Spanish", "French"]]
];

const flattenedPreferences = steamrollArray(userPreferences);
console.log(flattenedPreferences); 

const flattenedPreferences = steamrollArray(userPreferences);
console.log(flattenedPreferences); 
// Output: ["notifications", "email", "sms", "push", "language", "English", "Spanish", "French"]
