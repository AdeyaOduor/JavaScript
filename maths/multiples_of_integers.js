// program adding multiples of 9 upto 250
const num=[]
for(let i=9; i <=250; i+=9){
num.push(i)
}
console.log(num); /* [
    9,  18,  27,  36,  45,  54,  63,
   72,  81,  90,  99, 108, 117, 126,
  135, 144, 153, 162, 171, 180, 189,
  198, 207, 216, 225, 234, 243
]

Real World Applications include:
    Scheduling and Timetabling:
        In scheduling applications, such as school or work timetables, the array of numbers could represent time slots in a day, 
        with each increment of 9 representing a 15-minute interval (assuming a standard 9-to-5 workday).
        This could be used to efficiently generate a list of available time slots for scheduling meetings, classes, or other events.

    Inventory Management:
        In a retail or manufacturing setting, the array of numbers could represent the quantities of a particular product or component 
        that need to be maintained in inventory.
        By using the array, you can easily track and manage the inventory levels, ensuring that you have the right amounts at the right 
        times.

    Numerical Simulations:
        In scientific or engineering applications, the array of numbers could represent a range of input values or parameters for a numerical 
        simulation or model.
        For example, in a fluid dynamics simulation, the array could represent different flow rates or pressure values that need to be tested.

    Pricing and Discounting:
        In the context of pricing or discounting, the array of numbers could represent the different price points or discount levels that a 
        business might offer for a product or service.
        This could be useful for implementing dynamic pricing strategies or for automating the process of generating pricing tables.

    Time Series Analysis:
        In the field of time series analysis, the array of numbers could represent a sequence of time points or intervals, such as months or 
        quarters, that need to be analyzed.
        This could be useful for tasks like forecasting, trend analysis, or identifying seasonal patterns in data.

    Tax Calculations:
        In the realm of taxation, the array of numbers could represent different tax brackets or income thresholds that need to be considered when calculating tax liabilities.
        This could help streamline the process of computing taxes for individuals or businesses.
*/
// Tax Calculations
const taxBrackets = [];
for (let i = 10; i <= 300; i += 10) {
  taxBrackets.push(i * 1000); // Assuming the income is in dollars
}

console.log(taxBrackets);
/* [
   10000,  20000,  30000,  40000,
   50000,  60000,  70000,  80000,
   90000, 100000, 110000, 120000,
  130000, 140000, 150000, 160000,
  170000, 180000, 190000, 200000,
  210000, 220000, 230000, 240000,
  250000, 260000, 270000, 280000,
  290000, 300000
]
*/
function calculateTax(income) {
  let tax = 0;

  // Calculate tax for each bracket
  for (let i = 0; i < taxBrackets.length; i++) {
    if (income <= taxBrackets[i]) {
      tax += income * 0.1; // 10% tax rate
      return tax;
    } else if (income > taxBrackets[i] && income <= taxBrackets[i + 1]) {
      tax += (taxBrackets[i + 1] - taxBrackets[i]) * 0.15; // 15% tax rate
      income -= taxBrackets[i + 1];
    } else if (income > taxBrackets[i] && income <= taxBrackets[i + 2]) {
      tax += (taxBrackets[i + 2] - taxBrackets[i + 1]) * 0.2; // 20% tax rate
      income -= taxBrackets[i + 2];
    } else if (income > taxBrackets[i] && income <= taxBrackets[i + 3]) {
      tax += (taxBrackets[i + 3] - taxBrackets[i + 2]) * 0.25; // 25% tax rate
      income -= taxBrackets[i + 3];
    } else {
      tax += (income - taxBrackets[i + 3]) * 0.3; // 30% tax rate
      return tax;
    }
  }

  return tax;
}

const personIncome = 125000;
const personTax = calculateTax(personIncome);
console.log(`The person's tax liability is: $${personTax.toFixed(2)}`);
// Output: The person's tax liability is: $20000.00
