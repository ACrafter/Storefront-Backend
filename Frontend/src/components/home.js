import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../index.css";
import axios from "axios";
import ReactLoading from 'react-loading';


function Productlist() {
    let [products, setProducts] = useState();
    let [loading, setLoading] = useState(false);

    const fetchProducts = () => {
        return axios.get("http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com/products")
            .then(response => {
                console.log(response);
                setProducts(response.data);
                setLoading(true);
            })
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    console.log(loading);

    return (loading ?
        <div>
            <section className='productlist'>
                {products.map((product, id) => {
                    return (<Product image={product.img} title={product.name} price={product.quantity} />)
                })}
            </section></div> : <div className='center'>
            <ReactLoading type='spinningBubbles' color='0xfffff' height={600} width={300} />
        </div>
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