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
const product_1 = __importDefault(require("../../handlers/product"));
const __1 = __importDefault(require("../.."));
const request = (0, supertest_1.default)(__1.default);
(0, product_1.default)(__1.default);
describe("Product Routes", () => {
    describe("Unauthenticated Users", () => {
        it("Index Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/products");
            expect(response.status).toEqual(200);
        }));
        it("Show Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/products/1");
            expect(response.status).toEqual(200);
        }));
        it("Create Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post("/products")
                .send({
                name: "Spoon",
                quantity: 200,
                type: "Kitchen",
            });
            expect(response.status).toEqual(401);
        }));
        it("Update Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .patch("/products/1")
                .send({
                uName: "name",
                fName: "fName",
                password: "qwerty",
                status: "None",
            });
            expect(response.status).toEqual(401);
        }));
        it("Delete Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete("/products/1");
            expect(response.status).toEqual(401);
        }));
    });
    describe("Authenticated Users", () => {
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
        it("Create Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post("/products")
                .send({
                name: "Spoon",
                quantity: 200,
                type: "Kitchen",
                token: loginToken
            });
            expect(response.status).toEqual(200);
        }));
        it("Update Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .patch("/products/1")
                .send({
                prop: "quantity",
                value: 150,
                token: loginToken
            });
            expect(response.status).toEqual(200);
        }));
        it("Delete Method", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete("/products/1").send({ token: loginToken });
            expect(response.status).toEqual(200);
        }));
    });
});
