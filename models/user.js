const mongoose = require('mongoose');

//Tabla o schema que tiene las propiedades de lo que se guardara
const userSchema = new mongoose.Schema({
 name: String,
 email: String,
 passwordH: String,
 rol: {
  type: String,
  default: 'user'
 },

 verified: {
    type: Boolean,
    default: false   
 },
 grupo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Grupo'
},
 turnos: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Turno'
}]
});

//Respuesta del usuario guardado
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordH;
  }
});

//Se le da un nombre para usar los datos de la tabla
const User = mongoose.model('User', userSchema);

module.exports = User;