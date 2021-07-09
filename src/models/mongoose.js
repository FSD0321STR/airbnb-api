require('dotenv').config();
const Ajv = require('ajv');
const ajv = new Ajv();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const { encryptPassword } = require('../helpers/password');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Tipos = mongoose.model('Tipos', {
    title: String,
    visible: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Servicios = mongoose.model('Servicios', {
    title: String,
    visible: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    rol: String,
    activo: Boolean,
    image: {
        name: String,
        img: {
            data: Buffer,
            contentType: String,
        }
    },
    alojamientos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alojamientos'
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await encryptPassword(user.password); // encrypt;
    }
    next();
});

const alojamientoSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    location: String,
    state: String,
    country: String,
    type: String,
    numberGuests: Number,
    services: String,
    description: String,

    // files: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Galery'
    // }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Alojamiento = mongoose.model('Alojamiento', alojamientoSchema);

module.exports = {
    User,
    Tipos,
    Servicios,
    Alojamiento,
}