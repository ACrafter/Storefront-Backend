import axios from 'axios';
import React from 'react';
import { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';



function Login() {
    const [password, setPassword] = useState("");
    const [username, setusername] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [user_nameError, setnameError] = useState("");
    const navigate = useNavigate();


    const handleValidation = (event) => {
        console.log(username);
        console.log(password.length)
        let formIsValid = true;

        if (username === '') {
            formIsValid = false;
            setnameError("Must enter user name");
            return false;
        } else {
            setnameError("");
            formIsValid = true;
        }

        if (password.length < 3 || password.length > 20) {
            formIsValid = false;
            setpasswordError(
                "min 3 Chracters and Max 20 Chracters"
            );
            return false;
        } else {
            setpasswordError("");
            formIsValid = true;
        }

        return formIsValid;
    };


    let token;
    const validateUser = () => {
        axios.post("http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com/users/login", {
            uName: username, pass: password
        }).then((response) => {
            console.log("----------------")
            console.log(response)
            if (response.data !== 'None') {
                token = response.data;
                console.log(token);
                navigate('/');
                return true;
            }
            else {
                console.log("false");
                setnameError("wrong user name or password");
                setpasswordError("wrong user name or password");
                return false;
            }
        })
    }

    const LoginSubmit = (e) => {
        e.preventDefault();

        if (handleValidation()) {
            validateUser()
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
                                    <h2 className="fw-bold mb-2 text-uppercase ">DB-project</h2>
                                    <p className=" mb-5">Please enter your login and password!</p>
                                    <div className="mb-3">
                                        <Form onSubmit={LoginSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    User Name
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter email" onChange={(event) => setusername(event.target.value)} />
                                                <small id="emailHelp" className="text-danger form-text">
                                                    {user_nameError}
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
