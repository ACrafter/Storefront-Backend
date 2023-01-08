import React from 'react'
import ReactDOM from 'react-dom'
import "./style/index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Productlist from "./components/home"
import Navbaar from './components/navbar';
import Error from './components/error';
import Login from './components/login';
import About from './components/About';
import Singup from './components/singup';
import Producttoadd from './components/addproduct';
import Cart from './components/cart';
import Order from './components/Orders';

import 'bootstrap/dist/css/bootstrap.min.css';

const HeaderRoute = () => {
	return (
		<Router>
			<Navbaar />
			<Routes>
				<Route exact path='/' element={<Productlist />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/about' element={<About />} />
				<Route exact path='/singup' element={<Singup />} />
				<Route exact path='/cart' element={<Cart />} />
				<Route exact path='/add' element={<Producttoadd />} />
				<Route exact path='/orders' element={<Order />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</Router>
	);
};




ReactDOM.render(<HeaderRoute />, document.getElementById('root'));
