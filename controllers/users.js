const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL} = require('../config');

//aqui esta ingresando a /api.users
usersRouter.post('/', async (request, response) => {
 const {name, email, passwordH} = request.body;
 if (!name || !email || !passwordH) {
    return response.status(400).json({error: 'Todos los espacios son requeridos'});
 }

 console.log(name, email, passwordH, 'sisi');
 const userExist = await User.findOne({email});

 if (userExist) {
  return response.status(400).json({error: 'El email ingresado ya se encuentra registrado.'});
 }
 console.log(userExist, 'sisisi2');

 //saltRound es el nivel de encriptacion de la contrasena
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(passwordH, saltRounds);

  // usuario en la base de datos

  const newUser = new User({
   name,
   email, 
   passwordH: passwordHash
  });

 const savedUser = await newUser.save();
 const token = jwt.sign({ id: savedUser.id }, process.env.ACCES_TOKEN_SECRET, {
   expiresIn: '1d'
  });

 const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 465,
   secure: true, // Use `true` for port 465, `false` for all other ports
   auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASS,
   },
 });

   // send mail with defined transport object
   transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: savedUser.email, // list of receivers
    subject: 'Verificación de Usuario ✔', // Subject line
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`, // html body
  });

   return response.status(201).json('Usuario creado. Por favor, verifica tu correo :).');
 
});

usersRouter.patch('/:id/:token', async (request, response) => {

  try {

    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified:true });
    return response.sendStatus(200);
    
  } catch (error) {
     // encontrar email de usuario
    const id = request.params.id;
    const { email } = await User.findById(id);

    //firmar el nuevo token
    const token = jwt.sign({ id: id }, process.env.ACCES_TOKEN_SECRET, {
      expiresIn: '1d'
     });

     //enviar el email
   
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
   
      // send mail with defined transport object
      await transporter.sendMail({
       from: process.env.EMAIL_USER, // sender address
       to: email, // list of receivers
       subject: 'Verificación de Usuario ✔', // Subject line
       html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`, // html body
     });

    return response.status(400).json({error: 'El link ya expiró. Se ha enviado uno nuevo.'});
  }
  
 });

module.exports = usersRouter;