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

// Example, Database Field Mapping
function mapFields(dbRecord) {
    return {
        userId: dbRecord.user_id,
        createdAt: dbRecord.created_at,
        updatedAt: dbRecord.updated_at
    };
}

const dbRecord = { user_id: 1, created_at: "2023-01-01", updated_at: "2023-01-02" };
const mappedRecord = mapFields(dbRecord);
console.log(mappedRecord); // Output: { userId: 1, createdAt: "2023-01-01", updatedAt: "2023-01-02" }

// Example, Configuration File Parsing
function parseConfig(config) {
    return {
        apiKey: config.api_key,
        dbUrl: config.db_url
    };
}

const config = { api_key: "12345", db_url: "localhost:27017" };
const parsedConfig = parseConfig(config);
console.log(parsedConfig); // Output: { apiKey: "12345", dbUrl: "localhost:27017" }
