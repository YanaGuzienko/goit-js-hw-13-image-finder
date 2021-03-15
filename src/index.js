import './styles.css';
import settings from './js/config';
import cardsList from './templates/imgTmp.hbs';
import SearchImg from './js/search';

// const { BASE_URL } = settings;
const { KEY } = settings;

const refs = {
  form: document.querySelector('#search-form'),
  list: document.querySelector('.gallery'),
  lastDiv: document.querySelector('.last-item'),
  input: document.querySelector('input'),
};
refs.form.addEventListener('submit', onSearch);

const searchImg = new SearchImg();

function onSearch(e) {
  e.preventDefault();
  searchImg.searchQuery = e.currentTarget.elements.query.value;
  const name = refs.input.value.trim();
  // if (name === '') {
  //   return;
  // }
  searchImg.resetPage();
  searchImg.fetchImgList().then(renderImg);

  console.log(refs.input.value);
  console.log(searchImg.searchQuery);
  // searchImg.resetPage();
}

function renderImg(hits) {
  // refs.list.innerHTML = cardsList(hits);
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', cardsList(hits));
  observer.observe(refs.lastDiv);
}

const observerHandler = entries => {
  const { isIntersecting } = entries[0];
  if (isIntersecting) {
    console.log('vdbsj,CK');
    // searchImg.incrementPage();
    searchImg.fetchImgList().then(renderImg);
  }
};
const observer = new IntersectionObserver(observerHandler);
// observer.observe(refs.lastDiv);

// let currentPage = 1;

// const observerHandler = entries => {
//   const { isIntersecting } = entries[0];
//   if (isIntersecting) {
//     console.log('vdbsj,CK');
//     fetchImgList(e);
//   }
// };
// const observer = new IntersectionObserver(observerHandler);
// observer.observe(refs.lastDiv);

// refs.form.addEventListener('submit', fetchImgList);

// function fetchImgList(e) {
//   e.preventDefault();
//   currentPage += 1;

//   // const name = e.target.value.toLowerCase().trim();
//   const searchQuery = e.currentTarget.query.value;
//   const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=12&key=${KEY}`;
//   fetch(url)
//     .then(response => response.json())
//     .then(hits => {
//       renderImg(hits);
//     });
// }

// function renderImg(hits) {
//   refs.list.innerHTML = cardsList(hits);
// }

// // function loadMore(e) {
// //   // currentPage += 1;
// //   fetchImgList(e);
// // }
