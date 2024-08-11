{
  'use strict';
  class BooksList {
    constructor() {
      this.initData();
      this.getElements();
      this.renderBooks();
      this.initActions();
    }
  
    initData() {
      this.data = dataSource.books;
    }
  
    getElements() {
      this.template = document.getElementById('template-book').innerHTML;
      this.booksList = document.querySelector('.books-list');
      this.filterForm = document.querySelector('.filters');
      this.favoriteBooks = [];
      this.filters = [];
    }
  
    renderBooks() {
      for (let book of this.data) {
        const ratingBgc = this.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
  
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;
  
        const generatedHTML = Handlebars.compile(this.template)(book);
        const element = this.createDOMFromHTML(generatedHTML);
        this.booksList.appendChild(element);
      }
    }
  
    createDOMFromHTML(htmlString) {
      const div = document.createElement('div');
      div.innerHTML = htmlString.trim();
      return div.firstChild;
    }
  
    initActions() {
      this.booksList.addEventListener('dblclick', (event) => {
        event.preventDefault();
  
        const clickedElement = event.target.offsetParent;
  
        if (clickedElement && clickedElement.classList.contains('book__image')) {
          const bookId = clickedElement.getAttribute('data-id');
  
          if (!this.favoriteBooks.includes(bookId)) {
            clickedElement.classList.add('favorite');
            this.favoriteBooks.push(bookId);
          } else {
            clickedElement.classList.remove('favorite');
            const index = this.favoriteBooks.indexOf(bookId);
            if (index > -1) {
              this.favoriteBooks.splice(index, 1);
            }
          }
        }
      });
  
      this.filterForm.addEventListener('click', (event) => {
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
          const filterValue = event.target.value;
  
          if (event.target.checked) {
            this.filters.push(filterValue);
          } else {
            const index = this.filters.indexOf(filterValue);
            if (index > -1) {
              this.filters.splice(index, 1);
            }
          }
  
          this.filterBooks();
        }
      });
    }
  
    filterBooks() {
      for (let book of this.data) {
        let shouldBeHidden = false;
  
        for (const filter of this.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
  
        const bookElement = this.booksList.querySelector(`.book__image[data-id="${book.id}"]`);
        if (shouldBeHidden) {
          bookElement.classList.add('hidden');
        } else {
          bookElement.classList.remove('hidden');
        }
      }
    }
  
    determineRatingBgc(rating) {
      let background = '';
  
      if (rating < 6) {
        background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
  
      return background;
    }
  }
  
  const app = new BooksList();
    
  console.log(app);
}