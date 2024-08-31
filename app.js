require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const exp = require('constants');
const loginRouter = require('./controllers/login');
const { userExtractor } = require('./middleware/auth');
const scheduleRouter = require('./controllers/schedule');
const turnosRouter = require('./controllers/turnos');
const gruposRouter = require('./controllers/grupos');
const signOutRouter = require('./controllers/signOut');

( async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL_TEST);
        console.log('conectado a Mongo DB');
    } catch (error) {
        console.log(error);
    }

})();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//rutas del frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/scheduleflex', express.static(path.resolve('views', 'scheduleflex')));
app.use('/crearTurno', express.static(path.resolve('views', 'crearTurno')));
app.use('/crearGrupo', express.static(path.resolve('views', 'crearGrupo')));
app.use('/verHorario', express.static(path.resolve('views', 'verHorario')));
app.use('/imagen', express.static(path.resolve('imagen')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));


//Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/signOut', signOutRouter);
app.use('/api/scheduleflex', userExtractor , scheduleRouter);
app.use('/api/crearTurno', userExtractor , turnosRouter);
app.use('/api/crearGrupo', userExtractor , gruposRouter);

app.use(morgan('tiny'));

module.exports = app;