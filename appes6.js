// Converstion of ES5 application to ES6 classes!

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    // all our methods in UI class - The methods should work the same so we add the content from the app.js file. 


    addBookToList(book) {
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

    showAlert(message, className) {
        // Create div
    const div = document.createElement('div');
    // Add classes - we also add class which is passed in ie. className.
    div.className = `alert ${className}`;
    // Add text 
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');

    container.insertBefore(div, form); // div what we want to insert, form what comes befor. 


    // Timeout after 3 sec
    setTimeout(function () {
        document.querySelector('.alert').remove()
    }, 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove() // ParentElement Twice -  we want to delete the parent of the parent of the delete <a> tag. (Basic DOM traversing)
        };
    }

    clearFields() {
        document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    }
}

///////////////////////////////////

// Static Local Storage class

class Store {
    static getBooks() { // fetches book(what ever is in local storage) from local storage - for rest of methods below
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books')); // we parse it because we need books to be a javascript object. 
        }

        return books;
    }

    static displayBooks() { // take care of displaying stored books in UI
        const books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) { // add books to local storage
        const books = Store.getBooks()

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));


    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));

    }
};
///////////////////////////////////

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks); // Books are still there on page reload because they were persisted to local storage. 

///////////////////////////////////

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get Form Values - When we submit, first we want is to get the fields with the information being submitted. So we create variables for the input VALUES for each input. 
     const title = document.getElementById('title').value, 
         author = document.getElementById('author').value, 
         isbn = document.getElementById('isbn').value
     
     // once we submit these values we want to instansiate the Book() constructor above. Here below we are Instantiating a book. Instead of console.loging the values, we put them into a object with index and values which is the book object which is an instance of the Book constructor.
     const book = new Book(title, author, isbn);
 
     // Instantiate UI object
     const ui = new UI();
 
     console.log(ui) // You see all prototypes, parts of the UI prototypes
 
     // Validate
     if (title === '' || author === '' || isbn === '') {
         // Error alert
         ui.showAlert('Please fill in all fields', 'error')
     } else {
         // Add book to list - now we add a prototype under the (function UI()) above. 
         ui.addBookToList(book);

         // add to local storage - no need to instantiate it as its a static method
         Store.addBook(book);

         
     // Show success
         ui.showAlert('Book Added!', 'success')
 
     // Clear Fields - call clear function right after we add the books. Once input is submitted, the input field is automatically cleard and input loaded in Book list. 
 
     ui.clearFields()
     }
 
     
     e.preventDefault();
 });
 
 // We will now want to add a book to the Table on the UI, and the UI object is going to take care of that for us. 
 
 
 // Event Delegation - if we have something thats going to show up more than once with the same class, or something thats not there when the page loads or is dynamically added we use event delegation. -->
 // Event Listener for delete
 document.getElementById('book-list').addEventListener('click', function (e) {
     // Instantiate UI object
     const ui = new UI();
 
     // Delet book
     ui.deleteBook(e.target);

     // Remove from Local Storage
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
 
     // Show message
     ui.showAlert('Book Removed!', 'success');
 
 
 
     // console.log(123) // if we click anywhere in the book-list table body it logs, but what we need to do is target the delete class which is dynamically inserted. Will do this within a prototype method of the UI
     e.preventDefault();
 }) // we use the parent class not the delete class. 
 

