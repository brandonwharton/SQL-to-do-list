const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// Set up port to either run on provided port, or choose port 5000 if local
const PORT = process.env.PORT || 5000;
// router
const tasksRouter = require('./routes/tasks.router');


app.use(bodyParser.urlencoded({extended: true}));
// make available static html, styles, and scripts
app.use(express.static('server/public'));

// ROUTES
app.use('/tasks', tasksRouter)


// Listen for requests on given port
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});