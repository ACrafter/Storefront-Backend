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
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
describe("Order Model", () => {
    const O = new order_1.OrderStore();
    const U = new user_1.UserStore();
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield U.create({
            username: "ACrafter",
            firstname: "Ahmed",
            pass: "123",
            status: "VIP",
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield U.delete("2");
    }));
    describe("Index Method", () => {
        it("should exist", () => {
            expect(O.index).toBeDefined();
        });
        it("should return a list of all orders", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield O.index();
            expect(res).toEqual([]);
        }));
    });
    describe("Create Method", () => {
        it("should exist", () => {
            expect(O.create).toBeDefined();
        });
        it("should return a newly created user", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield O.create({ userid: "2", weight: 50, status: "Active" });
            expect(res).toEqual({ id: 2, userid: 2, weight: 50, status: "Active" });
        }));
    });
    describe("Show Method", () => {
        it("should exist", () => {
            expect(O.show).toBeDefined();
        });
        it("should return a newly created order", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield O.show("2");
            expect(res).toEqual({ userid: 2, weight: 50, status: "Active" });
        }));
    });
    describe("Update Method", () => {
        it("should exist", () => {
            expect(O.update).toBeDefined();
        });
        it("should return the updated user", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield O.update("status", "Completed", "2");
            expect(res).toEqual({ userid: 2, weight: 50, status: "Completed" });
        }));
    });
    describe("Get User's Order  Method", () => {
        it("should exist", () => {
            expect(O.getOrdersByUser).toBeDefined();
        });
        it("should return the updated user", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield O.getOrdersByUser("2");
            expect(res).toEqual([{ id: 2, weight: 50, status: "Completed" }]);
        }));
    });
    describe("Delete Method", () => {
        it("should exist", () => {
            expect(O.delete).toBeDefined();
        });
        it("should return a list of all remaining orders", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield O.delete("2");
            expect(res).toEqual([]);
        }));
    });
});
