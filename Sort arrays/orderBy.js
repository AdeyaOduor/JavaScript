/* A JavaScript program to get a sorted array of objects ordered by properties and orders.
 Uses Array.prototype.sort(), Array.prototype.reduce() on the props array with a default value of 0.
 Use array destructuring to swap the properties position depending on the order supplied.
 If no orders array is supplied, sort by 'asc' by default.*/

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

const products = [
  { id: 1, name: 'Product A', price: 10, category: 'Electronics' },
  { id: 2, name: 'Product B', price: 20, category: 'Clothing' },
  { id: 3, name: 'Product C', price: 15, category: 'Electronics' },
  { id: 4, name: 'Product D', price: 25, category: 'Clothing' },
];

// Sort products by price in ascending order, then by category in descending order
const sortedProducts = orderBy(products, ['price', 'category'], ['asc', 'desc']);

const contacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: '2023-01-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: '2023-03-15' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', createdAt: '2023-02-10' },
];

// Sort contacts by creation date in descending order, then by name in ascending order
const sortedContacts = orderBy(contacts, ['createdAt', 'name'], ['desc', 'asc']);
