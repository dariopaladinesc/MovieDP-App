//ejecutmos la funcion navigator cuando exista un cambio en el hash con el metodo haschange. Es decir cuando hay cambio de link entra la funcion navigator la cual realiza la comparacion para de acuerdo a eso redireccionar la pagina
//Para que el programa funcione tiene que empezar el html en el home section es decir con las clases de movie description en inactive y partiendo de ahi JS ira agregando y quitando dinamicamente las clases en funcion del hash de location

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
    container2.classList.remove("inactive")
    secondCategory.classList.remove("inactive")
    console.log("Estamos en Categories")
}
function searchPage(){
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
    principalheader.classList.add("principal-header")
    principalnav.classList.remove("fixed")
    generalDescription.classList.add("inactive");
    homeSection.classList.add("inactive");
    categorySection.classList.remove("inactive");
    titleCategory.classList.add("inactive")
    container2.classList.add("inactive")
    secondCategory.classList.add("inactive");
    
    console.log("Estamos en trends")
}