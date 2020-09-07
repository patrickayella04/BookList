// Book Constructor - will handle creating actual book object
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor - will be a set of prototype methods ie. add book to list, delete book, show the alert. Things that have to do with the UI. 
function UI() { } // UI constructor is simple because we are not passing anything in, it will just be an empty function. Everything esle will go inside the prototype. 

// Add Book To List
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr'); // We will now take this tr and append html into it which will be the actual collums in the td's(table data).
    // Insert Cols - we are able to get book because we passed the book in to the prototype method
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td> 
    <td>${book.isbn}</td> 
    <td><a href="#" class="delete">X</a></td>  
    `;
    // The input wont appear, befor we append it all to the list. 
    
    list.appendChild(row)
}

// Clear Fields

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
   // Get Form Values - When we submit, first we want is to get the fields with the information being submitted. So we create variables for the input VALUES for each input. 
    const title = document.getElementById('title').value, 
        author = document.getElementById('author').value, 
        isbn = document.getElementById('isbn').value
    
    // once we submit these values we want to instansiate the Book() constructor above. Here below we are Instantiating a book. Instead of console.loging the values, we put them into a object with index and values which is the book object which is an instance of the Book constructor.
    const book = new Book(title, author, isbn);

    // Instantiate UI object
    const ui = new UI();

    // Add book to list - now we add a prototype under the (function UI()) above. 
    ui.addBookToList(book);

    // Clear Fields - call clear function right after we add the books. Once input is submitted, the input field is automatically cleard and input loaded in Book list. 

    ui.clearFields()

   
    
    
    

    e.preventDefault();
});

// We will now want to add a book to the Table on the UI, and the UI object is going to take care of that for us. 