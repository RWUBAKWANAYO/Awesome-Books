class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

let booksList = JSON.parse(localStorage.getItem('book')) || [];

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
    .map((book, index) => `
    <div class=" row ${index % 2 === 0 ? 'row-bg' : ''}">
                    <span>"${book.title}"by ${book.author}</span>
                    <button type="button" onclick='removeBook(${book.id})'>Remove</button>
                </div>`)
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

// handle menu

const nav = document.querySelector('.navigation');
const listGroup = document.querySelector('.right');
const openMenu = document.querySelector('#menuBarIcon');
const closeMenu = document.querySelector('#closeMenuIcon');

const handleClose = () => {
  nav.style.transform = '';
  listGroup.style.transform = '';
};

openMenu.addEventListener('click', () => {
  nav.style.transform = 'translateX(0%)';
  listGroup.style.transform = 'translateX(0%)';
});

closeMenu.addEventListener('click', () => {
  handleClose();
});

// navigation
const list = document.querySelector('#list');
const add = document.querySelector('#add');
const contact = document.querySelector('#contact');

// sections
const navLinks = document.querySelectorAll('.right-list');
const listSection = document.querySelector('#books-list');
const addBookSection = document.querySelector('#add-new');
const contactSection = document.querySelector('#contact-us');

navLinks.forEach((listEl) => listEl.addEventListener('click', handleClose));

list.addEventListener('click', () => {
  listSection.classList.remove('display');
  addBookSection.classList.add('display');
  contactSection.classList.add('display');
});
add.addEventListener('click', () => {
  listSection.classList.add('display');
  addBookSection.classList.remove('display');
  contactSection.classList.add('display');
});

contact.addEventListener('click', () => {
  listSection.classList.add('display');
  addBookSection.classList.add('display');
  contactSection.classList.remove('display');
});
const defaultDisplay = () => {
  listSection.classList.remove('display');
  addBookSection.classList.add('display');
  contactSection.classList.add('display');
};

// handle dates actions

const handleTime = () => {
  const dateContainer = document.querySelector('.date-container');
  const dateFunc = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const year = dateFunc.getFullYear();
  const month = months[dateFunc.getMonth()];
  let currentDate = dateFunc.getDate();
  const hour = dateFunc.getHours();
  const minutes = dateFunc.getMinutes();
  const second = dateFunc.getSeconds();
  if (currentDate === 1) currentDate = 'first';
  else if (currentDate === 2) currentDate = 'second';
  else if (currentDate === 3) currentDate = 'third';
  else currentDate += 'th';

  const time = (hour < 12) ? `${month} ${currentDate} ${year}, ${hour} ${minutes} ${second} AM`
    : `${month} ${currentDate} ${year}, ${hour} ${minutes} ${second} PM`;
  dateContainer.innerHTML = time;
};

window.addEventListener('load', () => {
  getBooks();
  handleTime();
  removeBook(null);
  defaultDisplay();
});