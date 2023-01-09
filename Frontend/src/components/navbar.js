import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function Navbaar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"><img
                    alt=""
                    src="https://react-bootstrap.github.io/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}Toy Shop</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/cart">Shopping Cart</Nav.Link>
                    <Nav.Link href="/orders">Orders</Nav.Link>
                    <Nav.Link href="/About">About</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/add">ADD Product</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navbaar;