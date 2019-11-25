let axios = require('axios');
let _ = require('lodash');

const API_URI = "http://www.omdbapi.com/";
const API_KEY = "e67b100c";

class OMDb {

    static fetchAllMovies(movieTitle) {
        movieTitle = movieTitle.replace(/ /g, (x) => {
            return x === " " ? '_' : undefined;
        });
        return axios.get(`${API_URI}?apikey=${API_KEY}&s=${movieTitle}`);
    }

    static fetMovieByTitle(movieTitle) {
        movieTitle = movieTitle.replace(/ /g, (x) => {
            return x === " " ? '_' : undefined;
        });
        console.debug(`${API_URI}?apikey=${API_KEY}&t=${movieTitle}`);
        return axios.get(`${API_URI}?apikey=${API_KEY}&t=${movieTitle}`);
    }
}

module.exports = OMDb;