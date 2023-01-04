import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { redirect } from 'react-router-dom';



function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");

    // const handleValidation = (event) => {
    //     console.log(email);
    //     console.log(password)
    //     let formIsValid = true;

    //     if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    //         formIsValid = false;
    //         setemailError("Email Not Valid");
    //         return false;
    //     } else {
    //         setemailError("");
    //         formIsValid = true;
    //     }

    //     if (!password.match(/^[a-zA-Z]{8,22}$/)) {
    //         formIsValid = false;
    //         setpasswordError(
    //             "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
    //         );
    //         return false;
    //     } else {
    //         setpasswordError("");
    //         formIsValid = true;
    //     }

    //     return formIsValid;
    // };
    let token;
    const validateUser = () => {
        return axios({method: 'post', url:"http://localhost:3000/users/login", data: {uName: email, pass: password} } )
        .then((response) => {
            if(response.data !== 'None'){
                token = response.data;
                console.log(token);
            }
        })
    }

    const LoginSubmit = (e) => {
        e.preventDefault();
         validateUser();
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
                                    <h2 className="fw-bold mb-2 text-uppercase ">DB-project</h2>
                                    <p className=" mb-5">Please enter your login and password!</p>
                                    <div className="mb-3">
                                        <Form onSubmit={loginSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                                                <small id="emailHelp" className="text-danger form-text">
                                                    {emailError}
                                                </small>
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                                                <small id="passworderror" className="text-danger form-text">{passwordError}</small>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Don't have an account?{" "}
                                                <a href="\singup" className="text-primary fw-bold">
                                                    Sign Up
                                                </a>
                                            </p>
                                        </div>
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


export default Login;
