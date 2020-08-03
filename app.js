"use strict"

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const mongoDBURL = 'mongodb://localhost:27017/URL-Shortener';
const port = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/', routes);

mongoose.connect(mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('\nConnected to mongo database');
}).catch(error => {
    console.log('\nError connecting to database');
    console.log(error);
});

app.listen(port, () => {
    console.log('\nListening at port ' + port);
})



