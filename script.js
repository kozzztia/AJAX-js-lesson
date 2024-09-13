const searchButton = document.querySelector('.search-button')




searchButton.onclick = (e) =>{
    e.preventDefault()
    console.log(e)
    const searchValue = getSearchParams()

    console.log(searchValue)
}




function getSearchParams(){
    const value =  document.querySelector('.search-input').value;
    if(value.length > 3){
        return value;
    }else{
        document.querySelector('.search-input').focus()
    }
}
