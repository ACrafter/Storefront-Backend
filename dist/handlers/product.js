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
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_1 = __importDefault(require("../middlewares/Auth"));
dotenv_1.default.config();
const store = new product_1.ProductStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store.index();
        res.json(result);
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Show Product: ${err}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store.show(req.params.id);
        res.json(result);
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Show Product: ${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const quantity = Number(req.body.quantity);
        const type = req.body.type;
        const result = yield store.create({ name, quantity, type });
        res.json(result);
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Create Product: ${err}`);
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
        throw new Error(`Error Couldn't Update Product: ${err}`);
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
        throw new Error(`Error Couldn't Delete Product: ${err}`);
    }
});
const productsRoutes = (app) => {
    app.get("/products", index);
    app.post("/products", Auth_1.default, create);
    app.get("/products/:id", show);
    app.patch("/products/:id", Auth_1.default, update);
    app.delete("/products/:id", Auth_1.default, del);
};
exports.default = productsRoutes;
