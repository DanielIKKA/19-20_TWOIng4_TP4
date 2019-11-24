let omdb_api = require('../models/OMDb');
let EventEmitter = require('events').EventEmitter;
let _ = require('lodash');

let emitter = new EventEmitter();
let EVENT_MOVIES_DOWNLOADED = 'moviesDownloaded';
let EVENT_DB_END = 'dbEnd';

class FetchDb {

    constructor() {
        this.db = []
    }

    init(callback) {

        let movies = [];

        omdb_api
            .fetchAllMovies('Avengers')
            .then(function (response) {
                movies = response.data.Search;

                emitter.emit(EVENT_MOVIES_DOWNLOADED);
            });

        emitter.on(EVENT_MOVIES_DOWNLOADED, () => {
            movies.map((value, index) => {
                omdb_api
                    .fetMovieByTitle(value.Title)
                    .then((response) => {
                        const data = response.data;
                        const actors = data.Actors;
                        const ratings = data.Ratings;

                        const ratingTomatoe = _.find(ratings, ["Source", "Rotten Tomatoes"]);

                        this.db.push({
                            id: index,
                            movie: data.Title,
                            yearOfRelease: data.Year,
                            duration: data.Runtime, // en minutes,
                            actors: (actors === undefined) || (actors === "") ? "N/A" : _.split(actors, ','),
                            poster: data.Poster, // lien vers une image d'affiche,
                            boxOffice: data.BoxOffice === "N/A" ? "N/A" : `${data.BoxOffice}`, // en USD$,
                            rottenTomatoesScore: ratingTomatoe === undefined ? ratings[0] : ratingTomatoe
                        });

                        if(index === movies.length-1) { emitter.emit(EVENT_DB_END)}
                    })
                    .catch((err) => {console.error(err, index)})
            });
        });

        emitter.on(EVENT_DB_END, () => {
            callback();
        });
    }
}

module.exports = FetchDb;