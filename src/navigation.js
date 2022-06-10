//ejecutmos la funcion navigator cuando exista un cambio en el hash con el metodo haschange
window.addEventListener("hashchange", navigator, false)  
window.addEventListener("DOMContentLoaded", navigator, false)

function navigator(){
    console.log(location);
    if (location.hash.startsWith("#trends")){  //estamos prguntando si el "hash" que esta dentro de "location" empieza con "trends" en la url entonces realize X accion
        trendsPage()
    }else if ((location.hash.startsWith("#search="))){
        searchPage()
    }else if ((location.hash.startsWith("#movie="))){
        moviePage()
    }else if ((location.hash.startsWith("#categories="))){
        categoriesPage();
    }else{
        homePage();
    }
    location.hash
}

function homePage(){
    console.log("Volvemos al home")
    getTrendingPreview(); //mandamos a llamar las fn´s aqui ya que estas se ejecutarán solo al momento que nos encontremos en la pagina home eso se visualiza con el hash
    getCategoriesPreview();
}
function categoriesPage(){
    console.log("Estamos en Categories")
}
function searchPage(){
    console.log("Estamos en search")
}
function moviePage(){
    console.log("Estamos en movie")
}
function trendsPage(){
    console.log("Estamos en trends")
}