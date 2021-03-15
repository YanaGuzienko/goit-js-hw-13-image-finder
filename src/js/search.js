import settings from './config';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});
const { KEY } = settings;

export default class SearchImg {
  constructor() {
    this.searchQuery = '';

    this.page = 1;
  }

  fetchImgList() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(hits => {
        if (hits.total === 0) {
          error({
            text: 'Введите название',
          });
        }

        return hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}

///////////////////////////

// const refs = {
//   form: document.querySelector('#search-form'),
//   list: document.querySelector('.gallery'),
//   lastDiv: document.querySelector('.last-item'),
//   input: document.querySelector('input'),
// };
// refs.form.addEventListener('submit', onSearch);

// const searchImg = new SearchImg();

// function onSearch(e) {
//   e.preventDefault();
//   searchImg.searchQuery = e.currentTarget.elements.query.value;
//   const name = refs.input.value.trim();
//   if (name === '') {
//     return;
//   }
//   searchImg.resetPage();
//   searchImg
//     .fetchImgList()
//     .then(renderImg)
//     .catch(error => console.log(error));

//   console.log(refs.input.value);
//   console.log(searchImg.searchQuery);
//   // searchImg.resetPage();
// }

// function renderImg(hits) {
//   // refs.list.innerHTML = cardsList(hits);
//   if (hits === []) {
//     return
//   }
//   refs.list.innerHTML = '';
//   refs.list.insertAdjacentHTML('beforeend', cardsList(hits));
//   observer.observe(refs.lastDiv);
// }

// const observerHandler = entries => {
//   const { isIntersecting } = entries[0];
//   if (isIntersecting) {
//     console.log('vdbsj,CK');
//     // searchImg.incrementPage();
//     searchImg.fetchImgList().then(renderImg);
//   }
// };
// const observer = new IntersectionObserver(observerHandler);
// // observer.observe(refs.lastDiv);
