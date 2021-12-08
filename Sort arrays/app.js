// A JavaScript program to get a sorted array of objects ordered by properties and orders.

// Uses Array.prototype.sort(), Array.prototype.reduce() on the props array with a default value of 0.
// Use array destructuring to swap the properties position depending on the order supplied.
// If no orders array is supplied, sort by 'asc' by default.



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
