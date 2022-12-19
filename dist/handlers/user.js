"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_1 = __importDefault(require("../middlewares/Auth"));
const store = new user_1.UserStore();
dotenv_1.default.config();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store.index();
        res.json(result);
    }
    catch (err) {
        res.status(203);
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Get Users: ${err}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store.show(req.params.id);
        res.json(result);
        res.send();
    }
    catch (err) {
        res.status(203);
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Get User: ${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uName = req.body.uName;
        const fName = req.body.fName;
        const status = req.body.status;
        const password = req.body.password;
        yield store.create({
            username: uName,
            firstname: fName,
            pass: password,
            status,
        });
        const token = (0, jsonwebtoken_1.sign)(password, String(process.env.TOKEN));
        res.json(token);
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Create User: ${err}`);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modify = req.body.prop;
        const newValue = req.body.value;
        const id = req.params.id;
        const result = yield store.update(id, modify, newValue);
        res.json(result);
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Update User: ${err}`);
    }
});
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield store.delete(id);
        res.json(result);
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Delete User: ${err}`);
    }
});
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uName = req.body.uName;
        const pass = req.body.pass;
        const result = yield store.authenticate(uName, pass);
        const x = null;
        if (typeof result !== typeof x) {
            const token = (0, jsonwebtoken_1.sign)(pass, String(process.env.TOKEN));
            res.json(token);
        }
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Login User: ${err}`);
    }
});
const userRoutes = (app) => {
    app.get("/users", Auth_1.default, index);
    app.get("/users/login", auth);
    app.post("/users", create);
    app.get("/users/:id", Auth_1.default, show);
    app.patch("/users/:id", Auth_1.default, update);
    app.delete("/users/:id", Auth_1.default, del);
};
exports.default = userRoutes;
