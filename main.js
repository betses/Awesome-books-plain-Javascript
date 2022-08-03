// eslint-disable-next-line max-classes-per-file
const bookContainer = document.querySelector('.book-container');
const AddBookForm = document.querySelector('.book-form');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const error = document.querySelector('.error');
const viewBook = document.getElementById('books-section');
const addBook = document.getElementById('add-section');
const contact = document.getElementById('contact-section');
const list = document.getElementById('list');
const addButton = document.getElementById('add-new');
const contactButton = document.getElementById('contact');
const formAdd = document.querySelector('.form-add');
const isClicked = false;

document.addEventListener('DOMContentLoaded', () => {
  viewBook.style.display = 'none';
  addBook.style.display = 'block';
  contact.style.display = 'none';
});

list.addEventListener('click', () => {
  if (isClicked === false) {
    viewBook.style.display = 'block';
    addBook.style.display = 'none';
    contact.style.display = 'none';
  }
});

addButton.addEventListener('click', () => {
  if (isClicked === false) {
    viewBook.style.display = 'none';
    addBook.style.display = 'block';
    contact.style.display = 'none';
  }
});

contactButton.addEventListener('click', () => {
  if (isClicked === false) {
    viewBook.style.display = 'none';
    addBook.style.display = 'none';
    contact.style.display = 'block';
  }
});

class Collections {
  constructor() {
    this.collections = JSON.parse(localStorage.getItem('collections')) || [];
  }

  addBook(book) {
    this.collections.push(book);
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }

  removeBook(index) {
    this.collections.splice(this.collections[index], 1);
  }

  getBooks() {
    const reversed = [];
    for (let i = this.collections.length - 1; i >= 0; i -= 1) {
      reversed.push(this.collections[i]);
    }
    return reversed;
  }
}

const collections = new Collections();

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.timeStamp = Book.timeStamp();
  }

  addBook() {
    collections.addBook(this);
    this.render();
  }

  static timeStamp() {
    const date = new Date();
    return date.getMinutes();
  }

  render() {
    bookContainer.innerHTML = '';
    if (collections.getBooks().length === 0) {
      bookContainer.innerHTML = '<p class="empty">No books in your collection</p>';
    }
    collections.getBooks().forEach((book, index) => {
      const bookElement = document.createElement('div');
      if (index % 2 === 0) {
        bookElement.classList.add('odd-book');
      } else {
        bookElement.classList.add('book');
      }
      function timeStamp() {
        let time = '';
        if (Book.timeStamp() - book.timeStamp < 1) {
          time = 'Just now';
        } else {
          time = `${Book.timeStamp() - book.timeStamp} minutes ago`;
        }
        return time;
      }
      bookElement.innerHTML = `
          <p>"${book.title}" by ${book.author}</p>
          <p class="timestamp">${timeStamp()}</p>
          <div class="remove-button">
            <button data-remove=${index} class='delete'>Remove</button>
          </div>
        `;
      bookContainer.appendChild(bookElement);

      const deleteButton = bookElement.querySelector('.delete');
      deleteButton.addEventListener('click', () => {
        this.removeBook(index);
      });
    });
  }

  removeBook(index) {
    collections.removeBook(index);
    localStorage.setItem('collections', JSON.stringify(collections.getBooks()));
    this.render();
  }
}

const books = new Book();

AddBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  if (title === '' || author === '') {
    error.innerHTML = 'Please fill in all fields';
    setTimeout(() => {
      error.innerHTML = '';
    }, 5000);
  } else {
    const books = new Book(title, author);
    books.addBook();
    formAdd.innerHTML = `"${title}" was added to your collection`;
    formAdd.style.animation = 'fadeIn 2s ease-in-out';
    setTimeout(() => {
      formAdd.style.animation = 'fadeOut 2s ease-in-out';
    }, 5000);
    setTimeout(() => {
      formAdd.innerHTML = '';
    }, 9000);
    bookTitle.value = '';
    bookTitle.focus();
    bookAuthor.value = '';
    error.innerHTML = '';
  }
});
window.onload = books.render();