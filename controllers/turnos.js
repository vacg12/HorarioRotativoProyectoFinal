const turnosRouter = require('express').Router();
const turno = require('../models/horario');

turnosRouter.get('/', async (request, response) => {
    const user = request.user;
    //aqui se pide el id de los usuarios. No se pone nada dentro del ".find()" porque los turnos no se guardan en los usuarios
   const horario = await turno.find();
   return response.status(200).json(horario);
});

//para crear turnos
turnosRouter.post('/', async (request, response) => {
    const user = request.user;

    const { nombre } = request.body;
    console.log(nombre);
    
    const nuevoTurno = new turno({
        nombre,
    });

    console.log(nuevoTurno);
    
    
    try {
        const savedTurno = await nuevoTurno.save();
        return response.status(201).json(savedTurno);
    } catch (error) {
        console.log(error);
        
        if (error.code === 11000) { // MongoDB duplicate key error code
            return response.status(400).json({ error: 'Duplicate key error: A turno with this key already exists.' });
        }
        return response.status(500).json({ error: 'An error occurred while saving the turno.' });
    }
   
});

//para eliminar
turnosRouter.delete('/:id', async (request, response) => {
    const user = request.user;
 
    await turno.findByIdAndDelete(request.params.id);

    return response.sendStatus(200);
});


module.exports = turnosRouter;