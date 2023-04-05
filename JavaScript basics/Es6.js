// destructuring-via-rest-elements.

function removeFirstTwo(list) {
  const [, , ...shorterList] = list;
  return shorterList;
}

const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sourceWithoutFirstTwo = removeFirstTwo(source)

// use-destructuring-assignment-to-assign-variables-from-arrays.txt

let a = 8, b = 6;

 [a,b] = [b,a];

console.log(a); // should be 6
console.log(b); // should be 8

// use-destructuring-assignment-to-assign-variables-from-arrays.

let a = 8, b = 6;
 [a,b] = [b,a];

console.log(a); // should be 6
console.log(b); // should be 8
    
// create-strings-using-template-literals.
/*Use template literal syntax with backticks to create an array of list element (li) strings. Each list element's text should be one of the array elements from the failure property on the result object and 
have a class attribute with the value text-warning. The makeList function should return the array of list item strings. 
*/

const result = {
  success: ["max-length", "no-amd", "prefer-arrow-functions"],
  failure: ["no-var", "var-on-top", "linebreak"],
  skipped: ["no-extra-semi", "no-dup-keys"]
};
function makeList(arr) {
  return arr.map(val => `<li class="text-warning">${val}</li>`);
}

const failuresList = makeList(result.failure);
