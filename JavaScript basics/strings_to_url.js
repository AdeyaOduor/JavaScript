// Functional Programming to Convert Strings to URL Slugs
function urlSlug(title) {
  return title
    .split(" ") // Split the title into an array of words
    .filter(substr => substr !== "") // Remove any empty strings from the array
    .join("-") // Join the words with hyphens
    .toLowerCase(); // Convert the entire string to lowercase
}

console.log(urlSlug("A Mind Needs Books Like A Sword Needs A Whetstone")); // a-mind-needs-books-like-a-sword-needs-a-whetstone
