// 1. Extract the word 'coding' from a string
let extractStr = "Extract the word 'coding' from this string.";
let codingRegex = /coding/;
let codingResult = extractStr.match(codingRegex);
console.log(codingResult[0]);

// 2. Match 'twinkle' in a string (case insensitive)
let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /twinkle/gi;
let starResult = twinkleStar.match(starRegex);
console.log(starResult);

// 3. Match vowels in a quote sample
let quoteSample1 = "Beware of bugs in the above code; I have only proved it correct, not tried it.";
let vowelRegex = /[aeiou]/gi;
let vowelResult = quoteSample1.match(vowelRegex);
console.log(vowelResult);

// 4. Match all letters in a sentence
let quoteSample2 = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /[a-z]/gi;
let alphabetResult = quoteSample2.match(alphabetRegex);
console.log(alphabetResult);

// 5. Match specific range characters in a string
let quoteSample3 = "Blueberry 3.141592653s are delicious.";
let myRegex = /[h-s2-6]/gi; 
let rangeResult = quoteSample3.match(myRegex);
console.log(rangeResult); 

// 6. Match one or more 's' in "Mississippi"
let difficultSpelling = "Mississippi";
let sRegex = /s+/g; 
let sResult = difficultSpelling.match(sRegex);
console.log(sResult); 

// 7. Find consecutive 'a's in a string
let chewieQuote = "Aaaaaaaaaaaaaaaarrrgh!";
let chewieRegex = /Aa+/; 
let chewieResult = chewieQuote.match(chewieRegex);
console.log(chewieResult); 

// 8. Count alphanumeric characters in a string
let quoteSample4 = "The five boxing wizards jump quickly.";
let alphabetRegexV2 = /\w/g; 
let alphaCount = quoteSample4.match(alphabetRegexV2).length;
console.log(alphaCount); 

// 9. Count non-alphanumeric characters in a string
let quoteSample5 = "The five boxing wizards jump quickly.";
let nonAlphabetRegex = /\W/g; 
let nonAlphaCount = quoteSample5.match(nonAlphabetRegex).length;
console.log(nonAlphaCount);

// 10. Count digits in a movie name
let movieName = "2001: A Space Odyssey";
let numRegex = /\d/g; 
let numCount = movieName.match(numRegex).length;
console.log(numCount); 

// 11. Count non-digit characters in a movie name
let noNumRegex = /\D/g; 
let nonNumCount = movieName.match(noNumRegex).length;
console.log(nonNumCount);

// 12. Count whitespace in a sample string
let sample = "Whitespace is important in separating words";
let countWhiteSpace = /\s/g; 
let whiteSpaceResult = sample.match(countWhiteSpace);
console.log(whiteSpaceResult);
// ================================================================================================

// Apply the regex myRegex on the string myString using the .test() method.

let myString = "Hello, World!";
let myRegex = /Hello/;
let result = myRegex.test(myString); 
console.log(result); // true
// ---------------------------------------------------------------------------------

let waldoIsHiding = "Somewhere Waldo is hiding in this text.";
let waldoRegex = /Waldo/; // Change this line
let result = waldoRegex.test(waldoIsHiding);
console.log(result); // true
// ---------------------------------------------------------------------------------

let petString = "James has a pet cat.";
let petRegex = /dog|cat|bird|fish/; // Change this line
let result = petRegex.test(petString);
console.log(result); // true
// ---------------------------------------------------------------------------------

let myString = "freeCodeCamp";
let fccRegex = /freeCodeCamp/i;
let result = fccRegex.test(myString);
console.log(result); // true

let exampleStr = "Let's have fun with regular expressions!";
let unRegex = /.un/; // Change this line
let result = unRegex.test(exampleStr);
console.log(result); // true
// -------------------------------------------------------------------------------
// restrict-possible-usernames

let username = "JackOfAllTrades";
const userCheck = /^[a-z]([0-9]{2,}|[a-z]+\d*)$/i;
let result = userCheck.test(username);
console.log(result); // true
// --------------------------------------------------------------------------------
// positive-and-negative-lookahead
let sampleWord = "astronaut";
let pwRegex =  /(?=\w{6})(?=\w*\d{2})/;
let result = pwRegex.test(sampleWord);
console.log(result); // false
// ----------------------------------------------------------------------------------
/* function to check whether a given value is an valid url or not */
function is_url(str)
{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}

console.log(is_url("http://www.example.com")); // true
console.log(is_url("https://www.example.com")); // true
console.log(is_url("www.example.com")); // true
// -----------------------------------------------------------------------------------------------------------------------------
/*Return true if the string in the first element of the array contains all of the letters of the string in the 
second element of the array. */
function mutation([elem1, elem2]) {
  const regex = new RegExp(`[^${elem1}]`, 'i');
  return !regex.test(elem2);
}
console.log(mutation(["hello", "hey"])); // false
// ----------------------------------------------------------------------------------------------------------------------------
 // pattern that matches e-mail addresses.
function valid_email(str)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
if(mailformat.test(str))
{  
console.log("Valid email address!");  
}  
else  
{  
console.log("You have entered an invalid email address!");  
}
}

valid_email('me-info@example.com'); //Valid email address!
valid_email('me-info*example.com'); //You have entered an invalid email address!
// ---------------------------------------------------------------------------------------------------------------

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JavaScript function to check whether a given value is an valid email and password or not</title>
</head>
<body>

</body>
</html>


function is_email(str)
{
 // Scott Gonzalez: Email address validation
  
  regexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
  
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}

console.log(is_email("admin@example.com")); // true
console.log(is_email("mysite@.org.org ")); // false

function validate(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/.test(password);
}
