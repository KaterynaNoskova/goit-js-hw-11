import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_TwsPnWVWgRd7Je8KwFxuzAGnQywMPFuZYtMA8QXjIsdil17ShXwDaD7XZtCENu2s";
const base_url = "https://pixabay.com/api/";

export async function fetchPictures (q, page, perPage){
    const url = `${base_url}?q=${q}&page=${page}&per_page=${perPage}&image_type=${photo}&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);
    return response.data;
};

export const pageItems = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    buttonLoadMore: document.querySelector('.load-more'),
};

export function createMarkUp(results){
    const arrayPictures = results.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>{ 
        return `<div class="photo-card">
        <div class="photo-wrap">
        <a class="gallery-link" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" width="400" loading="lazy"/>
        </a>
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`
    });
    pageItems.insertAdjacentHTML("beforeend", arrayPictures.join(''));
};