const form = document.querySelector('#form');
const bookTitle = document.querySelector('input[type="title"]');
const bookAuthor = document.querySelector('input[type="author"]');
const bookpages = document.querySelector('input[type="pages"]');
const books = document.querySelector('#books');
const onerror = document.querySelector('.error');
// book class
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// check if data alread in storage, else make a new one
const checkStorage = (data) => {
  if (localStorage.getItem(data)) {
    return localStorage.getItem(data);
  }
  return localStorage.setItem('libary', JSON.stringify([]));
};

// validates user input to make sure pages is an integer
// and at least title or author name is provided
const validation = (number, name, title) => {
  const re = /^[0-9]*$/gm;
  if (re.test(number) === true && name !== '' && title !== '') {
    return true;
  }
  return false;
};

// dtee book

// function is parsed into html through a string to to delete books
// eslint-disable-next-line no-unused-vars
const deleteBook = (book) => {
  if (book >= 0) {
    let libary = checkStorage('libary');
    libary = JSON.parse([libary]);
    libary.splice(book, 1);
    localStorage.setItem('libary', JSON.stringify(libary));
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
};

// show opeion base on read or unread
const showOptions = (val) => {
  if (val === true) {
    return 'Read';
  }
  return 'Unread';
};

// display data to ui
const showBooks = () => {
  let libary = checkStorage('libary');
  libary = JSON.parse(libary);

  if (libary.length < 1) {
    const para = document.createElement('div');
    para.innerHTML = '<h2 class= "text-center"> No Books yet. add a book </h2>';
    books.appendChild(para);
  } else {
    for (let i = 0; i < libary.length; i += 1) {
      const para = document.createElement('div');
      const card = ` <div class="card border-primary mb-3">
      <div class="card-header d-flex  justify-content-between"> 
      <div >Author: ${libary[i].author}  </div>
      <div> ${showOptions(libary[i].isRead)} 

      <button
      onclick="markRead(${i})"
      type="button"
      class="btn btn-outline-secondary"
      data-bs-dismiss="modal"
      aria-label="Close">mark </button>

      <button
      onclick="deleteBook(${i})"
      type="button"
      class="btn btn-outline-danger ">delete </button>
      </div>
      </div>
      <div class="card-body text-primary d-flex justify-content-between">
        <h5 class="card-title">Title: ${libary[i].title}  </h5>
        <h5 class="card-title">Pages: ${libary[i].pages} </h5>
      </div>
      </div>`;
      para.innerHTML = card;
      books.appendChild(para);
    }
  }
};

// add eventlistener to form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validation(bookpages.value, bookAuthor.value, bookTitle.value) === true) {
    const book = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookpages.value,
      // eslint-disable-next-line no-undef
      (isRead = false),
    );
    let libary = checkStorage('libary');
    libary = JSON.parse([libary]);
    libary.push(book);
    localStorage.setItem('libary', JSON.stringify(libary));
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  } else {
    onerror.innerText = 'All fields are required';
  }
});

// mark a book as read
// eslint-disable-next-line no-unused-vars
const markRead = (index) => {
  let libary = checkStorage('libary');
  libary = JSON.parse(libary);
  if (libary[index].isRead === false) {
    libary[index].isRead = true;
  } else {
    libary[index].isRead = false;
  }
  localStorage.setItem('libary', JSON.stringify(libary));
  // eslint-disable-next-line no-restricted-globals
  location.reload();
};

window.onload = () => {
  showBooks();
};
