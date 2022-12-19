"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const Auth = (req, res, next) => {
    try {
        const token = req.body.token;
        (0, jsonwebtoken_1.verify)(token, String(process.env.TOKEN));
        next();
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
    }
};
exports.default = Auth;
