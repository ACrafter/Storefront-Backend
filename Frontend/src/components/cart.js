import React from 'react';
import { useState, useEffect } from "react";
import { data } from '../products'
import "../style/cart.css"
import axios from "axios";
import ReactLoading from 'react-loading';


function fetchProducts(cart_e, setProducts, setLoading) {
    return axios.get(`http://storebackend-env.eba-9cttnj2w.us-east-1.elasticbeanstalk.com/carts/products/${String(cart_e.id)}`, {
        headers: {
            authorization: String(document.cookie.split(';')[0].substring(6))
        }
    }).then(response => {
        console.log(response);
        console.log(setProducts(response.data));
        //setLoading(true);
    })
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function getuserID() {
    console.log(String(document.cookie.split(';')[1].split('=')[1]))
    // console.log(String(document.cookie.split(';')[1].substring(6)))
    return axios({
        method: 'get',
        url: `http://storebackend-env.eba-9cttnj2w.us-east-1.elasticbeanstalk.com/carts/user/${getCookie('uID')}`,
        headers: {
            authorization: getCookie('token')
        }
    })
}

function Getinfo(setinfo, val, info) {
    console.log("fff:", val.productsid)
    return axios.get(`http://storebackend-env.eba-9cttnj2w.us-east-1.elasticbeanstalk.com/products/${val.productsid}`)
        .then(response => {
            console.log(response.data);
            setinfo(response.data);
            console.log("info:", info);
            //setLoading(true);
        })
}

const Cart = () => {
    const [price, setPrice] = useState(0);
    let [products, setProducts] = useState();
    let [info, setinfo] = useState();
    let [loading, setLoading] = useState(false);
    let [cart_e, setCart] = useState("");

    const handleRemove = (id) => {
    };

    const handlePrice = () => {
        let ans = 0;
        info.map((item) => (ans += item.price));
        setPrice(ans);
    };





    useEffect(() => {
        async function x() {
            const myData = await getuserID();
            await setCart(myData.data);
            await console.log(myData);
            if (cart_e !== "") {
                await fetchProducts(cart_e, setProducts, setLoading);
                if (products !== {}) {
                    await products.map((val, key) => {
                        Getinfo(setinfo, val, info);
                        console.log("info:", info);

                    })

                    await setLoading(true);

                }
                handlePrice();
            }
        }

        x()
        //console.log("here:", cart_e);

    }, [cart_e, setProducts, setLoading])

    return (loading ?
        <article>
            {products.map((item) => (
                <div className="cart_box" key={item.id}>
                    <div className="cart_img">
                        <img src={item.image} alt="" />
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
