const express = require('express');
require('express-async-errors');
const cors = require('cors');

const app = express();
const port = 8000;
//const port = process.env.PORT || 8000;


const AuthRouter = require('./controllers/AuthRouter');
const TipoAlojamientosRouter = require('./controllers/TipoAlojamientosRouter');
const ServiciosAlojamientosRouter = require('./controllers/ServiciosAlojamientosRouter');

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AuthRouter);
app.use(TipoAlojamientosRouter);
app.use(ServiciosAlojamientosRouter);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));