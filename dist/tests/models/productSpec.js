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
const product_1 = require("../../models/product");
describe("Product Model", () => {
    const P = new product_1.ProductStore();
    describe("Index Method", () => {
        it("should exist", () => {
            expect(P.index).toBeDefined();
        });
        it("should return a list of all products", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield P.index();
            expect(res).toEqual([]);
        }));
    });
    describe("Create Method", () => {
        it("should exist", () => {
            expect(P.create).toBeDefined();
        });
        it("should return the new product", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield P.create({
                name: "Spoon",
                type: "Ketchen",
                quantity: 100,
            });
            expect(res).toEqual({
                id: 2,
                name: "Spoon",
                type: "Ketchen",
                quantity: 100,
            });
        }));
    });
    describe("Show Method", () => {
        it("should exist", () => {
            expect(P.show).toBeDefined();
        });
        it("should return a product with a given id", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield P.show("2");
            expect(res).toEqual({ name: "Spoon", type: "Ketchen", quantity: 100 });
        }));
    });
});
