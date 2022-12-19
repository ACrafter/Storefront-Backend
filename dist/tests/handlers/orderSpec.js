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
const supertest_1 = __importDefault(require("supertest"));
const order_1 = __importDefault(require("../../handlers/order"));
const user_1 = __importDefault(require("../../handlers/user"));
const __1 = __importDefault(require("../.."));
const request = (0, supertest_1.default)(__1.default);
(0, order_1.default)(__1.default);
(0, user_1.default)(__1.default);
describe("Order Routes", () => {
    let loginToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/users")
            .send({
            uName: "name",
            fName: "fName",
            password: "qwerty",
            status: "None",
        });
        loginToken = response.body;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request.delete("/users/1");
    }));
    describe('Unauthnicated Users', () => {
        it("Create Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post("/orders")
                .send({ status: "Active", userid: "1", weight: 100 });
            expect(response.status).toEqual(401);
        }));
        it("Index Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/orders");
            expect(response.status).toEqual(401);
        }));
        it("Show Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/orders/1");
            expect(response.status).toEqual(401);
        }));
        it("Update Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .patch("/orders/1")
                .send({ prop: "weight", value: 120 });
            expect(response.status).toEqual(401);
        }));
        it("Delete Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete("/orders/1");
            expect(response.status).toEqual(401);
        }));
    });
    describe('Authed Users', () => {
        it("Create Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post("/orders")
                .send({ status: "Active", userid: "1", weight: 100, token: loginToken });
            expect(response.status).toEqual(200);
        }));
        it("Index Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/orders").send({ token: loginToken });
            expect(response.status).toEqual(200);
        }));
        it("Show Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/orders/1").send({ token: loginToken });
            expect(response.status).toEqual(200);
        }));
        it("Update Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .patch("/orders/1")
                .send({ prop: "weight", value: 120, token: loginToken });
            expect(response.status).toEqual(200);
        }));
        it("Delete Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete("/orders/1").send({ token: loginToken });
            expect(response.status).toEqual(200);
        }));
    });
});
