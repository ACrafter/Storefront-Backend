import React from 'react';
import { useEffect } from "react";
import { data } from '../products'
import "../style/orders.css"


const Order = () => {

    const View = (id) => {
    };

    useEffect(() => {
        View();
    });

    return (


        <article>
            <div className="total">
                <span>Orders</span>
                <span>Order Details</span>
            </div>
            {data.map((item) => (
                <div className="cart_box" key={item.id}>

                    <div className="cart_img">
                        <p>{item.title}</p>
                    </div>
                    <div>
                    </div>
                    <div>
                        <span>{item.id}</span><span>Time to arrive</span><span>Status</span>
                        <button onClick={() => View(item.id)}>View</button>
                    </div>
                </div>
            ))}

        </article>
    );
};

export default Order;