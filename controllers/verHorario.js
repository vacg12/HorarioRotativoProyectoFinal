const verHorarioRouter = require('express').Router();

const Grupo = require('../models/grupos');

verHorarioRouter.get('/', async (request, response) => {

  try {
    const user = request.user;
    const { turno, dias } = request.query; // Obtener parámetros de consulta

    // Construir la consulta
    const query = {};
    if (turno) query.turno = turno;
    if (dias) query.dias = dias;

    // Encontrar grupos y poblar
    const grupos = await Grupo.find(query).populate('usuarios').populate('turno');

    return response.status(200).json(grupos);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Error al obtener los grupos' });
  }
    
});

module.exports = verHorarioRouter;