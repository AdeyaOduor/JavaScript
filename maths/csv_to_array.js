/* program to convert a comma-separated values (CSV) string to a 2D array
1. Function Definition
    const csv_to_array: This declares a constant variable csv_to_array and assigns it a function.
    Parameters:
        data: A string containing CSV data.
        delimiter: A string that specifies the character used to separate values in the CSV (default is a comma ,).
        omitFirstRow: A boolean that indicates whether to skip the first row (often used for headers).

2. Function Logic
    slice Method:
        This method is used to remove the first row from the data if omitFirstRow is true. It uses data.indexOf('\n') 
        to find the position of the first newline character and slices the string from there onward.
        If omitFirstRow is false, it starts from the beginning of the string.

    split('\n'):
        After slicing, the data is split into an array of rows based on the newline character.

    map(v => v.split(delimiter)):
        Finally, for each row, it splits the row into individual values (columns) based on the specified delimiter, resulting 
        in a two-dimensional array where each inner array represents a row of data.
*/
const csv_to_array = (data, delimiter = ',', omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0) // Remove the first row if specified
    .split('\n') // Split the data into rows
    .map(v => v.split(delimiter)); // Split each row into columns


const salesData = csv_to_array(fetchCSVData('sales_data.csv'), ',', true);
const stockPriceData = csv_to_array(fetchCSVData('stock_prices.csv'), ',', true);
// Perform data transformations on the parsed data
const transformedData = sourceData.map(row => transformRow(row));
// Analyze the sales data and generate visualizations

// Assuming the CSV data is submitted through a form
const csvData = document.getElementById('csv-upload').value;
const parsedData = csv_to_array(csvData, ',', true);

/*
Store the parsed data in the application's database
Load the transformed data into a database
Visualize the stock price data in a custom charting application*/ 
// ---------------------------------------------------------------------------------------

  // Extract the CSV data
const rawSalesData = fetchCSVData('sales_data.csv');

// Parse the CSV data into a nested array
const salesData = csv_to_array(rawSalesData, ',', true);

// Transform the data
const transformedSalesData = salesData.map(row => {
  return {
    productId: parseInt(row[0]),
    productName: row[1],
    quantity: parseInt(row[2]),
    price: parseFloat(row[3]),
    date: new Date(row[4])
  };
});

// Load the transformed data into a database
saveDataToDatabase(transformedSalesData);
