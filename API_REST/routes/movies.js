//./movies
const _ = require('lodash');
const express = require('express');
const Fetcher = require('../models/fetchDb');

// initialize the db
let fetcher = new Fetcher();
let db = [];
fetcher.init(() => {
    db = fetcher.db;
});

//Router
const router = express.Router();

//all GET movies
router.get('/movies', (request, response) => {
    response.status(200).json(db);
});

//GET a movie by id
router.get('/movies/:id', (request, response) => {

    let movie = _.find(db, (elem) => {
        return elem.id === parseInt(request.params.id) ;
    });

    if(movie === undefined) {
        response.status(404).send('<h1>ERROR : Not Found</h1>');
    }
    response.status(200).json(movie);
});

//PUT (create
router.put('/movies', (request, response) => {
    let data = request.query;
    let actors = data.actors;

    console.log(data);
    let lastID = _.maxBy(db, (elem) => {
        return elem.id;
    }).id;

    db.push({
        id : lastID+1,
        movie: data.Title,
        yearOfRelease: data.Year,
        duration: data.Runtime, // en minutes,
        actors: (actors === undefined) || (actors === "") ? "N/A" : _.split(actors, ','),
        poster: data.Poster === undefined ? "N/A" : data.Poster, // lien vers une image d'affiche,
        boxOffice: data.BoxOffice === "N/A" ? "N/A" : `${data.BoxOffice}$`, // en USD$,
        rottenTomatoesScore: {Source : "Rotten Tomatoes", Value: data.ratingTomatoe}
    });

    response.status(200).send(data);
});

module.exports = router;