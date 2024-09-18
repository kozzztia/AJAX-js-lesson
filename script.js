const searchForm = document.querySelector('.search-form');
const resultTitle = document.querySelector('.result-title');
const main = document.querySelector('main');


const api = "https://www.omdbapi.com/";
const key = "2baeec96";
let currentPage = 1;
const filmList = document.createElement('ul');
filmList.classList.add('film-list');

searchForm.onsubmit = formHandle;

async function formHandle(e) {
    e.preventDefault();
    const input = e.target.querySelector(`[name = "search-value"]`);
    const { Search, totalResults } = await fetchFilms(input.value, currentPage);
    resultTitle.innerHTML = `you have ${!!totalResults ? totalResults : "none"} films when search ${input.value}`;

    main.innerHTML = "";
    main.appendChild(resultTitle);

    if (totalResults > 0) {
        const pagination = createPagination(totalResults, input.value);
        main.appendChild(pagination);
    }
    insertFilmsToList(Search)
    input.value = "";
}

async function fetchFilms(value, page) {
    try {
        const response = await fetch(`${api}?apikey=${key}&s=${value}&page=${page}`);
        const filmsData = await response.json();
        return filmsData;
    } catch (error) {
        console.error("Error fetching films:", error);
    }
};

function createPagination(count, searchValue) {
    const pages = Math.ceil(count / 10)
    const list = document.createElement('ul');
    list.classList.add('pagination-list');
    for (let i = 1; i <= pages; i++) {
        const element = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = i;
        button.onclick = () => handlePageClick(i, searchValue);
        element.appendChild(button);
        list.appendChild(element);
    }

    return list
}

function handlePageClick(pageNumber, searchValue) {
    currentPage = pageNumber;  
    fetchFilms(searchValue, currentPage)
        .then(({ Search }) => {
            insertFilmsToList(Search)
        });
}

function insertFilmsToList(data) {
    filmList.innerHTML = ""
    data.forEach(item => {
        const film = document.createElement('li');
        console.log(item)
        film.classList.add('film');
        const poster = (item.Poster && item.Poster !== "N/A") ? item.Poster : './assets/search.svg';
        film.innerHTML = `
            <h4>${item.Title}</h4>
            <div>${item.Year}</div>
            <img src="${poster}" alt="${item.Title}"/>`;
        filmList.appendChild(film)
    })
    main.appendChild(filmList)
}
