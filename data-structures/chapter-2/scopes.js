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
