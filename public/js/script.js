const form = document.querySelector("form");
const movie = document.querySelector(".movie");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("input").value.replace(/ /g, "+");
    fetch(`/movie?title=${encodeURIComponent(title)}`).then(res => res.json().then(data =>
        movie.textContent = data
    ));
})