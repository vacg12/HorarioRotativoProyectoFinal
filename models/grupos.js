const mongoose = require('mongoose');

const grupoSchema = new mongoose.Schema({
    nombre: String,
    dias: [String], // Array de días de la semana (o fechas)
    turno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turno'
    },
    usuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    fechaInicial: Date, //Para que al momento de guardar un grupo se guarde desde la fecha que se creo.
});

grupoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      returnedObject.fechaInicial = returnedObject.fechaInicial?.toLocaleDateString() ?? null; //Para que moongose deje cambiarlo al horario actual del pais.
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });
const Grupo = mongoose.model('Grupo', grupoSchema);

module.exports = Grupo;