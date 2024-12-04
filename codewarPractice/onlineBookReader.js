// a constructor that initializes an instance of a book reader.
let BookReader = function() {
  this.currentBook = null; // Keeps track of the currently opened book
  this.books = {}; // An object to store all added books, indexed by their names
};
// add method takes a book object as an argument and adds it to the books collection. 
// The book is stored using its name as the key, allowing for efficient lookups.
BookReader.prototype.add = function(book) {
  this.books[book.name] = book; // Adds a book to the books collection
};
// find method allows users to retrieve a book by its name.
BookReader.prototype.find = function(bookname) {
  return this.books[bookname]; // Returns the book object if found, otherwise undefined
};

BookReader.prototype.open = function(bookname) {
  this.currentBook = this.books[bookname];
  return this.currentBook.file;
};

var Book = function(name, file) {
  this.name = name;
  this.file = file;
};
