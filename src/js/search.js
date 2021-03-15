import settings from './config';

const { KEY } = settings;

export default class SearchImg {
  constructor() {
    this.searchQuery = '';

    this.page = 1;
  }

  async fetchImgList() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    const response = await fetch(url);
    const listImg = await response.json();
    return listImg;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
