// destructuring-via-rest-elements.

function removeFirstTwo(list) {
  const [, , ...shorterList] = list;
  return shorterList;
}

const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sourceWithoutFirstTwo = removeFirstTwo(source)

// use-destructuring-assignment-to-assign-variables-from-arrays.

let a = 8, b = 6;
 [a,b] = [b,a];

console.log(a); // should be 6
console.log(b); // should be 8
    
