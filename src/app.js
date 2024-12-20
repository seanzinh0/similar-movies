//require packages
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const tmdb = require("./utils/tmdb");

//setup express server
const app = express();

//setup paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//adjust views settings
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup public directory to serve
app.use(express.static(publicDirectoryPath));

//route for index
app.get('', (req, res) => {
    res.render('index', {
        title: "Film Finder",
        name: "Sean Pichay"
    });
});

//route to get search queries
app.get("/movie", (req, res) => {
    if(!req.query.title) {
        return res.send({
            error: "You must provide a movie title"
        })
    }

    tmdb(req.query.title, (error, {results} = {}) => {
        if (error) {
            return res.send({error})
        }
        res.send({
            results: results,
        })
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});