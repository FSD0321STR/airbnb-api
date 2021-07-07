const ServiciosService = require('./ServiciosService');
const { Servicios: Servicios } = require('../models/mongoose');

const createServicio = async({ title, visible }) => {
    //console.log(email);
    let tipo = await ServiciosService.exists(title);
    if (tipo) {
        return false;
    }
    tipo = await ServiciosService.create({ title, visible });
    return tipo;
}

const editVisibleServicio = async(visibleTipo, id) => {
    let visible = true;
    if (visibleTipo.value === "true") {
        visible = false;
    } else {
        visible = true;
    }
    //console.log(visible);
    let tipo = await ServiciosService.findById(id);
    if (tipo) {
        const filter = { _id: id };
        const update = {
            visible: visible,
        };

        await Servicios.findOneAndUpdate(filter, update);
        return true;
    }
    return false;
}

const deleteServicioAlojamiento = async(id) => {
    //console.log(id);
    let servicio = await ServiciosService.findById(id);
    if (servicio) {
        await Servicios.deleteOne({ _id: id });
        return true;
    }
    return false;
}

const editServicio = async(editTipo, id) => {
    //console.log(editTipo.dataEditUser);
    let tipo = await ServiciosService.findById(id);
    if (tipo) {
        const filter = { _id: id };
        const update = {
            title: editTipo.dataEditUser,
        };

        await Servicios.findOneAndUpdate(filter, update);
        return true;
    }
    return false;
}

module.exports = {
    createServicio,
    editVisibleServicio,
    deleteServicioAlojamiento,
    editServicio,
}