function generateURL(baseUrl, queryParams) {
  let url = baseUrl;

  // Append query parameters to the URL
  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    url += `?${queryString}`;
  }

  return url;
}

// Example usage
const baseUrl = 'https://example.com/api';
const queryParams = {
  search: 'apple',
  category: 'fruits',
  page: 1
};

const url = generateURL(baseUrl, queryParams);
console.log(url); //Output https://example.com/api?search=apple&category=fruits&page=1

/* In this example, the generateURL function takes in two parameters: baseUrl (the base URL of the API or website) and queryParams 
(an object containing the query parameters and their values).

 The function constructs the URL by appending the query parameters to the base URL. It first checks if there are any query parameters 
 by verifying if the queryParams object is not empty. Then, it iterates over the key-value pairs of the queryParams object, URL-encoding 
 both the keys and values. It joins the encoded key-value pairs with ampersands (&) to create the query string.

 The resulting URL is returned by the function.

 In the example usage, we provide a sample base URL (https://example.com/api) and an object with query parameters (queryParams). We then call 
 the generateURL function with these parameters and store the generated URL in the url variable. Finally, we log the URL to the console.

 When you run this code, it will dynamically generate the URL by combining the base URL with the query parameters and display the resulting URL 
 in the console. You can modify the baseUrl and queryParams variables to match your specific use case.*/

const baseUrl = 'https://example.com/products';
const queryParams = {
  category: 'electronics',
  brand: 'apple',
  sortBy: 'price',
  page: 2
};

const url = generateURL(baseUrl, queryParams);
// URL: https://example.com/products?category=electronics&brand=apple&sortBy=price&page=2
