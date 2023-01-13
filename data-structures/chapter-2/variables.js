/* When JavaScript variables are declared, they have an initial value of undefined. A mathematical operation on an undefined variable your result will be NaN which means "Not a Number". If you concatenate a string with an undefined variable, you will get a string of undefined.*/

// Variable declarations
var studlyCapVar;
var properCamelCase;
var titleCaseOver;

// Variable assignments
studlyCapVar = 10;
properCamelCase = "A String";
titleCaseOver= 9000;

// initializing variables
var a = 5;
var b = 10;
var c = "I am a";

a = a + 1;
b = b + 5;
c = c + " String!";

// variable declaration
var camper = "James";
var camper = "David";
console.log(camper); // no error, varaible overriden

let camper = "James";
let camper = "David";// produce error, variable cannot be overriden

const FCC = "freeCodeCamp";
let fact = "is cool!";

fact = "is awesome!";
console.log(FCC, fact);

let a = 48;
let b = 108;
let c = 33;

// The /= operator divides a variable by another number.
a /= 12;
b /= 4;
c /= 11;
