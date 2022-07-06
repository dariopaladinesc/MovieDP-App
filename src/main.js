///NOTAS 
////MANIPULACION DEL DOM.- Al manipular el dom tenemos que tener la misma estructura del html (clases, id, etiquetas) para que se enlazen con css y js
////APPENDCHILD.- Los appendchild nos sirven para crear nodos donde el primer valor es el contenedor padre y el que va en parentesis el contenedor o etq hija (tener en cuenta que para que funcione, siempre se deben tener la misma estructura del HTML, irse guiando por el nombre de las clases)
///AXIOS.- Axios me permite trabajar sin la necesidad de hacer un fetch, sin la necesidad de en la url colocar todo el link sino irlo colocando por partes, igualmente la api-key, ya que esta se coloca dentro de las propiedades de axios, y finalmente para este ejemplo no hay necesidad de parsear la respuesta que obtenemos de la API con el .json . Revisar la diferencia entre las dos funciones "trending y categories" la una con y la otra sin axios



const apiKey =  "ebef3c4904b620dd2750ccb92c78cdc6"

//AXIOS
const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params:{
        "api_key": apiKey,
    },
}); 

//  +++++ REPEAT FUNCTIONS  +++++++

//FN que hace el llamado a las peliculas. Parametro: "MOVIES"-> var donde esta almacenada el data.results. "container"-> es el contenedor donde se carga c/pelicula
function principalMovie(MOVIES, container){  
    
    container.innerHTML = " ";    // C/vez que se accede a otra pagina al regresar al home se duplican las categorias, por lo que con esta linea primero eliminamos y luego se hace la peticion a la API
    MOVIES.forEach(movie => {
        const movieImg = document.createElement("img"); 
        movieImg.classList.add("imagen");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);
        container.appendChild(movieImg);  
        
        container.addEventListener("click", ()=>{ 
            location.hash = "#movie=" + movie.id
        })
    })
}

function CATEGORIES(CATEGORY, ContainerCat){
  
    ContainerCat.innerHTML = " " 
    CATEGORY.forEach(category => {
        const categoryButton = document.createElement("button"); 
        categoryButton.classList.add("boton");
        categoryButton.addEventListener("click", () => {
            location.hash = "#categories=" + category.id + "-" + category.name;
        })
        const contentBotton = document.createTextNode(category.name)

        //APENDCHILD (buscar en notas)
       categoryButton.appendChild(contentBotton);
       ContainerCat.appendChild(categoryButton)
    })   
}


 // ++   Intersection Observer ++ ///

//creamos la nueva instancia, la var entries lleva todos los parametros de la instancia intersectionObserver, y ya la variable entry es la que se reemplazará por el movieImg
const observador = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            const url = entry.target.getAttribute('data-img');//en url estamos guardando la url de c/movie, ya que con getAtribute almacenamos el atributo que esta en la img
            entry.target.setAttribute('src',url)//colocamos el atributo src con el link guardado anteriormente
        }    
    })
})



//-----------------------------------------------------------//





async function getTrendingPreview(){
    const { data } = await api("trending/movie/day")

    const movies = data.results;
    const trendingPreview = document.querySelector("#trend-section-container .trend-container-figures");
    trendingPreview.innerHTML = " "; 

    movies.forEach(movie => {
        //DOM (Buscar Notas)

        const movieContainer = document.createElement("div"); //Esto nos permite crear una nueva etiqueta div
        movieContainer.classList.add("figure-container--movie-list"); //le agregamos la clase de esta misma etiqueta, misma clase que esta en el html

        movieContainer.addEventListener("click", ()=>{ //Fn para que al darle click en la pelicula nos lleva a la pag movie description
            location.hash = "#movie=" + movie.id
        })
         
        const movieImg = document.createElement("img"); 
        movieImg.classList.add("imgMovie");
        movieImg.setAttribute("alt", movie.title); 
        movieImg.setAttribute("data-img", "https://image.tmdb.org/t/p/w300" + movie.poster_path);
        observador.observe(movieImg) //ejecutamos la fn observador y la estamos observando, colocandole con su respectivo contenedor

        const titleMovieContainer = document.createElement("div"); //etq contenedor del titulo de la movie y la calificacion
        titleMovieContainer.classList.add("description-movie");
        const titleMovie = document.createElement("p");
        titleMovie.classList.add("titleOfMovie");
        const textP = document.createTextNode(movie.original_title) //estamos añadiendo un texto a la etiqueta p

        const rateMovie = document.createElement("p");
        rateMovie.classList.add("rate");
        const textRate = document.createTextNode(`Rate:${(movie.vote_average).toFixed(1)}`)

        //APENDCHILD (buscar en notas)
        movieContainer.appendChild(movieImg); //movieContainer es una etq div padre que contiene la etq im(movieImg)
        trendingPreview.appendChild(movieContainer); //TrendigPreview es la etiqueta contenedor padre de todos los elementos
        titleMovie.appendChild(textP);//Estamos agregando el texto a la etq p
        titleMovieContainer.appendChild(titleMovie); //la etq p(titleMovie) es hija del contenedor div
        rateMovie.appendChild(textRate);
        titleMovieContainer.appendChild(rateMovie);//Mismo procedimiento que para titleMovie
        movieContainer.appendChild(titleMovieContainer); //finalmente agregamos toda la estructura del titulo de la pelicula y puntuacion al contenedor padre div
    })
    
}


async function getCategoriesPreview(){
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey)
    const data = await res.json();
    
    const categories = data.genres;
    const categoriesPreview = document.querySelector(".categories-section .categories-section--list")
    CATEGORIES(categories, categoriesPreview)
    
}
// getCategoriesPreview() Comentamos la ejecucion de las FN ya que las estamos mandando a llamar al momento de que estemos en la pagina adecuada(revisar) 

async function getTrends(){
    const { data } = await api("trending/movie/day", {
        params:{
            "api_key": apiKey,
        },
    })

    const movies = data.results;
    const movieCategory = document.querySelector(".category-section .previewCategories_container");
    principalMovie(movies, movieCategory)
    
}

async function getMovieCategory(id){
    const { data } = await api("discover/movie", {
        params: {
            with_genres: id,
        }
    })

    const movies = data.results;
    const movieCategory = document.querySelector(".category-section .previewCategories_container");
    principalMovie(movies, movieCategory)
    
}

async function getMovieSearch(query){
    const { data } = await api("search/movie", {
        params: {
            query, /// la propiedad en la docAPI se llama query y nuestro valor de esa propiedad tiene el mismo nombre, xloq es suf colocar directamente
        }
    })

    const movies = data.results;
    const searchSection = document.querySelector(".search-section .previewCategories_container")
    principalMovie(movies, searchSection)
    
}

async function getMovieById(id){
    const { data: movie } = await api("movie/" + id, {
        params:{
            "api_key": apiKey,
        },
    })
    const PosterMovie = "https://image.tmdb.org/t/p/w500" + movie.poster_path; 
    movieSection.style.backgroundImage = `url(${PosterMovie})`; 
    titleMovie.innerHTML= movie.title;
    description.innerHTML= movie.overview;
    vote.innerHTML= "⭐ " + movie.vote_average; 
  
    CATEGORIES(movie.genres, listCategories);
    getSimilarsMovies(id)
}

async function getSimilarsMovies(id){
    const { data: movie } = await api(`movie/${id}/similar`)
    const relatedMovies = movie.results;
    
    principalMovie(relatedMovies, similarMovieList)
}



