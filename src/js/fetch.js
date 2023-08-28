import axios from "axios";

const base_url = "https://pixabay.com/api/";
const api_key = "39056074-7558ace36b4fb710d53bdcd58";

export const fetchPictures = async (searchQuery, PER_PAGE = 40, page = 1) => {
  
    const { data } = await axios.get(base_url, {
        params:
        {
            key: api_key,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            q: searchQuery,
            page,
            per_page: PER_PAGE,
        }
    });
    const { hits, totalHits } = data;
    return { hits, totalHits };
};
export function createMarkup(arrayPictures = []){
  return arrayPictures
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>`
      <div class="photo-card">
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
      </div>`).join("");
};