import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures } from "./fetch";
import { pageItems } from './fetch';

// const BASE_URL = "https://pixabay.com/api/";
// const API_KEY = "39056074-7558ace36b4fb710d53bdcd58";
// const searchForm = document.querySelector('.search-form');
// const gallery = document.querySelector('.gallery');
// const buttonLoadMore = document.querySelector('.load-more');

const perPage = 40;
let page = 1;
let searchPhoto = '';

const {searchForm, gallery, buttonLoadMore} = pageItems;

buttonLoadMore.classList.add('is-hidden');
searchForm.addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();

    gallery.innerHTML = '';
    page = 1;
    const {searchQuery} = e.target.elements;
    searchPhoto = searchQuery.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('+');

        if (searchPhoto === ''){
            Notify.info('What you want to find? Please enter a query!', 
            {
                position:'center-center',
                timeout: 5000,
                width: '250px',
                fontSize: '14px',
            });
            return;
        }
    async function fetchPictures(searchPhoto, page, perPage) {
        (data => {
            const results = data.hits;
            if (data.totalHits === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.',
                    {
                        position: 'center-bottom',
                        timeout: 5000,
                        width: '250px',
                        fontSize: '14px',
                    });
            } else {
                Notify.info(`Hooray! We found ${totalHits} images.`,
                    {
                        position: 'center-top',
                        timeout: 5000,
                        width: '250px',
                        fontSize: '14px',
                    });
                createMarkUp(results);
            };
            if (data.totalHits > perPage) {
                buttonLoadMore.classList.remove('is-hidden');
                window.addEventListener('scroll', loadMorePage);
            };
        }).catch(fetchError);
    }
    buttonLoadMore.addEventListener('click', clickLoadMore);

    e.target.reset();
};

function clickLoadMore(){
    page +=1;
    fetchPictures(searchPhoto, page, perPage).then(data=>{
        const results = data.hits;
        const pagesNumber = Math.ceil(data.totalHits / perPage);

        createMarkUp(results);

        if (page === pagesNumber){
            buttonLoadMore.classList.add('is-hidden');
            Notify.info("We're sorry, but you've reached the end of search results.",  {
                position: 'center-top',
                timeout: 5000,
                width: '250px',
                fontSize: '18px',
            });
            
            buttonLoadMore.removeEventListener('click', clickLoadMore);
            window.removeEventListener('scroll', loadMorePage);
        };

    }).catch(fetchError);
};

function fetchError(){
    Notify.failure('Oops! Something went wrong! Try reloading the page!',
    {
        position:'center-center',
        timeout: 5000,
        width: '250px',
        fontSize: '16px'
    });
};
