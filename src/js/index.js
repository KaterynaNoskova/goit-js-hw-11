import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures, createMarkup } from "./fetch";

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');
const input = searchForm.elements.searchQuery;

const perPage = 40;
let page = 1;
let searchQuery = "";

const callback = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { 
      observer.unobserve(entry.target)
      onClickButton();
    };
  });
};

const observer = new IntersectionObserver(callback);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

searchQuery = input.value.trim();
 if (!searchQuery) return;
  
  getPicturesParams(searchQuery);
});

async function getPicturesParams(searchQuery) {
    try {
      page = 1;
      const { hits: arrayPictures, totalHits } = await fetchPictures(searchQuery, perPage, page);

        if (arrayPictures.length === 0) {
          Notify.failure("Sorry, there are no images matching your search query. Please try again.");
          return;
        };

    Notify.info(`Hooray! We found ${totalHits} images.`);

    clearGallery();

    const markup = createMarkup(arrayPictures);

    renderGallery(markup);

    const galleryLastItem = gallery.lastElementChild;
    observer.observe(galleryLastItem);

  }
  catch (error) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }
};

function renderGallery(markup = ""){
  gallery.insertAdjacentHTML("beforeend", markup);
};

function clearGallery() {
  gallery.innerHTML = "";
};

async function onClickButton() { 
  try { 
    page += 1;
    const { hits, totalHits } = await fetchPictures(searchQuery, perPage, page);
    
    const markup = createMarkup(hits);

    renderGallery(markup);
    
    if (page * perPage >= totalHits) {
      return Notify.failure("We're sorry, but you've reached the end of search results.");
    }

    const galleryLastItem = gallery.lastElementChild;
    observer.observe(galleryLastItem);
  }
  catch (error) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
};

