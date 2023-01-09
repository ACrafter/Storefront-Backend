import { ProductStore } from './../../models/product';
import { UserStore } from './../../models/user';
import { CartStore } from '../../models/cart';

describe("Cart Model Tests", () =>{

    const U = new UserStore();
    const C = new CartStore();
    const P = new ProductStore();
    let uid:Number | undefined;
    let cartid: String | Number | undefined;
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
        await P.delete(String(pid))
    })

    describe("Methods Existance", () => {
        it('Index Method', () => {
            expect(C.index).toBeDefined()
        })

        it('Show Method', () => {
            expect(C.getOne).toBeDefined()
        })

        it('Create Method', () => {
            expect(C.create).toBeDefined()
        })

        it('Delete Method', () => {
            expect(C.delete).toBeDefined()
        })

        it('Cartproducts Method (get)', () => {
            expect(C.getCartProducts).toBeDefined()
        })

        it('Cartproducts Method (add)', () => {
            expect(C.addCartProducts).toBeDefined()
        })

        it('CartId Method (get)', () => {
            expect(C.getCartId).toBeDefined()
        })
    })

    describe("Methods Functionality", () => {
        it('Index Method', async () => {
            const res = await C.index()
            expect(res).toEqual([])
        })

        it('Show Method (undefined)', async () => {
            const res = await C.getOne("1") 
            expect(res).toBeUndefined()
        })

        it('Create Method',async () => {
            const res = await C.create({userid:uid })
            cartid = res.id
            expect(res).toEqual({id:cartid, userid:uid})
        })

        it('Show Method (defined)',async () => {
            const res = await C.getOne("1")
            cartid = res.id
            expect(res).toEqual({id:cartid, userid:uid})
        })

        it('Get Products',async () => {
            const res = await C.getCartProducts(String(cartid))
            expect(res).toEqual([])
        })

        it('Add Products', async () => {
            const res = await C.addCartProducts(String(cartid), String(pid))
            expect(res).toEqual({id:1, productsid: pid, cartsid: cartid})
        })

        it('Get Cart ID',async () => {
            const res = await C.getCartId(String(uid))
            expect(res).toEqual({id: cartid})
        })

        it('Remove Products', async () => {
            await C.deleteCartProducts(String(cartid), String(pid))
            const res = await C.getCartProducts(String(cartid))
            expect(res).toEqual([])
        })

        it('Delete Cart',async () => {
            await C.delete(String(cartid))
            const res = await C.index()
            expect(res).toEqual([])
        })
    })
})