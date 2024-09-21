/* Given: an array containing hashes of names, return a string formatted as a list of names separated by 
commas except for the last two names, which should be separated by an ampersand. 

The list function is designed to format an array of names into a readable string, making it particularly 
useful in various real-world applications, such as displaying user lists, participant names, or any collection of entities. */

function list(names) {
    let len = names.length;
    if(len==0) return '';
    return names.slice(0, len-1).map(p=>p.name).join(", ") + (len>1 ? ' & ' : '') + names[len-1].name;
  }
// Example 1
const participants = [
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" }
];

const formattedParticipants = list(participants);
console.log(formattedParticipants); // Output: "Alice, Bob & Charlie"
