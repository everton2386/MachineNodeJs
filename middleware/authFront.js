require('dotenv').config();
const jwt = require('jsonwebtoken');

function checkAuthFront(req , res , next)
{
    const token = req.cookies.token;
    if(!token){
        return res.redirect('/login');
    }

    try {
        const secret = process.env.SECRET;
        const decodeToken = jwt.verify(token, secret);
        req.user = decodeToken;
        next(); 
                
    } catch (error) {
        return res.redirect('/login');        
    }

}

module.exports = checkAuthFront;