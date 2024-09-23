/* 
The toCamelCase function converts strings from kebab-case or snake_case to camelCase. 

Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first 
  word within the output should be capitalized only if the original word was capitalized. */ 

  function toCamelCase(str){
    var regExp=/[-_]\w/ig;
    return str.replace(regExp,function(match){
          return match.charAt(1).toUpperCase();
     });
}

// Example, API Response Formatting:
  const apiResponse = {
    user_id: 123,
    user_name: "John Doe",
    account_status: "active"
};

const formattedResponse = {
    userId: apiResponse.user_id,
    userName: apiResponse.user_name,
    accountStatus: apiResponse.account_status
};

console.log(formattedResponse); // Output: { userId: 123, userName: "John Doe", accountStatus: "active" }
