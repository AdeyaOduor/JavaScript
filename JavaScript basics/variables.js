/* When JavaScript variables are declared, they have an initial value of undefined. 
A mathematical operation on an undefined variable your result will be NaN which means "Not a Number". 
If you concatenate a string with an undefined variable, you will get a string of undefined.*/

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
---------------------------------------------------------------------------------
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
----------------------------------------------------------------------------------
// The /= operator divides a variable by another number.
let a = 48;
let b = 108;
let c = 33;

a /= 12;
b /= 4;
c /= 11; // output is a=4, b=27 and c=3 repectively

/*Compound Assignment With Augmented Addition, multiplication, division and subtraction respectively*/
let a = 3;
let b = 17;
let c = 12;

a += 12;
b += 9;
c += 7; // output a=15, b=26, and c=19 respectively

// increment or add one to a variable with the ++ operator.
let myVar = 87;
myVar++; // output 88

// decrement or decrease a variable by one with the -- operator.
let myVar = 11;
myVar--; //output 10

const myStr = "I am a \"double quoted\" string inside \"double quotes\"."; // Escaping Literal Quotes in Strings

//Quoting Strings with Single Quotes
var myStr = '<a href="http://www.example.com" target="_blank">Link</a>';

// Concatenating Strings 
const myStr = "I come first. " + "I come second."; 
let myStr = "This is the first sentence. "
myStr += "This is the second sentence.";

const myName = "David";
const myStr = "My name is " + myName + " and I am well!";

const someAdjective = "worthwhile";
let myStr = "Learning to code is ";
myStr += someAdjective;

// Find the Length of a String
let lastNameLength = 0;
const lastName = "Lovelace";

lastNameLength = lastName.length;

//Quoting Strings with Single Quotes
var myStr = '<a href="http://www.example.com" target="_blank">Link</a>';

// Concatenating Strings 
const myStr = "I come first. " + "I come second."; 
let myStr = "This is the first sentence. "
myStr += "This is the second sentence.";

const myName = "David";
const myStr = "My name is " + myName + " and I am well!";

const someAdjective = "worthwhile";
let myStr = "Learning to code is ";
myStr += someAdjective;

// Find the Length of a String
let lastNameLength = 0;
const lastName = "Lovelace";

lastNameLength = lastName.length;

// Use bracket notation to find the first to Nth character 
let firstLetterOfLastName = "";
const lastName = "Lovelace";

firstLetterOfLastName = lastName[0];
const thirdLetterOfLastName = lastName[2];  
const lastLetterOfLastName = lastName[lastName.length - 1]; 
const secondToLastLetterOfLastName = lastName[lastName.length -2]; 

const myNoun = "dog";
const myAdjective = "big";
const myVerb = "ran";
const myAdverb = "quickly";

const wordBlanks = "The " + myAdjective + " " + myNoun + " " + myVerb + " " + myAdverb + ".";; // The big dog ran quickly

// function that convert number to strings
var countBits = function(number) {
  var string = number.toString(2);
  return string.split('').reduce((numBits, char) => {
    return char === '1' ? numBits + 1 : numBits;
  }, 0);
};

var conversion = function(number1, number2) {
  return countBits(number1 ^ number2);
};

console.log(conversion(29, 15), 2);

// global variables
let myGlobal = 10;

function fun1() {
  oopsGlobal = 5;
}

function fun2() {
  var output = "";
  if (typeof myGlobal != "undefined") {
    output += "myGlobal: " + myGlobal;
  }
  if (typeof oopsGlobal != "undefined") {
    output += " oopsGlobal: " + oopsGlobal;
  }
  console.log(output);
}
// local variables
function myLocalScope() {
  var myVar = 5;
  console.log(myVar);
}
myLocalScope();

console.log(myVar);

/* It is possible to have both local and global variables with the same name. When you do this, the local variable takes precedence over the global variable.*/
var outerWear = "T-Shirt";

function myOutfit() {
  var outerWear = "sweater";

  return outerWear;
}

console.log(myOutfit());
console.log(outerWear);
