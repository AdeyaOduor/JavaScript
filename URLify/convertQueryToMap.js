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
