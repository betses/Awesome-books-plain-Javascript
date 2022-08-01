const collections = JSON.parse(localStorage.getItem('collections')) || [];
const bookContainer = document.querySelector('.book-container');
const AddBookForm = document.querySelector('.book-form');

const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');

function render() {
  let collections;
  if (localStorage.getItem('collections') === null) {
    collections = [];
  } else {
    collections = JSON.parse(localStorage.getItem('collections'));
  }
  bookContainer.innerHTML = '';
  collections.forEach((book, index) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button data-remove=${index} class='delete'>Remove</button>
        <hr>
      `;
    bookContainer.appendChild(bookElement);

    const deleteButton = bookElement.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
      // eslint-disable-next-line no-use-before-define
      removeBook(index);
    });
  });
}

function removeBook(index) {
  collections.splice(index, 1);
  localStorage.setItem('collections', JSON.stringify(collections));
  render();
}