const UserService = require('./UserService');
const { User } = require('../models/mongoose');
const { comparePasswords } = require('../helpers/password');

const register = async({ name, lastName, rol, activo, phone, email, password, image }) => {
    //console.log(image);
    let user = await UserService.findByEmail(email);
    if (user) {
        return false;
    }
    user = await UserService.create({ name, lastName, rol, activo, phone, email, password, image });
    return user;
}

const editUser = async(editUser, id) => {

    let user = await UserService.findById(id);
    if (user) {
        const filter = { _id: id };
        const update = {
            name: editUser.name,
            lastName: editUser.lastName,
            phone: editUser.phone,
            email: editUser.email,
            password: editUser.password,
            image: editUser.image,
        };
        if (editUser.image.img === undefined) delete update.image;
        if (editUser.password === "") delete update.password;

        await User.findOneAndUpdate(filter, update);
        return true;
    }
    return false;
}

const deleteUser = async(id) => {
    console.log(id);
    let user = await UserService.findById(id);
    if (user) {
        await User.deleteOne({ _id: id });
        return true;
    }
    return false;
}

const login = async({ email, password }) => {

    const user = await UserService.findByEmail(email);
    if (user) {
        const equalPasswords = await comparePasswords({
            plain: password,
            hash: user.password,
        });
        if (equalPasswords) {
            return user;
        }
    }
    return false;
}

module.exports = {
    register,
    editUser,
    deleteUser,
    login,
}