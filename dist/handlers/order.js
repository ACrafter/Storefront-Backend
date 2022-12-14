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
    const result = yield store.show(req.params.id);
    res.json(result);
    res.send();
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = req.body.name;
    const weight = Number(req.body.quantity);
    const status = req.body.status;
    const result = yield store.create({ userid, weight, status });
    res.json(result);
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const modify = req.body.prop;
    const newValue = req.body.value;
    const id = req.params.id;
    const result = yield store.update(modify, newValue, id);
    res.json(result);
});
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield store.delete(id);
    res.json(result);
});
const ordersRoutes = (app) => {
    app.get("/orders", index);
    app.post("/orders", create);
    app.get("/orders/:id", show);
    app.patch("/orders/:id", update);
    app.delete("/orders/:id", del);
};
exports.default = ordersRoutes;
