//  +++  REVISAR NOTAS   +++
//1° Funciones principales
let page = 1
let infinite;

window.addEventListener("hashchange", navigator, false)  
window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("scroll", infinite, false) // Infinite scroll dinámico 8°

verMas.addEventListener("click", () => {
    location.hash = "trends="
})
flecha.addEventListener("click", () => {
     location.hash = window.history.back() //btn principal para regresar a pag anteriores
})
flecha1.addEventListener("click", () => {
      location.hash = "#home="
})
flecha2.addEventListener("click", () => {
     location.hash = "#home="
})
searchButton.addEventListener("click", () => {
    location.hash = `#search=${searchInput.value}`
})


function navigator(){
    if (infinite){
        window.removeEventListener("scroll", infinite, false)
        infinite = undefined
    }
    if (location.hash.startsWith("#trends=")){  //preguntamos si el "hash" que esta dentro de "location" empieza con "trends" en la url entonces realize X accion
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
    if (infinite){
        window.addEventListener("scroll", infinite, false)
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

    getCategoriesPreview();
    getTrendingPreview(); //ejecucuion de FN dependiendo del hash, fn estan en main.js
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
    
    //[#search, "platzi"]
    const [_ , query] =  location.hash.split('=');
    getMovieSearch(query);
    titleTrends1.innerHTML = "Resultados de: " + query;
    console.log("Estamos en search")

    infinite = getPagesSearch(query)
}

function moviePageDescription(){
    principalheader.classList.add("principal-header")
    principalnav.classList.add("fixed")
    generalDescription.classList.remove("inactive");
    homeSection.classList.add("inactive");
    categorySection.classList.add("inactive")
    console.log("Estamos en movie")
    // [#movie, "4527"]
    const [_ , movieId] =  location.hash.split('=');
    getMovieById(movieId)
   
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
    infinite = getPagesTrend // 8°
}