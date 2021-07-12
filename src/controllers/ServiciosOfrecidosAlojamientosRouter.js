const ServiciosAlojamientoService = require('../services/ServiciosAlojamientoService');
const ServiciosService = require('../services/ServiciosService');
const { Router } = require('express');
const router = Router();

router.get('/servicios-alojamiento', async(req, res) => {
    //console.log('aa');
    const servicios = await ServiciosService.readAll();
    if (!servicios) {
        return res.status(404).json({ message: "No existen servicios de alojamientos en la base de datos" });
    }
    return res.status(200).json({ servicios: servicios });
});

router.get('/servicio-alojamiento/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(id);
    //console.log('aa');
    const servicios = await ServiciosService.findById(id);
    if (!servicios) {
        return res.status(404).json({ message: "No existen un tipo de alojamiento con esta id" });
    }
    return res.status(200).json({ servicios: servicios });
});

router.post('/create-servicio-alojamiento', async(req, res) => {
    //console.log(req.body);
    const visible = true;
    req.body.visible = visible;
    const servicio = await ServiciosAlojamientoService.createServicio(req.body);
    if (!servicio) {
        return res.status(403).json({ messageError: "Este servicio de alojamiento ya existe" });
    }
    return res.status(201).json({ messageOk: "Servicio de alojamiento creado" });
});

router.patch('/modify-servicio-visible/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(req.body);
    // const visible = true;
    // req.body.visible = visible;
    const servicio = await ServiciosAlojamientoService.editVisibleServicio(req.body, id);
    if (!servicio) {
        return res.status(403).json({ messageError: "El servicio de alojamiento no se ha podido modificar" });
    }
    return res.status(200).json({ messageOk: "Servicio de alojamiento modificado" });
});

router.patch('/servicio-alojamiento/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(req.body);
    const servicioAlojamiento = await ServiciosAlojamientoService.editServicio(req.body, id);
    if (!servicioAlojamiento) {
        return res.status(404).json({ messageError: "No existe un servicio con esta id." });
    }
    return res.status(201).json({ messageOk: "Servicio modificado con éxito." });
});

router.delete('/servicio-alojamiento/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(id);
    const servicio = await ServiciosAlojamientoService.deleteServicioAlojamiento(id);
    if (!servicio) {
        return res.status(404).json({ messageError: "No existe un servicio de alojamiento con esta id." });
    }
    return res.status(201).json({ messageOk: "Servicio de alojamiento eliminado con éxito." });
});


module.exports = router;