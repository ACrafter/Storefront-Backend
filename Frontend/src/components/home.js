import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../index.css";
import axios from "axios";

function Productlist() {
    let [products, setProducts] = useState();
    let [loading, setLoading] = useState(false);

    const fetchProducts = () =>{
        return axios.get("http://localhost:3000/products")
        .then(response => {
            setProducts(response.data)
            setLoading(true)
        })
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    console.log(loading);

    return ( loading ?
        <section className='productlist'>
            {products.map((product, id) => {
                return ( <Product image={product.img} title={product.name} price={product.quantity} />)
            })}
        </section>: <h1>Not yet</h1>
    );
}




function Product({ image, title, price }) {
    return (
        <Card style={{ width: '23rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>Cost: {price} EGP</Card.Subtitle>
                <Button variant="primary">Add to cart</Button>
            </Card.Body>
        </Card>
    );
}


export default Productlist;