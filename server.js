const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var logger = require('morgan');
// const config = require('config')

const items = require('./routes/api/items');
const users = require('./routes/api/users');


const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB config
const config = require('./config/db');

//Connect to Mongo
mongoose.connect(config.database,{useNewUrlParser:true, useCreateIndex:true})
    .then(() => console.log('MongoDB Connected'))
    .catch(error=>console.log(error));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../client/src', 'public')));

app.use('/api/items', items);
app.use('/api', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
