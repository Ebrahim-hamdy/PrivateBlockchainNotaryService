/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// define validationRequests, validatedAddresses for global access
app.locals.validationRequests = {}; 
app.locals.validatedAddresses = {};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes config
require('./app/routes/index.routes.js')(app);

// listen for requests
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
