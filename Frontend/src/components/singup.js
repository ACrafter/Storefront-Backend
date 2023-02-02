import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React from 'react';
import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Singup() {

    const [password, setPassword] = useState("");
    const [username, setname] = useState("");
    const [firstname, setfname] = useState("");
    const [lastname, setlname] = useState("");
    //const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [lastnameError, setelastnameError] = useState("");
    const [usernameError, setusernameError] = useState("");
    const [firstnameError, setfirstnameError] = useState("");

    const navigate = useNavigate();

    const handleValidation = (event) => {
        console.log(username);
        console.log(password)
        console.log(lastname)
        let formIsValid = true;
        if (username === "") {
            setusernameError("must enter value");
            formIsValid = false;
            return false;
        }
        else {
            setusernameError("");
            formIsValid = true;
        }
        if (firstname === "") {
            setfirstnameError("must enter value");
            formIsValid = false;
            return false;
        } else {
            setfirstnameError("");
            formIsValid = true;
        }
        if (lastname === "") {
            formIsValid = false;
            setelastnameError("Email Not Valid");
            return false;
        } else {
            setelastnameError("");
            formIsValid = true;
        }

        if (password.length < 3 || password.length > 20) {
            formIsValid = false;
            setpasswordError(
                "min 3 Chracters and Max 22 Chracters"
            );
            return false;
        } else {
            setpasswordError("");
            formIsValid = true;
        }

        return formIsValid;
    };

    const Submit = () => {
        axios.post("http://storebackend-env.eba-9cttnj2w.us-east-1.elasticbeanstalk.com/users", {
            uName: username, fName: firstname,
            lName: lastname, password: password
        }).then((response) => {
            console.log(response.data);
            if (response.data === 'Error: Error: payload is required') {
                console.log("sonthing wrong");
            } else {
                document.cookie = "token=" + response.data.userToken;
                document.cookie = "uID=" + response.data.userId;
                axios.post("http://storebackend-env.eba-9cttnj2w.us-east-1.elasticbeanstalk.com/carts", {
                    userid: Number(document.cookie.split(';')[1].substring(5))
                }, {
                    headers: { authorization: document.cookie.split(';')[0].substring(6) }

                }).then((response) => {
                    console.log(response);
                })
                navigate('/');
            }

        })
    };
    const SighupSubmit = (e) => {
        e.preventDefault();

        if (handleValidation()) {
            Submit()
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
                                        <Form onSubmit={SighupSubmit}>
                                            <Form.Group className="mb-3" controlId="formText">
                                                <Form.Label className="text-center">
                                                    Username
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Username" onChange={(event) => setname(event.target.value)} />
                                                <small id="emailHelp" className="text-danger form-text">
                                                    {usernameError}
                                                </small>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label className="text-center">
                                                    First Name
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter First Name" onChange={(event) => setfname(event.target.value)} />
                                                <small id="emailHelp" className="text-danger form-text">
                                                    {firstnameError}
                                                </small>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Last Name
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Last Name" onChange={(event) => setlname(event.target.value)} />
                                                <small id="emailHelp" className="text-danger form-text">
                                                    {lastnameError}
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
                                                    Submit
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
