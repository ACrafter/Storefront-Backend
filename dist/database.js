"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { HOST, DB, TESTDB, USER, PASS, ENV } = process.env;
let Client;
if (ENV === "dev") {
    Client = new pg_1.Pool({
        host: HOST,
        database: DB,
        user: USER,
        password: PASS,
    });
}
else {
    Client = new pg_1.Pool({
        host: HOST,
        database: TESTDB,
        user: USER,
        password: PASS,
    });
}
exports.default = Client;
