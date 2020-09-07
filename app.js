// Book Constructor - will handle creating actual book object
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor - will be a set of prototype methods ie. add book to list, delete book, show the alert. Things that have to do with the UI. 
function UI() { } // UI constructor is simple because we are not passing anything in, it will just be an empty function. Everything esle will go inside the prototype. 

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
   // Get Form Values - When we submit, first we want is to get the fields with the information being submitted. So we create variables for the input VALUES for each input. 
    const title = document.getElementById('title').value, 
        author = document.getElementById('author').value, 
        isbn = document.getElementById('isbn').value
    
    // once we submit these values we want to instansiate the Book() constructor above. Here below we are Instantiating a book. Instead of console.loging the values, we put them into a object with index and values which is the book object which is an instance of the Book constructor.
    const book = new Book(title, author, isbn);

    console.log(book);
    
    
    

    e.preventDefault();
});