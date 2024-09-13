const searchForm = document.querySelector('.search-form');



searchForm.onsubmit = formHandle;

function formHandle(e){
    e.preventDefault();
    const input = e.target.querySelector(`[name = "search-value"]`);


    fetchFilms(input.value)
    input.value = ""
}

function fetchFilms(value){
    console.log(value)
}
