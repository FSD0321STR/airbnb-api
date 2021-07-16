const ServicesAlojamiento = require('../services/ServicesAlojamiento');
const AlojamientoService = require('../services/AlojamientoService');
const Multer = require('multer')
const upload = Multer({ dest: "uploads/" });
const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const router = Router();


router.post('/createalojamiento', upload.array('files', 6), async(req, res) => {
    //console.log(req.files);
    //console.log(req.body);
    const arrayFiles = [];
    //const newAlojamiento = req.body;
    //console.log(newAlojamiento);
    // //const rol = 'user';
    //const activo = true;
    req.files.forEach(file => {
        const image = {
            name: file.originalname,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/../../uploads/' + file.filename)),
                contentType: file.mimetype,
            }
        }
        arrayFiles.push(image);
    });

    //req.body.rol = rol;
    //req.body.activo = activo;
    req.body.files = arrayFiles;
    //console.log(req.body.files);

    const alojamiento = await ServicesAlojamiento.registerAlojamiento(req.body);
    if (!alojamiento) {
        return res.status(403).json({ messageError: "Este alojamiento ya existe" });
    }
    const alojamientoId = { id: alojamiento._id };
    return res.status(201).json({ alojamientoId: alojamientoId, messageOk: "El alojamiento ha sido creado con éxito" });
});

router.patch('/alojamiento/:id', upload.array('files', 6), async(req, res) => {
    const { id } = req.params;
    //console.log(req.files[0].filename);

    if (req.files !== undefined) {
        const files = {
            name: req.files[0].originalname,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/../../uploads/' + req.files[0].filename)),
                contentType: req.files[0].mimetype,
            }
        }
        req.body.files = files;
    }

    const alojamiento = await ServicesAlojamiento.editAlojamiento(req.body, id);

    if (!alojamiento) {
        return res.status(403).json({ messageError: "No existe un alojamiento con esta id." });
    }
    return res.status(200).json({ messageOk: "Alojamiento modificado con éxito" });
});



router.get('/alojamientos', async(req, res) => {
    const alojamientos = await AlojamientoService.ReadAllAlojamiento();

    if (!alojamientos) {
        return res.status(404).json({ message: "No existen alojamientos en la base de datos" });
    }
    return res.status(200).json({ alojamientos });
});

router.get('/search-alojamientos/:search', async(req, res) => {
    const { search } = req.params;

    const alojamientos = await AlojamientoService.searchAlojamientos(search);
    //console.log(alojamientos);

    if (!alojamientos) {
        return res.status(404).json({ message: "No existen alojamientos en la base de datos" });
    }
    return res.status(200).json({ alojamientos });
});

router.get('/alojamiento/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(id);
    const alojamiento = await AlojamientoService.findByIdAlojamiento(id);

    if (!alojamiento) {
        return res.status(404).json({ message: "No existe un alojamiento con esta id." });
    }
    return res.status(200).json({ alojamiento });
});

router.get('/alojamientos-user/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(id);
    const alojamientos = await AlojamientoService.findAlojamientosUser(id);
    //console.log(alojamientos);
    if (!alojamientos) {
        return res.status(404).json({ message: "No existe un alojamiento con esta id." });
    }
    return res.status(200).json({ alojamientos });
});


router.delete('/alojamiento/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(id);
    const alojamiento = await ServicesAlojamiento.deleteAlojamiento(id);

    if (!alojamiento) {
        return res.status(404).json({ messageError: "No existe un alojamiento con esta id." });
    }
    return res.status(201).json({ messageOk: "El alojamiento se ha eliminado con éxito." });
});


module.exports = router;