const request = require("request");
const tmdb = (title, callback) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&api_key=f17c6b82abcc1af74cc075687b8f9384`
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect to TMDB", undefined);
        } else if (body.results.length === 0) {
            callback("Unable to find movies", undefined);
        }
        const movieID = body.results[0].id;
        const similarURL = `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=f17c6b82abcc1af74cc075687b8f9384`;

        request({url: similarURL, json: true}, (error, {body} = {}) => {
            if (error) {
                callback("Unable to connect to TMDB", undefined);
            } else if (body.status_code) {
                callback("Unable to find movies", undefined);
            }
            callback(undefined, {
                results: body.results,
            })
        })

    })
}

module.exports = tmdb;