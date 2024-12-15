/* There is a queue for the self-checkout tills at the supermarket. 
 Your task is write a function to calculate the total time required for all the customers to check out!*/

function queueTime(customers, n) {
  return Math.max(...customers.reduce((acc, c) => { let i = acc.indexOf(Math.min(...acc)); acc[i] = acc[i] + c;  return acc; },Array(n).fill(0)))
 }

// --------------------------------------------------------------------------------------------------------------------------------------------------
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
/*
In this example, we have 5 customers who arrive at the bank and join the queue. The bank has 3 teller stations, so n = 3.

The queueTime function works as follows:

    It initializes an array acc with n elements, all set to 0. This represents the current wait time at each teller station.
    It then iterates through the customers array, adding the current customer's service time to the teller station with the minimum current wait time.
    After processing all customers, the function returns the maximum value in the acc array, which represents the maximum time it takes for all customers
    to be served.

In the example, the function will return 9, which is the maximum time it takes for all 5 customers to be served. This means that the last customer 
will have to wait 9 minutes before being served.

This type of scenario is common in many service-oriented businesses, such as banks, supermarkets, or theme parks, where customers arrive at different 
times and need to be served by a limited number of resources (teller stations, checkout counters, or ride queues). The queueTime function can be used 
to optimize the resource allocation and provide better service to customers.

By understanding the real-world application of the queueTime function, you can see how it can be used to solve practical problems in various industries, 
helping to improve customer experience and optimize the use of limited resources.*/
