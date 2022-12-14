"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = __importDefault(require("./handlers/order"));
const product_1 = __importDefault(require("./handlers/product"));
const user_1 = __importDefault(require("./handlers/user"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
(0, user_1.default)(app);
(0, product_1.default)(app);
(0, order_1.default)(app);
app.listen(3000, () => {
    console.log("Server Running On Port 3000");
});
