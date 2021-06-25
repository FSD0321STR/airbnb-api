require('dotenv').config();
const Ajv = require('ajv');
const ajv = new Ajv();
const mongoose = require('mongoose');
const { encryptPassword } = require('../helpers/password');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Task = mongoose.model('Task', {
    title: String,
    completed: { type: Boolean, default: false },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Board = mongoose.model('Board', {
    title: String,
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    image: {
        name: String,
        img: {
            data: Buffer,
            contentType: String,
        }
    },
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await encryptPassword(user.password); // encrypt;
    }
    next();
});

const User = mongoose.model('User', userSchema);

const taskCreateSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        board: { type: "string" },
    },
    required: ["title", "board"],
    additionalProperties: false
};


const taskUpdateSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        completed: { type: "boolean" },
        board: { type: "string" },
    },
    required: ["title", "completed"],
    additionalProperties: false
};


const taskPatchSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        completed: { type: "boolean" },
    },
    required: [],
    additionalProperties: false
};

const boardSchema = {
    type: "object",
    properties: {
        title: { type: "string" }
    },
    required: ["title"],
    additionalProperties: false
};


validateTask = (document, method) => {
    switch (method) {
        case 'POST':
            return ajv.validate(taskCreateSchema, document);
        case 'PUT':
            return ajv.validate(taskUpdateSchema, document);;
        case 'PATCH':
            return ajv.validate(taskPatchSchema, document);;
    }
}

validateBoard = (document) => {
    return ajv.validate(boardSchema, document);
}

module.exports = {
    Task,
    Board,
    User,
    validateTask,
    validateBoard,
}