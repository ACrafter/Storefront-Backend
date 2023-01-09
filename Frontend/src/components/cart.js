import React from 'react';
import { useState, useEffect } from "react";
import { data } from '../products'
import "../style/cart.css"
import axios from "axios";
import ReactLoading from 'react-loading';

const Cart = () => {
    const [price, setPrice] = useState(0);
    let [products, setProducts] = useState();
    let [loading, setLoading] = useState(false);
    const handleRemove = (id) => {
    };

    const handlePrice = () => {
        let ans = 0;
        data.map((item) => (ans += item.price));
        setPrice(ans);
    };

    useEffect(() => {
        handlePrice();
    });

    const fetchProducts = () => {
        return axios.get("http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com/carts/products", {
            userid: Number(document.cookie.split(';')[1].substring(5)), token: document.cookie.split(';')[0].substring(6)
        }).then(response => {
            console.log(response);
            setProducts(response.data);
            setLoading(true);
        })
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (loading ?
        <article>
            {products.map((item) => (
                <div className="cart_box" key={item.id}>
                    <div className="cart_img">
                        <img src={item.img} alt="" />
                        <p>{item.title}</p>
                    </div>
                    <div>
                        <button class="button2" type="button2" onclick="alert('You will Successfully created a button')">+</button>
                        <button>{item.amount}</button>
                        <button class="button3" type="button3" onclick="alert('You will Successfully created a button')">-</button>
                    </div>
                    <div>
                        <span>{item.price}</span>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                </div>
            ))}
            <div className="total">
                <span>Total Price of your Cart</span>
                <span>EGP - {price}</span>
            </div>
            <button class="button" type="button" onclick="alert('You will Successfully created a button')">Check out</button>
        </article> : <div className='center'>
            <ReactLoading type='spinningBubbles' color='0xfffff' height={600} width={300} />
        </div>
    );
};

export default Cart;