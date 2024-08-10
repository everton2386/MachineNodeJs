const express =  require('express');
const auth = require('./api/auth')
const users = require('./api/users');
const app =  express();


app.use('/auth', auth);
app.use('/users', users);

module.exports =  app;