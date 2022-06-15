//ejecutmos la funcion navigator cuando exista un cambio en el hash con el metodo haschange. Es decir cuando hay cambio de link entra la funcion navigator la cual realiza la comparacion para de acuerdo a eso redireccionar la pagina
//Para que el programa funcione tiene que empezar el html en el home section es decir con las clases de movie description en inactive y partiendo de ahi JS ira agregando y quitando dinamicamente las clases en funcion del hash de location

verMas.addEventListener("click", () => {
    location.hash = "trends="
})
flecha.addEventListener("click", () => {
    location.hash = "home="
})
flecha1.addEventListener("click", () => {
    location.hash = "home="
})
flecha2.addEventListener("click", () => {
    location.hash = "home="  //window.history.back()  <- esta sirve para guardar el historia de busqueda en el nav
})
searchButton.addEventListener("click", () => {
    location.hash = `#search=${searchInput.value}`
})

window.addEventListener("hashchange", navigator, false)  
window.addEventListener("DOMContentLoaded", navigator, false)

function navigator(){
    console.log(location);
    if (location.hash.startsWith("#trends=")){  //estamos prguntando si el "hash" que esta dentro de "location" empieza con "trends" en la url entonces realize X accion
        trendsPage()
    }else if ((location.hash.startsWith("#search="))){
        searchPage()
    }else if ((location.hash.startsWith("#movie="))){
        moviePageDescription()
    }else if ((location.hash.startsWith("#categories="))){
        categoriesPage();
    }else{
        homePage();
    }

}


function homePage(){
    principalheader.classList.add("principal-header")
    principalnav.classList.remove("fixed")
    generalDescription.classList.add("inactive");
    homeSection.classList.remove("inactive");
    categorySection.classList.add("inactive");
    searchSection.classList.add("inactive")
    console.log("Volvemos al home")
    getTrendingPreview(); //mandamos a llamar las fn´s aqui ya que estas se ejecutarán solo al momento que nos encontremos en la pagina home eso se visualiza con el hash (estas fn se encuentran en main.js)
    getCategoriesPreview();
}

function categoriesPage(){
    principalheader.classList.add("principal-header")
    principalnav.classList.remove("fixed")
    generalDescription.classList.add("inactive");
    homeSection.classList.add("inactive");
    categorySection.classList.remove("inactive")
    titleCategory.classList.remove("inactive")
    searchSection.classList.add("inactive")
    console.log("Estamos en Categories");

    const [_ , categoryData] =  location.hash.split('=')  //estamos separando 2 element. por un lado el category, id-name con el metodo del array split. De esta forma con ECMA6+ al devolvernos 2 variables las colocamos directamente en el array. En "_" se almacena el hash #category= y en el "categorydata" se almacena "5125-action" el id y el nombre al que pertenece 
    const [categoryId, categoryName] = categoryData.split("-")
    const titleModified = decodeURI(categoryName) // cuando traes el nombre de la url si tiene espacios lo rellena con %20 en html, "decodeURI" elimina ese % y pone como va realmente 
    titleTrends.innerHTML = (titleModified);
    getMovieCategory(categoryId);
    window.scrollTo(0, 0);
}

function searchPage(){
    principalheader.classList.add("principal-header")
    principalnav.classList.remove("fixed")
    generalDescription.classList.add("inactive");
    homeSection.classList.add("inactive");
    categorySection.classList.add("inactive");
    titleCategory.classList.add("inactive");
    
    //   [#search, "platzi"]
    const [_ , query] =  location.hash.split('=');
    getMovieSearch(query);
    titleTrends1.innerHTML = "Resultados de: " + query;
    console.log("Estamos en search")
}

function moviePageDescription(){
    principalheader.classList.add("principal-header")
    principalnav.classList.add("fixed")
    generalDescription.classList.remove("inactive");
    homeSection.classList.add("inactive");
    categorySection.classList.add("inactive")
    console.log("Estamos en movie")
}

function trendsPage(){
    titleCategory.innerHTML= "Trends"
    principalheader.classList.add("principal-header")
    principalnav.classList.remove("fixed")
    generalDescription.classList.add("inactive");
    homeSection.classList.add("inactive");
    categorySection.classList.remove("inactive");
    titleTrends.classList.add("inactive");
    searchSection.classList.add("inactive")
    console.log("Estamos en trends");
    getTrends();
}