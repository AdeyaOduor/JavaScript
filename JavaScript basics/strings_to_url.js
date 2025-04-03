/*
The urlSlug function converts a given string (typically a title) into a URL-friendly format, commonly referred to as a "slug."
This transformation is essential for creating clean, readable URLs in web applications.*/
function urlSlug(title) {
  return title
    .split(" ") // Split the title into an array of words
    .filter(substr => substr !== "") // Remove any empty strings from the array
    .join("-") // Join the words with hyphens
    .toLowerCase(); // Convert the entire string to lowercase
}

const title = "How to Make Perfect Pancakes!";
const slug = urlSlug(title);
console.log(slug);
const titleWithSpaces = "   Learn JavaScript   Basics   ";
const slugWithSpaces = urlSlug(titleWithSpaces);
console.log(slugWithSpaces);
console.log(urlSlug("A Mind Needs Books Like A Sword Needs A Whetstone")); // a-mind-needs-books-like-a-sword-needs-a-whetstone
