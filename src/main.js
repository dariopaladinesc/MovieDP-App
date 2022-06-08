const url_api =  "ebef3c4904b620dd2750ccb92c78cdc6"

async function getTrendingPreview(){
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=" + url_api)
    const data = await res.json();

    const movies = data.results;
    console.log({ data, movies});
    movies.forEach(movie => {
        const trendingPreview = document.querySelector("#trend-section-container .trend-container-figures")

        const movieContainer = document.createElement("div");
        movieContainer.classList.add("figure-container--movie-list");
        

        const movieImg = document.createElement("img");
        movieImg.classList.add("imgMovie");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        trendingPreview.appendChild(movieContainer)
    })
    
}

getTrendingPreview();