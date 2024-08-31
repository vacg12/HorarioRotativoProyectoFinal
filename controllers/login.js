const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const userExist = await User.findOne({ email });
    console.log(userExist);
    
    if (!userExist) {
        return response.status(400).json({error: 'Email o contraseña no valido.'});
    }

    if (!userExist.verified) {
        return response.status(400).json({error: 'Tu email aun no ha sido verificado.'});
    }
    
   const isCorrect = await bcrypt.compare(password, userExist.passwordH);
   
   if (!isCorrect) {
    return response.status(400).json({error: 'Email o contraseña no valido.'});
   }

   const userForToken = {
     id: userExist.id,
   }

   const accessToken = jwt.sign(userForToken, process.env.ACCES_TOKEN_SECRET, {
     expiresIn: '1d'
   });

   response.cookie('accessToken', accessToken, {
     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
     secure: process.env.NODE_ENV === 'production',
     httpOnly: true
   });

   return response.sendStatus(200);

});

module.exports = loginRouter;