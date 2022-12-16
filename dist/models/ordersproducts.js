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
exports.OrderProductStore = void 0;
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
const database_1 = __importDefault(require("../database"));
class OrderProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "SELECT * FROM ordersproducts"; // Defining the SQL query
                const result = yield connection.query(sql); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't retrive orders: ${err}`);
            }
        });
    }
    create(x) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderid = x.orderid;
            const productid = x.productid;
            const quantity = x.quantity;
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "INSERT INTO ordersproducts orderid, productid, quantity VALUES ($1, $2, $3) RETURNING *"; // Defining the SQL query
                const result = yield connection.query(sql, [orderid, productid, quantity]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't retrive Orders-Products: ${err}`);
            }
        });
    }
    update(id, modify, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "UPDATE ordersproducts SET " +
                    modify +
                    "=$1 WHERE id=$2 RETURNING *"; // Defining the SQL query
                const result = yield connection.query(sql, [newValue, id]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows[0]; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't update id=${id}: ${err}`);
            }
        });
    }
}
exports.OrderProductStore = OrderProductStore;
