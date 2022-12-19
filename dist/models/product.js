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
exports.ProductStore = void 0;
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
const database_1 = __importDefault(require("../database"));
class ProductStore {
    // RESTful CRUD Operations
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "SELECT * FROM products"; // Defining the SQL query
                const result = yield connection.query(sql); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't retrive Products: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "SELECT name, type, quantity FROM products WHERE id=$1"; // Defining the SQL query
                const result = yield connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows[0]; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't retrive Product whose's id=${id}: ${err}`);
            }
        });
    }
    create(productInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = productInfo.name;
            const type = productInfo.type;
            const quantity = productInfo.quantity;
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "INSERT INTO products (name, type, quantity) VALUES ($1, $2 , $3) RETURNING id, name, type, quantity"; // Defining the SQL query
                const result = yield connection.query(sql, [name, type, quantity]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows[0]; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't add Product: ${err}`);
            }
        });
    }
    update(id, modify, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "UPDATE products SET " +
                    modify +
                    "=$1 WHERE id=$2 RETURNING name , type , quantity"; // Defining the SQL query
                const result = yield connection.query(sql, [newValue, id]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows[0]; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't update Product who's id=${id}: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "DELETE FROM products WHERE id=($1)"; // Defining the SQL query
                const result = yield connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't update Product who's id=${id}: ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
