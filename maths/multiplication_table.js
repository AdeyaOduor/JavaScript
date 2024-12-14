/* program to generate a multiplication table
upto a range in javascript
Method
take number input from the user
take range input from the user
create a multiplication table
*/
const number = parseInt(prompt('Enter an integer: '));
const range = parseInt(prompt('Enter a range: '));

for(let i = 1; i <= range; i++) {
    const result = i * number;
    console.log(`${number} * ${i} = ${result}`);
}
// --------------------------------------------------------------------------------------------------------------------------
    /*
    The function below starts by initializing an empty string called table to store the multiplication table.

    It then uses a for loop to iterate from 1 to 25, representing the 25 rows of the multiplication table.

    Inside the loop, for each iteration, the function concatenates a string that includes the current number i, 
    the number argument, and the result of multiplying i and number. This string is then added to the table variable.

    After each row (except the last one), the function adds a newline character \n to the table string to separate the rows.

    Finally, the function returns the completed table string.
*/
const multiTable = (number) => {
  let table = '';
  
  for(let i = 1; i <= 25; i++) {
    table += `${i} * ${number} = ${i * number}${i < 25 ? '\n' : ''}`; 
  }

  return table;
}
console.log(multiTable(10));
