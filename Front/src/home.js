import React from 'react'
import ReactDom from 'react-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { data } from './products'
import "./index.css";

function Productlist() {
    return (
        <section className='productlist'>
            {data.map((book, index) => {
                return <BasicExample image={book.img} title={book.title} price={book.price} />
            })}


        </section>
    );
}

const Product = ({ image, title, price }) => {
    return (
        <article className='product'>
            <img src={image} />
            <h3>{title}</h3>
            <h2>{price} EGP</h2>
        </article>
    );
};



function BasicExample({ image, title, price }) {
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