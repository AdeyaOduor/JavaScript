// Functional Programming to Convert Strings to URL Slugs
function urlSlug(title) {
  return title
    .split(" ")
    .filter(substr => substr !== "")
    .join("-")
    .toLowerCase();
}

console.log(urlSlug("A Mind Needs Books Like A Sword Needs A Whetstone"));
