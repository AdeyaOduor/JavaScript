//program to convert a comma-separated values (CSV) string to a 2D array
const csv_to_array = (data, delimiter = ',', omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(delimiter));

console.log(csv_to_array('a,b\nc,d')); 
console.log(csv_to_array('a;b\nc;d', ';')); 
console.log(csv_to_array('head1,head2\na,b\nc,d', ',', true));
/* [ [ 'a', 'b' ], [ 'c', 'd' ] ]
[ [ 'a', 'b' ], [ 'c', 'd' ] ]
[ [ 'a', 'b' ], [ 'c', 'd' ] ]*/

const salesData = csv_to_array(fetchCSVData('sales_data.csv'), ',', true);
// Analyze the sales data and generate visualizations

// Assuming the CSV data is submitted through a form
const csvData = document.getElementById('csv-upload').value;
const parsedData = csv_to_array(csvData, ',', true);
// Store the parsed data in the application's database

const sourceData = csv_to_array(fetchCSVData('source_data.csv'), ',', false);
// Perform data transformations on the parsed data
const transformedData = sourceData.map(row => transformRow(row));
// Load the transformed data into a database

const stockPriceData = csv_to_array(fetchCSVData('stock_prices.csv'), ',', true);
// Visualize the stock price data in a custom charting application
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
