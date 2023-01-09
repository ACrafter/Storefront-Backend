import { OrderStore } from "../../models/order";
import { UserStore } from "../../models/user";
import { ProductStore } from "../../models/product";

describe("Order Model Tests", () => {
    const O = new OrderStore();
    const U = new UserStore();
    const P = new ProductStore();
    let uid:Number | undefined;
    let orderid: String | Number | undefined;
    let pid: String | Number | undefined;

    beforeAll(async () =>{
        const user = await U.create({
            username: "ACrafter",
            firstname: "Ahmed",
            lastname: "Yasser",
            password: "123"
        })
        
        uid = user.id

        const product = await P.create({
            name: 'test',
            price: 10,
            brand: 'test',
            description: 'test',
            image: 'test'
        })

        pid = product.id
    })

    afterAll(async () => {
        await U.delete(String(uid))
    })

    describe("Methods Existance", () => {
        it('Index Method', () => {
            expect(O.index).toBeDefined()
        })

        it('Show Method', () => {
            expect(O.getOne).toBeDefined()
        })

        it('Create Method', () => {
            expect(O.create).toBeDefined()
        })

        it("Update Method", () => {
            expect(O.update).toBeDefined()
        })

        it("Delete Method", () => {
            expect(O.delete).toBeDefined()
        })
        it('Cartproducts Method (get)', () => {
            expect(O.getOrdersByUser).toBeDefined()
        })

        it('Cartproducts Method (add)', () => {
            expect(O.getOrderProducts).toBeDefined()
        })

        it('CartId Method (get)', () => {
            expect(O.addOrderProducts).toBeDefined()
        })
    })

    describe("Methods Functionality", () => {
        it('Index Method', async () => {
            const res = await O.index()
            expect(res).toEqual([])
        })

        it('Show Method (undefined)', async () => {
            const res = await O.getOne("1") 
            expect(res).toBeUndefined()
        })

        it('Create Method',async () => {
            const res = await O.create({userid: uid, eta: "2 hours", weight: 60, status: "Active"})
            orderid = res.id
            expect(res).toEqual({id:orderid, userid: uid, eta: "2 hours", weight: 60, status: "Active"})
        })

        it('Show Method (defined)',async () => {
            const res = await O.getOne("1")
            orderid = res.id
            expect(res).toEqual({id:orderid, userid: uid, eta: "2 hours", weight: 60, status: "Active"})
        })

        it('Update Method',async () => {
            const res = await O.update("status", "Completed", String(orderid))
            expect(res).toEqual({id:orderid, userid: uid, eta: "2 hours", weight: 60, status: "Completed"})
        })

        it('Get User Orders',async () => {
            const res = await O.getOrdersByUser(String(uid))
            expect(res).toEqual([{id:orderid, userid: uid, eta: "2 hours", weight: 60, status: "Completed"}])
        })

        it('Get Products',async () => {
            const res = await O.getOrderProducts(String(orderid))
            expect(res).toEqual([])
        })

        it('Add Products', async () => {
            const res = await O.addOrderProducts(String(orderid), String(pid))
            expect(res).toEqual({id:1, productsid: (pid), ordersid: (orderid)})
        })

        it('Remove Product',async () => {
            await O.removeOrderProducts(String(orderid), String(pid))
            const res = await O.getOrderProducts(String(orderid))
            expect(res).toEqual([])
        })

        it('Delete Order',async () => {
            await O.delete(String(orderid))
            const res = await O.index()
            expect(res).toEqual([])
        })
    })
})