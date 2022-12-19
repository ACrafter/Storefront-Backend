"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Auth = (req, res, next) => {
    try {
        const token = req.body.token;
        (0, jsonwebtoken_1.verify)(token, String(process.env.TOKEN));
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
    }
};
exports.default = Auth;
