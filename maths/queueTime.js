/* There is a queue for the self-checkout tills at the supermarket. 
 Your task is write a function to calculate the total time required for all the customers to check out!*/

function queueTime(customers, n) {
  return Math.max(...customers.reduce((acc, c) => { let i = acc.indexOf(Math.min(...acc)); acc[i] = acc[i] + c;  return acc; },Array(n).fill(0)))
 }
