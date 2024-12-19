const form = document.querySelector("form");
const movieDiv = document.querySelector(".movie");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("input").value.replace(/ /g, "+");
    fetch(`http://localhost:3000/movie?title=${title}`).then(res => res.json().then((data) => {
            if (data.error) {
                movieDiv.textContent = data.error;
            } else {
                let result = '';
                data.results.forEach(movie => {
                    const {title, release_date, overview, vote_average} = movie;
                    result += `<div class="movie-card">
                                    <h3>${title}</h3>
                                    <p>${release_date}</p>
                                    <p>${vote_average}</p>
                                    <p>${overview}</p>
                                </div>`
                })
                movieDiv.innerHTML = result;
                console.log(data)
            }
        }
    ));
})