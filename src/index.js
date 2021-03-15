import './styles.css';
import cardsList from './templates/imgTmp.hbs';
import SearchImg from './js/search';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

defaultModules.set(PNotifyMobile, {});

const refs = {
  form: document.querySelector('#search-form'),
  list: document.querySelector('.gallery'),
  lastDiv: document.querySelector('.last-item'),
  input: document.querySelector('input'),
};

refs.list.addEventListener('click', openLargeImg);
refs.form.addEventListener('submit', onSearch);

const searchImg = new SearchImg();

function onSearch(e) {
  e.preventDefault();
  searchImg.searchQuery = e.currentTarget.elements.query.value;
  refs.list.innerHTML = '';

  const name = refs.input.value.trim();
  if (name === '') {
    return alert('Вы ввели пустую строку');
  }
  searchImg.resetPage();
  searchImg.fetchImgList().then(renderImg);
}

function renderImg(hits) {
  if (hits.total === 0) {
    error({
      text: 'Картинок с таким именем не найдено',
    });
  }
  refs.list.insertAdjacentHTML('beforeend', cardsList(hits));

  observer.observe(refs.lastDiv);
}

const observerHandler = entries => {
  const { isIntersecting } = entries[0];
  if (!isIntersecting) {
    return;
  }
  searchImg.incrementPage();
  searchImg
    .fetchImgList()
    .then(renderImg)
    .catch(error => console.log(error));
};

const observer = new IntersectionObserver(observerHandler);

function openLargeImg(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const largeUrl = e.target.getAttribute('data-img');
  const instance = basicLightbox.create(`<img src="${largeUrl}" >`);
  instance.show();
}
