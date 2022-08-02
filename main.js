// const collections = JSON.parse(localStorage.getItem('collections')) || [];
const bookContainer = document.querySelector('.table');
const AddBookForm = document.querySelector('.book-form');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');

class ViewBook {
  constructor(book) {
    this.book = book;
  }

  static getBooks() {
    let collections;
    if (localStorage.getItem('collections') === null) {
      collections = [];
    } else {
      collections = JSON.parse(localStorage.getItem('collections'));
    }

    return collections;
  }

  addBook = () => {
    const myBooks = ViewBook.getBooks();
    myBooks.push(myBooks);
    localStorage.setItem('myBooks', JSON.stringify(myBooks));
    this.render();
  }

  render= () => {
    const myBooks = ViewBook.getBooks();
    bookContainer.innerHTML = '';
    myBooks.forEach((book, index) => {
      const bookElement = document.createElement('tr');
      bookElement.classList.add('book');
      bookElement.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td><button data-remove=${index} class='delete'>Remove</button></td>
        `;
      bookContainer.appendChild(bookElement);

      const deleteButton = bookElement.querySelector('.delete');
      deleteButton.addEventListener('click', () => {
        this.removeBook(index);
      });
    });
  }

   removeBook = (index) => {
     const myBooks = ViewBook.getBooks();
     myBooks.splice(index, 1);
     localStorage.setItem('collections', JSON.stringify(myBooks));
     this.render();
   }
}

const books = new ViewBook();

AddBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const book = {
    title: bookTitle.value,
    author: bookAuthor.value,
  };
  const books = new ViewBook(book);
  books.addBook();
  bookTitle.value = '';
  bookAuthor.value = '';
});
window.onload = books.render();