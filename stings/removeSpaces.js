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
