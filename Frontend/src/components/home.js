import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../style/index.css";
import axios from "axios";
import ReactLoading from 'react-loading';
import "../style/Search.css";

function Addtocart(id, cart, setcart) {
    console.log("cart", cart);
    if (cart === "") {
        axios.post("http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com/carts", {
            userid: Number(document.cookie.split(';')[1].substring(5)), token: document.cookie.split(';')[0].substring(6)
        }).then((response) => {
            console.log(response);
            setcart(response.data)
        })
    } else {
        axios.post("http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com/carts/products/", {
            order: cart.id.toString(), token: document.cookie.split(';')[0].substring(6), prod: id.toString()
        }).then((response) => {
            console.log(response);
            //setcart(response.data)
        })
    }
    console.log(id);


}
function Productlist() {
    let [products, setProducts] = useState();
    let [cart, setcart] = useState("");
    let [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const fetchProducts = () => {
        return axios.get("http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com/products")
            .then(response => {
                //console.log(response);
                setProducts(response.data);
                setLoading(true);
            })
    }



    useEffect(() => {
        fetchProducts();
    }, [])

    //console.log(loading);

    return (loading ?
        <div>
            <div className='Search'>
                <input type="text" className='Search' placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} />
            </div>
            <div className='productlist'>
                {products.filter((val) => {
                    if (searchTerm === "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                    return ""
                }
                ).map((val, key) => {
                    return (
                        <Product key={val.id} id={val.id} image={val.image} title={val.name} price={val.price} cart={cart} setcart={setcart} />
                    );
                })}
            </div>
        </div > : <div className='center'>
            <ReactLoading type='spinningBubbles' color='0xfffff' height={600} width={300} />
        </div>
    );
}




function Product({ id, image, title, price, cart, setcart }) {
    return (
        <Card style={{ width: '23rem' }}>
            <Card.Img height={300} variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>Cost: {price} EGP</Card.Subtitle>
                <Button variant="primary" className="btn-primary" onClick={() => { Addtocart(id, cart, setcart) }}>Add to cart</Button>
            </Card.Body>
        </Card>
    );
}


export default Productlist;