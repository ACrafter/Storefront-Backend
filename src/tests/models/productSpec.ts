import { ProductStore } from "../../models/product";

describe("Product Model Tests", () => {
    const P = new ProductStore();
    let prodId: undefined | Number;

    describe("Methods Existance", () => {
        it('Index Method', () => {
            expect(P.index).toBeDefined()
        })

        it('Show Method', () => {
            expect(P.getOne).toBeDefined()
        })

        it('Create Method', () => {
            expect(P.create).toBeDefined()
        })

        it("Update Method", () => {
            expect(P.update).toBeDefined()
        })

        it("Delete Method", () => {
            expect(P.delete).toBeDefined()
        })
    })

    describe("Methods Functionality", () => {
        it("Index Method", async () => {
            const res = await P.index()
            expect(res).toEqual([{ id: 2, name: 'test', price: 10, brand: 'test', quantity: null, description: 'test', image: 'test' }])
        })

        it("Show Method (undefined)", async () => {
            const res = await P.getOne("3")
            expect(res).toBeUndefined()
        })

        it("Create Method",async () => {
            const res = await P.create({
                name: 'Prod',
                price: 10,
                brand: 'Bra',
                description: 'Desc',
                image: 'test'
            })
            
            prodId = res.id
            expect(res).toEqual({id: prodId, name: 'Prod', price: 10, quantity: null, brand: 'Bra', description: 'Desc', image:'test'})
        })

        it("Show Method (defined)", async () => {
            const res = await P.getOne(String(prodId))
            expect(res).toEqual({id: prodId, name: 'Prod', price: 10, quantity: null, brand: 'Bra', description: 'Desc', image: 'test' })
        })

        it("Update Method",async () => {
            const res = await P.update(String(prodId), "price", 15)
            expect(res).toEqual({id: prodId, name: 'Prod', price: 15, quantity: null, brand: 'Bra', description: 'Desc', image:'test'})
        })

        it('Delete Product',async () => {
            await P.delete(String(prodId))
            const res = await P.index()
            expect(res).toEqual([{ id: 2, name: 'test', price: 10, brand: 'test', quantity: null, description: 'test', image: 'test' }])
        })
    })
})