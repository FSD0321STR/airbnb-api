const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');
const Multer = require('multer')
const upload = Multer({ dest: "uploads/" });
const { Router } = require('express');
const { createToken } = require('../helpers/token');
const fs = require('fs');
const path = require('path');

const router = Router();

router.post('/register', upload.single('image'), async(req, res) => {
    const rol = 'user';
    const activo = true;
    const image = {
        name: req.file.originalname,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/../../uploads/' + req.file.filename)),
            contentType: req.file.mimetype,
        }
    }
    req.body.rol = rol;
    req.body.activo = activo;
    req.body.image = image;
    
    const user = await AuthService.register(req.body);
    if (!user) {
        return res.status(403).json({ message: "The email is already in use" });
    }
    const token = await createToken({ id: user._id }); // generar token;
    const userId = { id: user._id };
    return res.status(201).json({ token: token, userId: userId });
});

router.post('/login', async(req, res) => {
    const user = await AuthService.login(req.body);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createToken({ id: user._id }); // generar token;
    const userId = { id: user._id };
    const rol = { rol: user.rol };
    return res.status(200).json({ token: token, userId: userId, rol: rol });
});

router.get('/user/:id', async(req, res) => {
    const { id } = req.params;
    const user = await UserService.findById(id);
    //console.log(user);
    if (!user) {
        return res.status(404).json({ message: "No existe un usuario con esta id" });
    }
    return res.status(200).json({ user });
});

router.get('/users', async(req, res) => {
    const users = await UserService.adminReadAll();
    //console.log(user);
    if (!users) {
        return res.status(404).json({ message: "No existen usuarios en la base de datos" });
    }
    return res.status(200).json({ users });
});

router.patch('/user/:id', upload.single('image'), async(req, res) => {
    const { id } = req.params;

    if (req.file !== undefined) {
        const image = {
            name: req.file.originalname,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/../../uploads/' + req.file.filename)),
                contentType: req.file.mimetype,
            }
        }
        req.body.image = image;
    }

    const user = await AuthService.editUser(req.body, id);
    if (!user) {
        return res.status(404).json({ messageError: "No existe un usuario con esta id." });
    }
    //const token = await createToken({ id: user._id }); // generar token;
    //const userId = { id: user._id };
    return res.status(201).json({ messageOk: "Usuario modificado con éxito." });
});

router.delete('/user/:id', async(req, res) => {
    const { id } = req.params;
    //console.log(id);
    const user = await AuthService.deleteUser(id);
    if (!user) {
        return res.status(404).json({ messageError: "No existe un usuario con esta id." });
    }
    return res.status(201).json({ messageOk: "Usuario eliminado con éxito." });
});

module.exports = router;