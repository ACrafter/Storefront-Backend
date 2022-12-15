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
exports.UserStore = void 0;
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = String(process.env.SECRET);
const salt = Number(process.env.SALT_ROUNDS);
class UserStore {
    // RESTful CRUD Operations
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "SELECT * FROM users"; // Defining the SQL query
                const result = yield connection.query(sql); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't retrive users: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "SELECT username, firstname, status FROM users WHERE id=$1"; // Defining the SQL query
                const result = yield connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows[0]; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't retrive user whose's id=${id}: ${err}`);
            }
        });
    }
    create(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = userInfo.username;
            const firstname = userInfo.firstname;
            const password = bcrypt_1.default.hashSync(`${userInfo.pass}${pepper}`, salt);
            const status = userInfo.status;
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "INSERT INTO users (username, firstname, pass, status) VALUES ($1, $2 , $3, $4) RETURNING id, username, firstname ,status"; // Defining the SQL query
                const result = yield connection.query(sql, [
                    username,
                    firstname,
                    password,
                    status,
                ]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows[0]; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't add user: ${err}`);
            }
        });
    }
    update(id, modify, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "UPDATE users SET " +
                    modify +
                    "=$1 WHERE id=$2 RETURNING username, firstname ,status"; // Defining the SQL query
                const result = yield connection.query(sql, [newValue, id]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows[0]; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't update user who's id=${id}: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "DELETE FROM users WHERE id=($1)"; // Defining the SQL query
                const result = yield connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't update user who's id=${id}: ${err}`);
            }
        });
    }
    // Speical Model Operations
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "SELECT pass FROM users WHERE username=($1)";
            const result = yield conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.pass)) {
                    return user;
                }
            }
            return null;
        });
    }
    getVIP() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "SELECT username, firstname, status FROM users WHERE status='VIP'"; // Defining the SQL query
                const result = yield connection.query(sql); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't get Sellers: ${err}`);
            }
        });
    }
    getFrequent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "SELECT username, firstname FROM users WHERE status='Frequent'"; // Defining the SQL query
                const result = yield connection.query(sql); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't get Frequent users: ${err}`);
            }
        });
    }
    getNone() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect(); // Opening the connection
                const sql = "SELECT username, firstname FROM users WHERE status='None'"; // Defining the SQL query
                const result = yield connection.query(sql); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows; // Returning the result
            }
            catch (err) {
                throw new Error(`Couldn't get None Frequent users: ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
