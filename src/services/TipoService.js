const { Tipos: Tipos } = require('../models/mongoose');

const create = (fields) => {
    return new Tipos(fields).save();
};

const exists = (title) => {
    return Tipos.exists({ title: title });
};

const findByEmail = (email) => {
    return Tipos.findOne({ email });
};

const findById = (id) => {
    return Tipos.findById(id);
};

const readAll = () => {
    return Tipos.find({});
}

const adminReadAll = () => {
    return Tipos.find({}, { image: false })
}

module.exports = {
    create,
    exists,
    findByEmail,
    findById,
    readAll,
    adminReadAll,
}