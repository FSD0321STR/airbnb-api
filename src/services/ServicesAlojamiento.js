const AlojamientoService = require('./AlojamientoService');
const { Alojamiento } = require('../models/mongoose');

const registerAlojamiento = async({ name, phone, email, address, location, state, country, type, numberGuests, services, description, files }) => {

    let alojamiento = await AlojamientoService.findById(id);
    if (!alojamiento) {
        return false;
    }
    alojamiento = await AlojamientoService.create({ name, phone, email, address, location, state, country, type, numberGuests, services, description, files });
    return alojamiento;
}

const editAlojamiento = async(editAlojamiento, id) => {
    let alojamiento = await AlojamientoService.findById(id);
    if (alojamiento) {
        const filter = { _id: id };
        const update = {
            name: editAlojamiento.name,
            phone: editAlojamiento.phone,
            email: editAlojamiento.email,
            address: editAlojamiento.address,
            location: editAlojamiento.location,
            state: editAlojamiento.state,
            country: editAlojamiento.country,
            type: editAlojamiento.type,
            numberGuests: editAlojamiento.numberGuests,
            services: editAlojamiento.services,
            description: editAlojamiento.description,
            files: editAlojamiento.files,
        };
        if (editAlojamiento.files === undefined) delete update.files;
    
        await Alojamiento.findOneAndUpdate(filter, update);
        return true;
    }
    return false;
}

const deleteAlojamiento = async(id) => {
    let alojamiento = await AlojamientoService.findById(id);
    if (alojamiento) {
        await Alojamiento.deleteOne({ _id: id });
        return true;
    }
    return false;
}


module.exports = {
    registerAlojamiento,
    editAlojamiento,
    deleteAlojamiento,
}