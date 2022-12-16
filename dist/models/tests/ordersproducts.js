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
const ordersproducts_1 = require("../ordersproducts");
const user_1 = require("../user");
const order_1 = require("../order");
const product_1 = require("../product");
describe('OrdersProducts Model', () => {
    const U = new user_1.UserStore();
    const P = new product_1.ProductStore();
    const O = new order_1.OrderStore();
    const OP = new ordersproducts_1.OrderProductStore();
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield U.create({
            username: "ACrafter",
            firstname: "Ahmed",
            pass: "123",
            status: "VIP",
        });
        yield O.create({
            userid: "1", weight: 50, status: "Active"
        });
        yield P.create({
            name: "Spoon",
            type: "Ketchen",
            quantity: 100,
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield O.delete("1");
        yield P.delete("1");
        yield U.delete("1");
    }));
    describe("Index Method", () => {
        it("should exist", () => {
            expect(OP.index).toBeDefined();
        });
        it("should return a list of all products", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield OP.index();
            expect(res).toEqual([]);
        }));
    });
    describe("Create Method", () => {
        it("should exist", () => {
            expect(OP.create).toBeDefined();
        });
        it("should return the new product", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield OP.create({
                orderid: "1",
                productid: "1",
                quantity: 50,
            });
            expect(res).toEqual({
                id: 1,
                orderid: 1,
                productid: 1,
                quantity: 50,
            });
        }));
    });
});
