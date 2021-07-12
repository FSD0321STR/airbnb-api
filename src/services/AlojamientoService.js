const { Alojamiento, User } = require('../models/mongoose');

const createAlojamiento = async(fields) => {
    const alojamiento = await new Alojamiento(fields).save();
    await User.findByIdAndUpdate(alojamiento.userId, { $push: { alojamientos: alojamiento.id } });
    return alojamiento;
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

const findAlojamientosUser = (id) => {
    return Alojamiento.find({ userId: id });
}

module.exports = {
    createAlojamiento,
    existsAlojamiento,
    findByIdAlojamiento,
    ReadAllAlojamiento,
    findAlojamientosUser,
}