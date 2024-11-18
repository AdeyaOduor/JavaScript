/* A JavaScript program to get a sorted array of objects ordered by properties and orders.
 Uses Array.prototype.sort(), Array.prototype.reduce() on the props array with a default value of 0.
 Use array destructuring to swap the properties position depending on the order supplied.
 If no orders array is supplied, sort by 'asc' by default.

 Application Examples:
 1. Sorting User Data in Applications
In web applications, you often need to display user data (e.g., usernames, registration dates) in a sorted manner.

2. Sorting Product Listings in E-commerce
In e-commerce platforms, products can be sorted by price, rating, or availability.

3. Sorting Orders in a Management System
In order management systems, sorting orders by date and status can help in tracking and managing them effectively.

4. Sorting Student Records in Educational Software
In educational applications, student records might need to be sorted by GPA and then by last name.
*/

const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );
const users = [{ name: 'Peter', age: 43 }, { name: 'David', age: 41 }, { name: 'Margaret', age: 54 }];

console.log(orderBy(users, ['name', 'age'], ['asc', 'desc'])); 
console.log(orderBy(users, ['name', 'age']));

const users = [
  { name: 'Alice', age: 30, registrationDate: '2023-01-15' },
  { name: 'Bob', age: 25, registrationDate: '2023-02-10' },
  { name: 'Charlie', age: 35, registrationDate: '2023-01-20' }
];

const sortedUsers = orderBy(users, ['age', 'registrationDate'], ['asc', 'desc']);
console.log(sortedUsers);
/*
Output:
[
  { name: 'Bob', age: 25, registrationDate: '2023-02-10' },
  { name: 'Alice', age: 30, registrationDate: '2023-01-15' },
  { name: 'Charlie', age: 35, registrationDate: '2023-01-20' }
]
*/
// ----------------------------------------------------------------------------------------------------------------------------

const products = [
  { id: 1, name: 'Product A', price: 10, category: 'Electronics' },
  { id: 2, name: 'Product B', price: 20, category: 'Clothing' },
  { id: 3, name: 'Product C', price: 15, category: 'Electronics' },
  { id: 4, name: 'Product D', price: 25, category: 'Clothing' },
];

// Sort products by price in ascending order, then by category in descending order
const sortedProducts = orderBy(products, ['price', 'category'], ['asc', 'desc']);
// --------------------------------------------------------------------------------------
const products = [
  { name: 'Laptop', price: 999, rating: 4.5 },
  { name: 'Phone', price: 699, rating: 4.7 },
  { name: 'Tablet', price: 499, rating: 4.3 }
];

const sortedProducts = orderBy(products, ['price', 'rating'], ['asc', 'desc']);
console.log(sortedProducts);
/*
Output:
[
  { name: 'Tablet', price: 499, rating: 4.3 },
  { name: 'Phone', price: 699, rating: 4.7 },
  { name: 'Laptop', price: 999, rating: 4.5 }
]
*/
// ----------------------------------------------------------------------------------------------------------------------------------------

const orders = [
  { id: 1, date: '2023-03-01', status: 'shipped' },
  { id: 2, date: '2023-02-28', status: 'pending' },
  { id: 3, date: '2023-03-02', status: 'delivered' }
];

const sortedOrders = orderBy(orders, ['date', 'status'], ['asc', 'desc']);
console.log(sortedOrders);
/*
Output:
[
  { id: 2, date: '2023-02-28', status: 'pending' },
  { id: 1, date: '2023-03-01', status: 'shipped' },
  { id: 3, date: '2023-03-02', status: 'delivered' }
]
*/
// ----------------------------------------------------------------------------------------

const contacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: '2023-01-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: '2023-03-15' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', createdAt: '2023-02-10' },
];

// Sort contacts by creation date in descending order, then by name in ascending order
const sortedContacts = orderBy(contacts, ['createdAt', 'name'], ['desc', 'asc']);

const flights = [
  { id: 1, from: 'New York', to: 'Los Angeles', duration: 6, price: 400 },
  { id: 2, from: 'London', to: 'Paris', duration: 1.5, price: 150 },
  { id: 3, from: 'Tokyo', to: 'Seoul', duration: 2.5, price: 300 },
  { id: 4, from: 'Sydney', to: 'Melbourne', duration: 1, price: 80 },
];

// Sort flights by price in ascending order, then by duration in descending order
const sortedFlights = orderBy(flights, ['price', 'duration'], ['asc', 'desc']);
