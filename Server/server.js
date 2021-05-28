const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// Set up port to either run on provided port, or choose port 5000 if local
const PORT = process.env.PORT || 5000;
// TO DO: Router requirement here, move pool to router as well
const pool = require('./modules/pool');

app.use(bodyParser.urlencoded({extended: true}));
// make available static html, styles, and scripts
app.use(express.static('server/public'));

// ROUTES


// Listen for requests on given port
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});