function convertQueryToMap(query) {
  return query.split("&").reduce((map, params) => {
    var [props, value] = params.split("=");

    if (!value) return map;

    var propsArr = props.split(".");
    var lastProp = propsArr.pop();
    var deepestObject = propsArr.reduce((obj, key) => {
      if (!obj[key]) {
        obj[key] = {};
      }
      return obj[key];
    }, map);

    deepestObject[lastProp] = decodeURIComponent(value);

    return map;
  }, {});
}

var query = "user.name.firstname=John&user.name.lastname=Doe&user.age=30&language=JavaScript";
console.log(convertQueryToMap(query));

/* Output
{
  user: { name: { firstname: 'John', lastname: 'Doe' }, age: '30' },
  language: 'JavaScript'
}


Here are some real-world use cases where this function could be applied:

    Web Application or API Endpoint: When a user interacts with a web application or makes a request to an API endpoint, 
    the application may need to extract and process the parameters passed in the URL query string. The convertQueryToMap function 
    can be used to efficiently convert the query string into a JavaScript object, making it easier to work with the data.

    Form Handling and Submission: In a web application, when a user submits a form, the form data is typically included in the URL 
    query string. The convertQueryToMap function can be used to parse and convert the form data into a structured JavaScript object, 
    which can then be processed on the server-side or used for further client-side logic.

    URL Sharing and Bookmarking: When users share a URL or bookmark a page, the URL may contain query parameters that carry additional 
    information, such as filters, search terms, or user preferences. The convertQueryToMap function can be used to extract and store this 
    information, allowing the application to restore the user's previous state when the URL is accessed.

    Search Engine Optimization (SEO): In the context of SEO, query strings are sometimes used to represent different versions of a page, 
    such as pagination or sorting options. The convertQueryToMap function can be used to extract and analyze these parameters, helping developers 
    understand how users interact with the application and optimize the content accordingly.

    Client-Side Routing and State Management: In single-page applications (SPAs) that use client-side routing, the URL query string can be used to 
    store and manage the application's state. The convertQueryToMap function can be used to parse the query string and update the application's state 
    accordingly, ensuring a smooth and consistent user experience.

    Analytics and Tracking: When users interact with a web application, the application may capture information about their actions in the URL query 
    string, such as the source of the visit, campaign details, or user segments. The convertQueryToMap function can be used to extract and analyze 
    this data for various purposes, such as marketing, user behavior analysis, or performance optimization.
*/

// In web application

// Function to convert query string to map
function convertQueryToMap(query) {
  return query.split("&").reduce((map, params) => {
    var [props, value] = params.split("=");

    if (!value) return map;

    var propsArr = props.split(".");
    var lastProp = propsArr.pop();
    var deepestObject = propsArr.reduce((obj, key) => {
      if (!obj[key]) {
        obj[key] = {};
      }
      return obj[key];
    }, map);

    deepestObject[lastProp] = decodeURIComponent(value);

    return map;
  }, {});
}

// Example usage
const currentURL = window.location.href;
const queryString = currentURL.split("?")[1];
const queryMap = convertQueryToMap(queryString);

console.log(queryMap); // Output: { category: "electronics", brand: "apple", sortBy: "price", page: "2" }

/*
In this example, we first define the convertQueryToMap function, which takes a query string as input and returns a 
JavaScript object with the key-value pairs extracted from the query.

Then, we get the current URL of the web application, extract the query string portion, and pass it to the convertQueryToMap 
function. The resulting queryMap object contains the parsed parameters, making it easy to access and use them in the application's logic.

For instance, you could use the queryMap object to:

    Filter Products: Retrieve the category and brand values from the queryMap and use them to filter the available products in the application.

    Sort Products: Get the sortBy value from the queryMap and apply the corresponding sorting logic to the product list.

    Handle Pagination: Use the page value from the queryMap to determine which page of the product list to display.

    Update the UI: Reflect the current filter and sorting options in the user interface, based on the values in the queryMap.

    Preserve User Preferences: When the user navigates to a different page, you can update the URL with the current filter and sorting options, 
    preserving the user's preferences.
*/

// Express.js API endpoint
app.get('/artists', (req, res) => {
  // Convert the query string to a map
  const queryMap = convertQueryToMap(req.query);

  // Extract the query parameters
  const { genre, sortBy, page = 1, limit = 10 } = queryMap;

  // Fetch the artists from the database
  const artists = fetchArtists({
    genre,
    sortBy,
    page,
    limit
  });

  // Return the artists as a JSON response
  res.json(artists);
});

// Function to convert query string to map
function convertQueryToMap(query) {
  return query.split("&").reduce((map, params) => {
    var [props, value] = params.split("=");

    if (!value) return map;

    var propsArr = props.split(".");
    var lastProp = propsArr.pop();
    var deepestObject = propsArr.reduce((obj, key) => {
      if (!obj[key]) {
        obj[key] = {};
      }
      return obj[key];
    }, map);

    deepestObject[lastProp] = decodeURIComponent(value);

    return map;
  }, {});
}

// Hypothetical function to fetch artists from the database
function fetchArtists({ genre, sortBy, page, limit }) {
  // Implement the logic to fetch artists based on the provided parameters. This could involve querying a database or some other data source
  return [
    { id: 1, name: 'Artist 1', genre: 'rock' },
    { id: 2, name: 'Artist 2', genre: 'pop' },
    // ... more artists
  ];
}

/*
In this example, we've defined an Express.js API endpoint for /artists. When a client makes a request to this endpoint, the server-side code first 
uses the convertQueryToMap function to convert the query string into a JavaScript object.

The extracted query parameters, such as genre, sortBy, page, and limit, are then used to fetch the relevant artists from the database (or some other 
data source) using the fetchArtists function.

Finally, the API endpoint returns the artists as a JSON response.

By using the convertQueryToMap function, the API implementation becomes more flexible and maintainable. If the client wants to add or modify the query 
parameters, the API can easily accommodate those changes without requiring extensive modifications to the endpoint code.*/
