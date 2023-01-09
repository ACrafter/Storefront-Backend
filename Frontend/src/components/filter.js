import axios from 'axios';
import React from 'react';
import { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


import "../style/index.css";
import "../style/Search.css";

function Fiter() {
    const [search, setSearch] = useState("");
    let [products, setProducts] = useState();
    let [loading, setLoading] = useState(false);



    const handleValidation = (event) => {
        //console.log(username);
        //console.log(password)
        let formIsValid = true;
        return formIsValid;
    };

    const Filter_brand = () => {
        console.log(search.toUpperCase());
        return axios.post(`http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com/products/filter/brand`, { name: search }).then(response => {
            //console.log(response);
            setProducts(response.data);
            console.log(response);
            setLoading(true);
            console.log(products)
        })
    }

    function LoginSubmit(e) {
        e.preventDefault();
        if (handleValidation()) {
            Filter_brand()
        }
    };
    if (!loading) {
        return (
            <div>
                <Container>
                    <Row className="vh-100 d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <div className="border border-3 border-primary"></div>
                            <Card className="shadow">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-uppercase ">DB-project</h2>
                                        <div className="mb-3">
                                            <Form onSubmit={LoginSubmit}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        User Name
                                                    </Form.Label>
                                                    <Form.Control type="text" placeholder="Enter email" onChange={(event) => setSearch(event.target.value)} />
                                                </Form.Group>
                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit">
                                                        Login
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
    } else {

    }
};


export default Fiter;