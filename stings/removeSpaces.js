// remove the spaces from the string, then return the resultant string.

function noSpace(x){
  return x.split(' ').join('');
}

// Example 1: User Profile Data Cleanup
const userProfile = {
    fullName: "John   Doe",
    email: "john.doe@example.com"
};

userProfile.fullName = noSpace(userProfile.fullName);
console.log(userProfile.fullName); // Output: "JohnDoe"

// Example 2: Formatting Phone Numbers
const phoneNumber = "123 456 7890";
const formattedNumber = noSpace(phoneNumber);
console.log(formattedNumber); // Output: "1234567890"

// Example 3: Data Cleaning for CSV Files
const rawData = "name, age, country";
const cleanedData = noSpace(rawData);
console.log(cleanedData); // Output: "name,age,country"
