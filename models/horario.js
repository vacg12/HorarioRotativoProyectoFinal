const mongoose = require('mongoose');

//horario se refiere a los turnos

const turnoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
});

turnoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

const Turno = mongoose.model('Turno', turnoSchema);

module.exports = Turno;