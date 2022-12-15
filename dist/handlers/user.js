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
const store = new user_1.UserStore();
dotenv_1.default.config();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.body.token;
        const token = authorizationHeader.split(" ")[1];
        (0, jsonwebtoken_1.verify)(token, String(process.env.TOKEN));
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
    }
    const result = yield store.index();
    res.json(result);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.body.token;
        const token = authorizationHeader.split(" ")[1];
        (0, jsonwebtoken_1.verify)(token, String(process.env.TOKEN));
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
    }
    const result = yield store.show(req.params.id);
    res.json(result);
    res.send();
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.body.token;
        const token = authorizationHeader.split(" ")[1];
        (0, jsonwebtoken_1.verify)(token, String(process.env.TOKEN));
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
    }
    const modify = req.body.prop;
    const newValue = req.body.value;
    const id = req.params.id;
    const result = yield store.update(id, modify, newValue);
    res.json(result);
});
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield store.delete(id);
    res.json(result);
});
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uName = req.body.uName;
    const pass = req.body.pass;
    const result = yield store.authenticate(uName, pass);
    const x = null;
    if (typeof result !== typeof x) {
        const token = (0, jsonwebtoken_1.sign)(pass, String(process.env.TOKEN));
        res.json(token);
    }
});
const userRoutes = (app) => {
    app.get("/users", index);
    app.get("/users/login", auth);
    app.post("/users", create);
    app.get("/users/:id", show);
    app.patch("/users/:id", update);
    app.delete("/users/:id", del);
};
exports.default = userRoutes;
