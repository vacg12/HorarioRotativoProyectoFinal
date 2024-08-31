const scheduleRouter = require('express').Router();
const horario = require('../models/horario');
const usuario = require('../models/user');

// NOTA: horario/horarios se refiere a turnos
// NOTA 2: el const de usuarios es para obtener los usuarios guardados y que me aparezcan en el slect de crear grupos
scheduleRouter.get('/', async (request, response) => {
    const user = request.user;
    const usuarios = await usuario.find();
   return response.status(200).json(usuarios);
});

// scheduleRouter.get('/', async (request, response) => {
//     const user = request.user;
//     //aqui se pide el id de los usuarios
//    const horario = await horarios.find({ user: user.id });
//    return response.status(200).json(horario);
// });

// //para crear turnos
// scheduleRouter.post('/', async (request, response) => {
//     const user = request.user;

//     const { nombre } = request.body;
    
//     const nuevoHorario = new horarios({
//      nombre,
//     });
    
//     const savedHorario = await nuevoHorario.save();
    
//     return response.status(201).json(savedHorario);
   
// });

module.exports = scheduleRouter;