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
const user_1 = require("../../models/user");
const __1 = __importDefault(require("../.."));
const request = (0, supertest_1.default)(__1.default);
(0, order_1.default)(__1.default);
describe('Order Routes', () => {
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
        yield U.delete("1");
    }));
    it('Create Method', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/orders').send({ status: "Active", userid: "1", weight: 100 });
        expect(response.status).toEqual(200);
    }));
    it('Index Method', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders');
        expect(response.status).toEqual(200);
    }));
    it('Show Method', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders/1');
        expect(response.status).toEqual(200);
    }));
    it('Update Method', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.patch('/orders/1').send({ prop: "weight", value: 120 });
        expect(response.status).toEqual(200);
    }));
    it('Delete Method', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/orders/1');
        expect(response.status).toEqual(200);
    }));
});
