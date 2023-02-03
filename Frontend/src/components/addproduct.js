import axios from 'axios';
import React from 'react';
import { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";



function Producttoadd() {
    const [price, setprice] = useState();
    const [name, setname] = useState("");
    const [brand, setbrand] = useState("");
    const [desc, setdesc] = useState("");
    const [img, setimg] = useState("");

    let token = document.cookie.substring(6);
    const handleValidation = (event) => {
        console.log(typeof (price));
        console.log(name)
        let formIsValid = true;

        if (name === '') {
            formIsValid = false;
            return false;
        }
        if (price < 0) {
            formIsValid = false;
            return false;
        }
        if (brand === '') {
            formIsValid = false;
            return false;
        }
        if (desc === '') {
            formIsValid = false;
            return false;
        }
        if (img === '') {
            formIsValid = false;
            return false;
        }

        return formIsValid;
    };


    const Add = () => {
        axios.post("http://storebackend-env.eba-9cttnj2w.us-east-1.elasticbeanstalk.com/products", {headers: {
            authorization: String(document.cookie.split(';')[0].substring(6))
        },
            name: name, price: price, brand: brand, description: desc, image: img

        }).then((response) => {
            console.log("----------------")
            console.log(response)
            if (response.data !== 'None') {
                return true;
            }
            else {
                console.log("faild");
                return false;
            }
        })
    }

    const LoginSubmit = (e) => {
        e.preventDefault();

        if (handleValidation()) {
            console.log("added");
            Add()
        }
    };

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">ADD product FORM</h2>
                                    <p className=" mb-5">add product details</p>
                                    <div className="mb-3">
                                        <Form onSubmit={LoginSubmit}>
                                            <Form.Group className="mb-3" controlId="formproductName">
                                                <Form.Label className="text-center">
                                                    productName
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter product name" onChange={(event) => setname(event.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBrand">
                                                <Form.Label className="text-center">
                                                    Brand
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter product Brand" onChange={(event) => setbrand(event.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formdesc">
                                                <Form.Label className="text-center">
                                                    description
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter product desc" onChange={(event) => setdesc(event.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formimage">
                                                <Form.Label className="text-center">
                                                    Image URL
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter product Image" onChange={(event) => setimg(event.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formprice">
                                                <Form.Label className="text-center">
                                                    price
                                                </Form.Label>
                                                <Form.Control type="number" placeholder="Enter product price" onChange={(event) => setprice(Number(event.target.value))} />
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    add product
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};


export default Producttoadd;
