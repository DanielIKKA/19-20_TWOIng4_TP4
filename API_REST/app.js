/*--- Libraries ---*/
let express = require('express');

/*--- Constants ---*/
const API_URI = "/my_api_movies_TWtp4";

// express Init
let app_api = express();
app_api.use(require('./middleware/allowCrossDomain'));


//define routes
let moviesRouter = require('./routes/movies');
app_api.use(API_URI, moviesRouter);

//define port listener
app_api.listen(3000);

module.exports = app_api;