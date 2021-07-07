const TipoService = require('./TipoService');
const { Tipos: Tipos } = require('../models/mongoose');

const createTipo = async({ title, visible }) => {
    //console.log(email);
    let tipo = await TipoService.exists(title);
    if (tipo) {
        return false;
    }
    tipo = await TipoService.create({ title, visible });
    return tipo;
}

const editVisibleTipo = async(visibleTipo, id) => {
    let visible = true;
    if (visibleTipo.value === "true") {
        visible = false;
    } else {
        visible = true;
    }
    //console.log(visible);
    let tipo = await TipoService.findById(id);
    if (tipo) {
        const filter = { _id: id };
        const update = {
            visible: visible,
        };

        await Tipos.findOneAndUpdate(filter, update);
        return true;
    }
    return false;
}

const deleteTipoAlojamiento = async(id) => {
    //console.log(id);
    let tipo = await TipoService.findById(id);
    if (tipo) {
        await Tipos.deleteOne({ _id: id });
        return true;
    }
    return false;
}

const editTipo = async(editTipo, id) => {
    //console.log(editTipo.dataEditUser);
    let tipo = await TipoService.findById(id);
    if (tipo) {
        const filter = { _id: id };
        const update = {
            title: editTipo.dataEditUser,
        };

        await Tipos.findOneAndUpdate(filter, update);
        return true;
    }
    return false;
}

module.exports = {
    createTipo,
    editVisibleTipo,
    deleteTipoAlojamiento,
    editTipo,
}