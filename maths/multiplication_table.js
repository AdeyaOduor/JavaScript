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


// or
const multiTable = (number) => {
  let table = '';
  
  for(let i = 1; i <= 10; i++) {
    table += `${i} * ${number} = ${i * number}${i < 10 ? '\n' : ''}`; 
  }

  return table;
}
