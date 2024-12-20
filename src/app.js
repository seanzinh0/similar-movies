const path = require('path');
const express = require('express');
const hbs = require('hbs');
const tmdb = require("./utils/tmdb");

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Film Finder",
        name: "Sean Pichay"
    });
});

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