const TipoAlojamientoService = require('../services/TipoAlojamientoService');
const TipoService = require('../services/TipoService');
const { Router } = require('express');
const router = Router();

router.get('/tipos-alojamiento', async(req, res) => {
    //console.log('aa');
    const tipos = await TipoService.readAll();
    if (!tipos) {
        return res.status(404).json({ message: "No existen tipos de alojamientos en la base de datos" });
    }
    return res.status(200).json({ tipos });
});

router.get('/tipo-alojamiento/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(id);
    //console.log('aa');
    const tipos = await TipoService.findById(id);
    if (!tipos) {
        return res.status(404).json({ message: "No existen un tipo de alojamiento con esta id" });
    }
    return res.status(200).json({ tipos });
});

router.post('/create-tipo-alojamiento', async(req, res) => {
    //console.log(req.body);
    const visible = true;
    req.body.visible = visible;
    const tipo = await TipoAlojamientoService.createTipo(req.body);
    if (!tipo) {
        return res.status(403).json({ messageError: "Este tipo de alojamiento ya existe" });
    }
    return res.status(201).json({ messageOk: "Tipo de alojamiento creado" });
});

router.patch('/modify-tipo-visible/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(req.body);
    // const visible = true;
    // req.body.visible = visible;
    const tipo = await TipoAlojamientoService.editVisibleTipo(req.body, id);
    if (!tipo) {
        return res.status(403).json({ messageError: "El tipo de alojamiento no se ha podido modificar" });
    }
    return res.status(200).json({ messageOk: "Tipo de alojamiento modificado" });
});

router.patch('/tipo-alojamiento/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(req.body);
    const tipoAlojamiento = await TipoAlojamientoService.editTipo(req.body, id);
    if (!tipoAlojamiento) {
        return res.status(404).json({ messageError: "No existe un usuario con esta id." });
    }
    return res.status(201).json({ messageOk: "Usuario modificado con éxito." });
});

router.delete('/tipo-alojamiento/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(id);
    const tipo = await TipoAlojamientoService.deleteTipoAlojamiento(id);
    if (!tipo) {
        return res.status(404).json({ messageError: "No existe un tipo de alojamiento con esta id." });
    }
    return res.status(201).json({ messageOk: "Tipo de alojamiento eliminado con éxito." });
});


module.exports = router;