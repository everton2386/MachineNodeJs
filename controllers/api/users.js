const express = require('express');
const User = require('../../models/User');
const app = express();


app.get('/' , async(req, res)=>{

    const users = await User.findAll({attributes: {exclude: []}});

    return res.status(200).json({users});    
})

module.exports = app;