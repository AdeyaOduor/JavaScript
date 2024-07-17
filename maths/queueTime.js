/* There is a queue for the self-checkout tills at the supermarket. 
 Your task is write a function to calculate the total time required for all the customers to check out!*/

function queueTime(customers, n) {
  return Math.max(...customers.reduce((acc, c) => { let i = acc.indexOf(Math.min(...acc)); acc[i] = acc[i] + c;  return acc; },Array(n).fill(0)))
 }


// Suppose the bank has 3 teller stations
const n = 3;

// Customers arrive at the bank and join the queue
const customers = [1, 2, 3, 4, 5];

// Use the queueTime function to determine the maximum time it takes for all customers to be served
const maxWaitTime = queueTime(customers, n);

console.log(`The maximum wait time for all customers is ${maxWaitTime} minutes.`);

function queueTime(customers, n) {
  return Math.max(
    ...customers.reduce(
      (acc, c) => {
        const minIndex = acc.indexOf(Math.min(...acc));
        acc[minIndex] = acc[minIndex] + c;
        return acc;
      },
      Array(n).fill(0)
    )
  );
}
