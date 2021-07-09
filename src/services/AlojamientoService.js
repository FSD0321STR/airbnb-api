const { Alojamiento } = require('../models/mongoose');

const createAlojamiento = (fields) => {
    return new Alojamiento(fields).save();
};

const existsAlojamiento = (id) => {
    return Alojamiento.exists({ _id: id });
};

const findByIdAlojamiento = (id) => {
    return Alojamiento.findById(id);
};

const ReadAllAlojamiento = () => {
    return Alojamiento.find({}, { files: false })
}

module.exports = {
    createAlojamiento,
    existsAlojamiento,
    findByIdAlojamiento,
    ReadAllAlojamiento,
}