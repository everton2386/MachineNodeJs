require('dotenv').config();
const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();


app.post('/register', async(req ,res)=>{
   const { email, username, password } = req.body;

   if(!email)
   {
    return res.status(422).json({message: 'parameter email is required'});
   }

   if(!username)
   {
    return res.status(422).json({message: 'parameter username is required'});
   }

   if(!password)
   {
    return res.status(422).json({message: 'parameter password is required'});
   }

   try {
    const userExists = await User.findOne({where: {email} });
    if(userExists)
    {
        return res.status(400).json({message: 'This email is already in use !'});
    }
    
    const salt = await bcrypt.genSalt(12);

    const passwordHash = await bcrypt.hash(password,salt);

    await User.create({email,username,password: passwordHash});

    return res.status(201).json({message: 'User created successfully'});
    
   } catch (error) {
    return res.status(500).json({status: 'error'});
    
   }

});

app.post('/login', async(req, res)=>{
    const { email, password } = req.body;

    if(!email){
        return res.status(422).json({message: 'parameter email is required'})
    }

    if(!password)
    {
        return res.status(422).json({message: 'parameter password is required'});
    }

    try {
        const user = await User.findOne({where: {email} });
        if(!user)
        {
            return res.status(400).json({message: 'invalid email or password'});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword)
        {
            return res.status(400).json({message: 'invalid email or password'});
        }

        const secret = process.env.SECRET;

        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            is_admin: user.is_admin
        }
        
        const expiresIn = 7200;
        
        const token = jwt.sign(payload, secret, {expiresIn});

        return res.status(200).json({message: 'authentication successful!', 'x-access-token': token })

    } catch (error) {

        return res.status(500).json({status: 'error'});
        
    }

})

module.exports = app;