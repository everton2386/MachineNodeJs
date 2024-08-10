const express = require('express');
const index = require('./web/index');
const login = require('./web/login');
const register = require('./web/register');
const app = express();

app.use('/' , index);
app.use('/login', login);
app.use('/register', register);


module.exports = app;