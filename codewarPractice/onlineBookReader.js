// a constructor that initializes an instance of a book reader.
let BookReader = function() {
  this.currentBook = null; // Keeps track of the currently opened book
  this.books = {}; // An object to store all added books, indexed by their names
};



BookReader.prototype.add = function(book) {
  this.books[book.name] = book;
};

BookReader.prototype.find = function(bookname) {
  return this.books[bookname];
};

BookReader.prototype.open = function(bookname) {
  this.currentBook = this.books[bookname];
  return this.currentBook.file;
};

var Book = function(name, file) {
  this.name = name;
  this.file = file;
};
