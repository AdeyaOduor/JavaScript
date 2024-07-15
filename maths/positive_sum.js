// You get an array of numbers, return the sum of all of the positives ones.
function positiveSum(arr) {
    var sum = 0;
    for(var i = 0; i < arr.length; i++) {
      if(arr[i] > 0) {
       sum += arr[i];
     }
    }
   return sum;
   }
------------------------------------------------------------------------------------
// method 2
function positiveSum(arr) {
    let b= arr.filter(a => a>=0)
    let c= b.reduce((a,b)=> a+=b, 0)
    return c
    } 
/*
Here are a few examples of how this function could be applied in real-world scenarios:

    Financial Accounting and Budgeting:
        In financial accounting, you might have an array of income and expense values, and you want to quickly calculate the total positive income (i.e., the sum of all positive values) to determine the overall financial health of a business or individual.
        When creating a budget, you can use the positiveSum function to calculate the total expected positive cash flow (e.g., from sales, investments, or other sources of income) to ensure that it covers the expected expenses.

    Inventory Management:
        In an inventory management system, you might have an array of stock levels or inventory quantities. The positiveSum function could be used to calculate the total positive inventory, which represents the items that are currently available for sale or distribution.
        This information can be used to assess the overall health of the inventory, identify any stock shortages, and plan for future inventory orders or production.

    Sensor Data Analysis:
        In the context of sensor data analysis (e.g., for environmental monitoring, industrial automation, or IoT applications), you might have an array of sensor readings or measurements. The positiveSum function could be used to calculate the total positive values, which could represent the cumulative amount of a particular substance, energy, or resource detected by the sensors.
        This information can be used to identify trends, detect anomalies, or trigger alerts based on the overall positive sensor readings.

    Population Statistics:
        When working with population data, you might have an array of values representing the population sizes of different regions or demographic groups. The positiveSum function could be used to calculate the total positive population, which represents the sum of all the non-negative population values.
        This information can be useful for demographic analysis, urban planning, resource allocation, and other applications that require understanding the overall population dynamics.

    Biological and Medical Data Analysis:
        In the context of biological or medical data, you might have an array of measurements or test results (e.g., blood pressure, heart rate, or enzyme levels). The positiveSum function could be used to calculate the total positive values, which could represent the cumulative or average positive measurements for a patient or a group of patients.
        This information can be used for disease diagnosis, treatment monitoring, or population-level health assessments.
*/
