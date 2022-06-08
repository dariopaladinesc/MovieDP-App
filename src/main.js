///NOTAS 
////MANIPULACION DEL DOM --> Al manipular el dom tenemos que tener la misma estructura del html (clases, id, etiquetas) para que se enlazen con css y js
////Los appendchild nos sirven para crear nodos donde el primer valor es el contenedor padre y el que va en parentesis el contenedor o etq hija (tener en cuenta que para que funcione, siempre se deben tener la misma estructura del HTML, irse guiando por el nombre de las clases)




const apiKey =  "ebef3c4904b620dd2750ccb92c78cdc6"

async function getTrendingPreview(){
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=" + apiKey)
    const data = await res.json();

    const movies = data.results;
    console.log({ data, movies});
    movies.forEach(movie => {
        //DOM (Buscar Notas)
        const trendingPreview = document.querySelector("#trend-section-container .trend-container-figures")

        const movieContainer = document.createElement("div"); //Esto nos permite crear una nueva etiqueta div
        movieContainer.classList.add("figure-container--movie-list"); //le agregamos la clase de esta misma etiqueta, misma clase que esta en el html
        
        const movieImg = document.createElement("img"); 
        movieImg.classList.add("imgMovie");
        movieImg.setAttribute("alt", movie.title); //Creamos los atributos de la etq img, donde pasan dos valores, el tipo de atributo y el valor de dicho atributo 
        movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);
        
        const titleMovieContainer = document.createElement("div"); //etq contenedor del titulo de la movie y la calificacion
        titleMovieContainer.classList.add("description-movie");
        const titleMovie = document.createElement("p");
        titleMovie.classList.add("titleOfMovie");
        const textP = document.createTextNode(movie.original_title) //estamos añadiendo un texto a la etiqueta p

        const rateMovie = document.createElement("p");
        rateMovie.classList.add("rate");
        const textRate = document.createTextNode("Rate:  " + movie.vote_average +"pts")

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

getTrendingPreview();



async function getCategoriesPreview(){
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey)
    const data = await res.json();

    const categories = data.genres;
    console.log({ data, movies});
    categories.forEach(category => {
        //DOM (Buscar Notas)
        const categoriesPreview = document.querySelector(".categories-section")

        const categoryContainer = document.createElement("div"); 
        categoryContainer.classList.add("categories-section--list");

        const categoryButton = document.createElement("button"); 
        categoryButton.classList.add("imgMovie");
        movieImg.setAttribute("alt", movie.title); 
        movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);

        //APENDCHILD (buscar en notas)
        movieContainer.appendChild(movieImg); 
        trendingPreview.appendChild(movieContainer);
        titleMovie.appendChild(textP);
        titleMovieContainer.appendChild(titleMovie, rateMovie); 
        rateMovie.appendChild(textRate);
        titleMovieContainer.appendChild(rateMovie);
        movieContainer.appendChild(titleMovieContainer); 
    })
    
}