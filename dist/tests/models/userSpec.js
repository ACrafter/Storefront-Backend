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
const user_1 = require("../../models/user");
describe("User Model", () => {
    const U = new user_1.UserStore();
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield U.delete("3");
    }));
    describe("Index Method", () => {
        it("should exist", () => {
            expect(U.index).toBeDefined();
        });
        it("should return a list of all users", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield U.index();
            expect(res).toEqual([]);
        }));
    });
    describe("Create Method", () => {
        it("should exist", () => {
            expect(U.create).toBeDefined();
        });
        it("should return a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield U.create({
                username: "ACrafter",
                firstname: "Ahmed",
                pass: "123",
                status: "VIP",
            });
            expect(res).toEqual({
                id: 4,
                username: "ACrafter",
                firstname: "Ahmed",
                status: "VIP",
            });
        }));
    });
    describe("Get One Method", () => {
        it("should exist", () => {
            expect(U.show).toBeDefined();
        });
        it("should return a single user", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield U.show("4");
            expect(res).toEqual({
                username: "ACrafter",
                firstname: "Ahmed",
                status: "VIP",
            });
        }));
    });
    describe("Update Method", () => {
        it("should exist", () => {
            expect(U.update).toBeDefined();
        });
        it("should return a single user", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield U.update("4", "username", "Yasser");
            expect(res).toEqual({
                username: "Yasser",
                firstname: "Ahmed",
                status: "VIP",
            });
        }));
    });
    describe("Get VIP Method", () => {
        it("should exist", () => {
            expect(U.getVIP).toBeDefined();
        });
        it("should return all users with status VIP", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield U.getVIP();
            expect(res).toEqual([
                { username: "Yasser", firstname: "Ahmed", status: "VIP" },
            ]);
        }));
    });
    describe("Get Frequent Method", () => {
        it("should exist", () => {
            expect(U.getFrequent).toBeDefined();
        });
        it("should return all users with status Frequent", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield U.getFrequent();
            expect(res).toEqual([]);
        }));
    });
    describe("Get None Method", () => {
        it("should exist", () => {
            expect(U.getNone).toBeDefined();
        });
        it("should return all users with status None", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield U.getFrequent();
            expect(res).toEqual([]);
        }));
    });
    describe("Delete Method", () => {
        it("should exist", () => {
            expect(U.delete).toBeDefined();
        });
        it("should return a single user", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield U.delete("4");
            expect(res).toEqual([]);
        }));
    });
});
