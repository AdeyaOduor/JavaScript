//JavaScript program where the program takes a random integer between 1 to 10, the user is then prompted to input a guess number. 
//If the user input matches with guess number, the program will display a message "Good Work" otherwise display a message "Not matched"

// Get a random integer from 1 to 10 inclusive
const num = Math.ceil(Math.random() * 10);
console.log(num);
 const gnum = prompt('Guess the number between 1 and 10 inclusive');
 if (gnum == num)
   console.log('Good Work');
  else
   console.log('Not matched, the number was '+gnum);
 
// Get a random integer from given ranges

rand = function(min, max) {
  if (min==null && max==null)
    return 0;    
  
  if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };
 console.log(rand(20,1));
 console.log(rand(1,10));
 console.log(rand(6));
 console.log(rand());
