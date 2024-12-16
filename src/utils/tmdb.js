const request = require("express");
const tmdb = (title, callback) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=f17c6b82abcc1af74cc075687b8f9384`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to TMDB", undefined);
        } else if (body.error){
            callback("Unable to find movies", undefined);
        } else {
            callback(undefined, {
                tile: body.results[0].original_title
            });
        }
    })
}

module.exports = tmdb;