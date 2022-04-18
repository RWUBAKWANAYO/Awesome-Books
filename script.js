let booksList = [];

const books = document.querySelector('.books');
const getBooks = () => {
  const storageData = localStorage.getItem('books');
  // console.log(storageData);
  if (storageData === undefined || storageData === null) {
    return;
  }
  const storageBooks = JSON.parse(storageData);
  booksList = storageBooks;
  books.innerHTML = storageBooks.map((book) => `<div>
                  <h4>${book.title}</h4>
                  <h4>${book.author}</h4>
                  <button type="button" onclick='removeBook(${book.id})' >Remove</button>
                  <hr />
              </div>`).join('');
};

const removeBook = (id) => {
  if (id === null) return;
  const newBooks = booksList.filter((book) => book.id !== id);
  localStorage.setItem('books', JSON.stringify(newBooks));
  getBooks();
};
removeBook(null);

window.addEventListener('load', getBooks);
const booksForm = document.querySelector('.new-book-form');
booksForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = Math.floor(Math.random() * 1000);
  const newBook = { id, title, author };
  booksList = [...booksList, newBook];
  localStorage.setItem('books', JSON.stringify(booksList));
  getBooks();
});