require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./database');

const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 //
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/persons', db.getPerson);
app.get('/person/:id', db.getPersonById);
app.post('/addPerson', db.createPerson);
app.get('/fathers', db.getPersonFather);
app.get('/father/:id_father', db.getPersonFatherById);
app.post('/addFather', db.createPersonFather);
app.get('/mothers', db.getPersonMother);
app.get('/mother/:id_mother', db.getPersonMotherById);
app.post('/addMother', db.createPersonMother);
app.get('/children', db.getPersonChildren);
app.get('/child/:id_child', db.getPersonChildrenById);
app.post('/addChild', db.createPersonChildren);

app.listen(process.env.PORT, function () {
    console.log('app listening at port %s', process.env.PORT);
});

module.exports = app
