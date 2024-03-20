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
