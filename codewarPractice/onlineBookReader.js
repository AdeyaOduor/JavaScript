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
  this.currentBook = this.books[bookname]; // Sets the currentBook to the specified book
  return this.currentBook.file; // Returns the file associated with the current book
};

var Book = function(name, file) {
  this.name = name; // The name of the book
  this.file = file; // The content of the book, possibly as a string or file path
};

// Create an instance of BookReader
let myBookReader = new BookReader();

// Create some books
let book1 = new Book('JavaScript Basics', 'Content of JavaScript Basics...');
let book2 = new Book('Advanced JavaScript', 'Content of Advanced JavaScript...');

// Add books to the reader
myBookReader.add(book1);
myBookReader.add(book2);

// Find and open a book
let content = myBookReader.open('JavaScript Basics');
console.log(content); // Output: Content of JavaScript Basics...

// Find a specific book
let foundBook = myBookReader.find('Advanced JavaScript');
console.log(foundBook); // Output: Book object for 'Advanced JavaScript'

/*
Real-World Application

This implementation of a BookReader can be used in various applications, particularly in digital reading platforms or e-book management systems. 
Here are some examples of how it might be applied:

    E-Book Readers:
        A digital platform where users can upload, store, and read e-books. Users can add books to their library, find specific titles, and open 
        them for reading.

    Library Management Systems:
        In a library application, the BookReader could be enhanced to manage a collection of books, allowing users to borrow, return, and read books 
        digitally.

    Content Management Systems:
        The structure can be integrated into a CMS where articles or documents can be treated like books, allowing for similar functionalities to 
        organize and open documents.
*/
