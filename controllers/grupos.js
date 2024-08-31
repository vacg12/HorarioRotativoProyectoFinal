const gruposRouter = require('express').Router();
const grupo = require('../models/grupos');

gruposRouter.get('/', async (request, response) => {

  try {
    const user = request.user;
    const { turno, dias } = request.query; // Obtener parámetros de consulta

    // Construir la consulta
    const query = {};
    if (turno) query.turno = turno;
    if (dias) query.dias = dias;

    // Encontrar grupos y poblar
    const grupos = await grupo.find(query).populate('usuarios').populate('turno');

    return response.status(200).json(grupos);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Error al obtener los grupos' });
  }
    
});

gruposRouter.post('/', async (request, response) => {
    const user = request.user;

    const { dias, turno, usuarios } = request.body;

  
    const nuevoGrupo = new grupo({
      dias,
      turno: turno,
      usuarios: usuarios,
      fechaInicial: new Date(Date.now()).toISOString(), //Para que al momento de guardar un grupo se guarde desde la fecha que se creo.
    });
    
    console.log(nuevoGrupo, 'nuevoogrupoo');
    
    const grupoGuardado = await nuevoGrupo.save();

    await grupoGuardado.populate('usuarios');
    await grupoGuardado.populate('turno');

    return response.status(201).json(grupoGuardado);

   
});

//eliminar grupos creados
gruposRouter.delete('/:id', async (request, response) => {
  const user = request.user;

  await grupo.findByIdAndDelete(request.params.id);

  return response.sendStatus(200);
});


module.exports = gruposRouter;
