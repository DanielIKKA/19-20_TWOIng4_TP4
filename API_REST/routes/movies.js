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

let router = express.Router();

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
        boxOffice: data.BoxOffice === "N/A" ? "N/A" : `${data.BoxOffice}`, // en USD$,
        rottenTomatoesScore: {Source : "Rotten Tomatoes", Value: data.ratingTomatoe}
    });

    response.status(200).end();
});

//POST update a movie by ID
router.post("/movies/:id", (request, response) => {
    let movieToUpdate = _.find(db, (elem) => {
        return elem.id === parseInt(request.params.id) ;
    });

    if(movieToUpdate === undefined) {
        response.status(404).send('<h1>ERROR : Not Found</h1>');
    }

    request.query.movie !== undefined ? movieToUpdate.movie = request.query.movie : undefined;
    request.query.yearOfRelease !== undefined ? movieToUpdate.yearOfRelease = request.query.yearOfRelease : undefined;
    request.query.duration !== undefined ? movieToUpdate.duration = request.query.duration : undefined;
    request.query.poster !== undefined ? movieToUpdate.poster = request.query.poster : undefined;
    request.query.boxOffice !== undefined ? movieToUpdate.boxOffice = request.query.boxOffice: undefined;

    if(request.query.actors !== undefined) {
        if(request.query.actors === "") movieToUpdate.actors = "N/A";
        else movieToUpdate.actors = _.split(request.query.actors, ',');
    }

    response.status(200).end();
});


//DELETE an element by id
router.delete("/movies/:id", (request, response) => {
    let movieToDelete = _.find(db, (elem) => {
        return elem.id === parseInt(request.params.id) ;
    });

    if(movieToDelete === undefined) {
        response.status(404).send('<h1>ERROR : Not Found</h1>');
    }

    _.remove(db, (n) => {
        return n.id === parseInt(request.params.id);
    });

    response.status(200).end();
});

module.exports = router;