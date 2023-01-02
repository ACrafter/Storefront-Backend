import React from 'react'
import ReactDOM from 'react-dom'
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Productlist from "./home"
import Navbaar from './navbar';
import Error from './error';
import Login from './login';
import About from './about';

import 'bootstrap/dist/css/bootstrap.min.css';

const HeaderRoute = () => {
	return (
		<Router>
			<Navbaar />
			<Routes>
				<Route exact path='/' element={<Productlist />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/about' element={<About />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</Router>
	);
};




ReactDOM.render(<HeaderRoute />, document.getElementById('root'));