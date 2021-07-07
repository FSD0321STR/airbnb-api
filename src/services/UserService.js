const { User } = require('../models/mongoose');

const create = (fields) => {
    return new User(fields).save();
};

const exists = (id) => {
    return User.exists({ _id: id });
};

const findByEmail = (email) => {
    return User.findOne({ email });
};

const findById = (id) => {
    return User.findById(id);
};

const readAll = () => {
    return User.find({});
}

const adminReadAll = () => {
    return User.find({}, { image: false })
}

module.exports = {
    create,
    exists,
    findByEmail,
    findById,
    readAll,
    adminReadAll,
}