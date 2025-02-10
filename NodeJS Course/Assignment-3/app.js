const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const homeRoute = require('./routes/home');
const userRoute = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use(homeRoute);
app.use(userRoute);

app.listen(3000);