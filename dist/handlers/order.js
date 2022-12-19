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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store.index();
    res.json(result);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store.show(req.params.id);
        res.json(result);
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Show Order: ${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.body.userid;
        const weight = Number(req.body.weight);
        const status = req.body.status;
        const result = yield store.create({ userid, weight, status });
        res.json(result);
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Create Order: ${err}`);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modify = req.body.prop;
        const newValue = req.body.value;
        const id = req.params.id;
        const result = yield store.update(modify, newValue, id);
        res.json(result);
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Update Order: ${err}`);
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
        throw new Error(`Error Couldn't Delete Order: ${err}`);
    }
});
const userOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield store.getOrdersByUser(id);
        res.json(result);
    }
    catch (err) {
        res.send(`Error: ${err}`);
        throw new Error(`Error Couldn't Get Orders: ${err}`);
    }
});
const ordersRoutes = (app) => {
    app.get("/orders", index);
    app.post("/orders", create);
    app.get("/orders/:id", show);
    app.patch("/orders/:id", update);
    app.delete("/orders/:id", del);
    app.delete("/orders/user/:id", userOrders);
};
exports.default = ordersRoutes;
