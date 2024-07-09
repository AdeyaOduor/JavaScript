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
