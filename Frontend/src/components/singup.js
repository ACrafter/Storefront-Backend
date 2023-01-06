import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React from 'react';
import { useState } from 'react'
import axios from "axios";


function Singup() {

    const [password, setPassword] = useState("");
    const [lastname, setlname] = useState("");
    const [firstname, setfname] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");

    // const handleValidation = (event) => {
    //     console.log(username);
    //     console.log(password)
    //     let formIsValid = true;

    //     if (!username.match(/^\w+[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
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

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com/users", {uName: email, fName: firstname, pass: password}).then((response) => {
            console.log(response.data);
        })   
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
                                        <Form onSubmit={Submit}>
                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label className="text-center">
                                                    Username
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Username" onChange={(event) => setfname(event.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label className="text-center">
                                                    User firstname
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Username" onChange={(event) => setlname(event.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
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
                                                Have an account?{" "}
                                                <a href="\login" className="text-primary fw-bold">
                                                    Login
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

export default Singup;