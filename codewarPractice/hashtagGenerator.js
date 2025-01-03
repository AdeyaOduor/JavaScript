function generateHashtag(str) {
  if (str.length == 0 || str.length > 140) return false; // Check if the string is empty or too long
  return '#' + str.split(' ') // Split the string into words
    .filter(function(x) { return x.length != 0; }) // Remove any empty words
    .map(function(x) { // Capitalize the first letter of each word
      return x[0].toUpperCase() + x.slice(1);
    })
    .join(''); // Join the words back together
}

const postContent = "hello world this is a test";
const hashtag = generateHashtag(postContent);

if (hashtag) {
  console.log("Generated Hashtag:", hashtag); // Output: Generated Hashtag: #HelloWorldThisIsATest
} else {
  console.log("Invalid input for hashtag generation.");
}

/*Real-World Application Scenario

Imagine a social media application like Twitter or Instagram:

    User Engagement: Users often want to tag their posts to join conversations or highlight topics. The generateHashtag function automates 
    this process by ensuring that hashtags are formatted correctly.
    Searchability: Hashtags make it easier for users to find content related to specific topics. For example, a post tagged with #Travel can 
    be easily searched by users interested in travel content.
*/
