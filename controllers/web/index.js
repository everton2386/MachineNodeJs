const express =  require('express');
const checkAuthFront = require('../../middleware/authFront');
const app =  express();

app.get('/', checkAuthFront, (req, res)=>{
    const user = req.user.username;
    const jwt = req.user;
    console.log(jwt);
    res.render('index', {user});
    
});

module.exports = app;