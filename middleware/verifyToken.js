const jwt = require('jsonwebtoken')
const User = require('../models/User')

//function
module.exports = async function (req,res,next) {
    //const token = req.header('auth-token');
    const token = req.cookies.auth;
    if(!token) 
    {
        console.log('no token');
        return res.render('login');
        //return res.status(401).send('Access Denied');

    }

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY)
        //const user = await User.findOne({ _id: verified._id, 'tokens.token': token })
        const user = await User.findOne({ _id: verified._id})
        if (!user) {
            throw new Error()
        }
        //console.log(user);
        req.id = user._id;
        req.name = user.name;
        req.email = user.email;
        req.password = user.password;
        req.role = user.role;
        
        next();
    } catch (err) {
        console.log('Invalid Token');
        //res.status(400).send('Invalid Token');
        res.render('login');
        //res.render('login');
    }
}