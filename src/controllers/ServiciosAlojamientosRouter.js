const ServicesAlojamiento = require('../services/ServicesAlojamiento');
const AlojamientoService = require('../services/AlojamientoService');
const Multer = require('multer')
const upload = Multer({ dest: "uploads/" });
const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const router = Router();


router.post('/createalojamiento', async(req, res) => {
    //console.log('a');
    const newAlojamiento = req.body.dataAlojamiento;
    //const rol = 'user';
    //const activo = true;
    // const image = {
    //     name: req.file.originalname,
    //     img: {
    //         data: fs.readFileSync(path.join(__dirname + '/../../uploads/' + req.file.filename)),
    //         contentType: req.file.mimetype,
    //     }
    // }
    // req.body.rol = rol;
    // req.body.activo = activo;
    // req.body.image = [{ image }];

    const alojamiento = await ServicesAlojamiento.registerAlojamiento(newAlojamiento);
    if (!alojamiento) {
        return res.status(403).json({ messageError: "Este alojamiento ya existe" });
    }
    const alojamientoId = { id: alojamiento._id };
    return res.status(201).json({ alojamientoId: alojamientoId, messageOk: "El alojamiento ha sido creado con éxito" });
});

router.patch('/alojamiento/:id', upload.array('image'), async(req, res) => {
    const { id } = req.params;

    if (req.file !== undefined) {
        const image = {
            name: req.file.originalname,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/../../uploads/' + req.file.filename)),
                contentType: req.file.mimetype,
            }
        }
        req.body.image = [{ image }];
    }

    const alojamiento = await ServicesAlojamiento.editAlojamiento(req.body, id);

    if (!alojamiento) {
        return res.status(403).json({ messageError: "No existe un alojamiento con esta id." });
    }
    return res.status(200).json({ messageOk: "Alojamiento modificado con éxito" });
});



router.get('/alojamiento', async(req, res) => {
    const alojamientos = await AlojamientoService.ReadAllAlojamiento();

    if (!alojamientos) {
        return res.status(404).json({ message: "No existen alojamientos en la base de datos" });
    }
    return res.status(200).json({ alojamientos });
});

router.get('/alojamiento/:id', async(req, res) => {
    const { id } = req.params;
    const alojamientos = await AlojamientoService.findByIdAlojamiento(id);

    if (!alojamientos) {
        return res.status(404).json({ message: "No existe un alojamiento con esta id." });
    }
    return res.status(200).json({ alojamientos });
});


router.delete('/alojamiento/:id', async(req, res) => {
    const { id } = req.params;
    const alojamiento = await ServicesAlojamiento.deleteAlojamiento(id);

    if (!alojamiento) {
        return res.status(404).json({ messageError: "No existe un alojamiento con esta id." });
    }
    return res.status(201).json({ messageOk: "El alojamiento se ha eliminado con éxito." });
});


module.exports = router;