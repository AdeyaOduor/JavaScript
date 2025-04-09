/*
How to get the current date and time using JavaScript. 
It formats the output to indicate the day of the week and the current time in a user-friendly manner. */

const today = new Date(); // Get the current date and time
const day = today.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
console.log(`Today is : ${daylist[day]}.`); // Output the day of the week

let hour = today.getHours(); // Get the hour (0-23)
const minute = today.getMinutes(); // Get the minutes (0-59)
const second = today.getSeconds(); // Get the seconds (0-59)
let prepand = (hour >= 12) ? " PM " : " AM "; // Determine AM or PM
hour = (hour >= 12) ? hour - 12 : hour; // Convert to 12-hour format

// Handle special cases for noon and midnight
if (hour === 0 && prepand === ' PM ') { 
  if (minute === 0 && second === 0) { 
    hour = 12;
    prepand = ' Noon';
  } else { 
    hour = 12;
    prepand = ' PM';
  } 
} 
if (hour === 0 && prepand === ' AM ') { 
  if (minute === 0 && second === 0) { 
    hour = 12;
    prepand = ' Midnight';
  } else { 
    hour = 12;
    prepand = ' AM';
  } 
}

console.log(`Current Time : ${hour}${prepand} : ${minute} : ${second}`); // Output the time
