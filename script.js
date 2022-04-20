class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

let booksList = JSON.parse(localStorage.getItem('book'));

const books = document.querySelector('.books');

// function to get books from localStorage
const getBooks = () => {
  const storageData = localStorage.getItem('books');
  if (storageData === undefined || storageData === null) {
    return;
  }
  const storageBooks = JSON.parse(storageData);
  booksList = storageBooks;
  books.innerHTML = storageBooks
    .map(
      (book, index) => `<div class=" row ${index % 2 === 0 ? 'row-bg' : ''}">
                    <div>
                      "${book.title}" by ${book.author}
                      <button type="button" onclick='removeBook(${book.id})'>Remove</button>
                    </div>
                </div>`,
    )
    .join('');
};

// functioon to remove book from bokks collections
const removeBook = (id) => {
  if (id === null) return;
  const newBooks = booksList.filter((book) => book.id !== id);
  localStorage.setItem('books', JSON.stringify(newBooks));
  getBooks();
};

// function to add book from books collection
const booksForm = document.querySelector('.new-book-form');
booksForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = Math.floor(Math.random() * 10000); // Asign random Id for each
  const item = new Book(id, title, author); // Add book for the class Book
  booksList = [...booksList, item];
  localStorage.setItem('books', JSON.stringify(booksList)); // Add the new bookList to the local storage
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  getBooks();
});

window.addEventListener('load', () => {
  getBooks();
  removeBook(null);
});
