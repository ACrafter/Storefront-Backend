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
const product_1 = require("../models/product");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new product_1.ProductStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.index();
    res.json(result);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.show(req.params.id);
    res.json(result);
    res.send();
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.body.token;
        const token = authorizationHeader.split(' ')[1];
        (0, jsonwebtoken_1.verify)(token, String(process.env.TOKEN));
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
    const name = req.body.name;
    const quantity = Number(req.body.quantity);
    const type = req.body.type;
    const result = yield store.create({ name, quantity, type });
    res.json(result);
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
const productsRoutes = (app) => {
    app.get("/products", index);
    app.post("/products", create);
    app.get("/products/:id", show);
    app.patch("/products/:id", update);
    app.delete("/products/:id", del);
};
exports.default = productsRoutes;
