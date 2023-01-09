import React from 'react';
import { useState, useEffect } from "react";
import { data } from '../products'
import "../style/cart.css"
import axios from "axios";
import ReactLoading from 'react-loading';


function fetchProducts(cart_e, setProducts, setLoading) {
    return axios.get(`http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com/carts/products/${String(cart_e.id)}`, {
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


function getuserID(setCart) {
    console.log( String(document.cookie.split(';')[1].split('=')[1]))
    // console.log(String(document.cookie.split(';')[1].substring(6)))
    return axios({
        method: 'get',
        url: `http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com/carts/user/${getCookie('uID')}`,
        headers: {
            authorization: getCookie('token')
        }
    })
}

function Getinfo(setinfo, products) {
    products.map((val, key) => {
        console.log("fff:", val.productsid)
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
        data.map((item) => (ans += item.price));
        setPrice(ans);
    };





    useEffect(() => {
        async function x() {
            const myData = await getuserID(setCart);
            setCart(myData.data);
            if (cart_e !== "") {

                await fetchProducts(cart_e, setProducts, setLoading);
                if (products !== {}) {
                    await Getinfo(setinfo, products);
                }
            }
        }

        x()
        //console.log("here:", cart_e);

    }, [cart_e, setProducts, setLoading])

    return (loading ?
        <article>
            {info.map((item) => (
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