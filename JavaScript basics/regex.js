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
