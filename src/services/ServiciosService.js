const { Servicios: Servicios } = require('../models/mongoose');

const create = (fields) => {
    return new Servicios(fields).save();
};

const exists = (title) => {
    return Servicios.exists({ title: title });
};

const findByEmail = (email) => {
    return Servicios.findOne({ email });
};

const findById = (id) => {
    return Servicios.findById(id);
};

const readAll = () => {
    return Servicios.find({});
}

const adminReadAll = () => {
    return Servicios.find({}, { image: false })
}

module.exports = {
    create,
    exists,
    findByEmail,
    findById,
    readAll,
    adminReadAll,
}