const form = document.querySelector("form");
const movieDiv = document.querySelector(".movie");

//gets data when form is submitted
form.addEventListener("submit", (e) => {
    //prevents page from reload when submitted
    e.preventDefault();
    const title = document.querySelector("input").value.replace(/ /g, "+");
    //fetches data based on title and uses the movie route to query for similar movies
    fetch(`/movie?title=${title}`).then(res => res.json().then((data) => {
            if (data.error) {
                movieDiv.innerHTML = data.error;
            } else if (data.results.length === 0) {
                movieDiv.innerHTML = "Cannot find similar movies";
            } else {
                //creates individual cards for each movie and displays in the UI
                movieDiv.innerHTML = "";
                let result = '';
                data.results.forEach(movie => {
                    const {title, release_date, overview, vote_average, poster_path} = movie;
                    result += `<div class="movie-card">
                                    <img src="https://image.tmdb.org/t/p/original${poster_path}" alt="poster image">
                                    <div class="card-body">
                                    <h3>${title}</h3>
                                    <p>Release Date: ${release_date}</p>
                                    <p>Rating: ${vote_average}</p>
                                    <p>Overview: ${overview}</p>
                                    </div>
                                </div>`
                })
                movieDiv.innerHTML = result;
                console.log(data)
            }
        }
    ));
})