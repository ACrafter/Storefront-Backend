import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Productlist from "./components/home"
import Navbaar from './components/navbar';
import Error from './components/error';
import Login from './components/login';
import About from './components/about';
import Singup from './components/singup';

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
				<Route path='*' element={<Error />} />
			</Routes>
		</Router>
	);
};




ReactDOM.render(<HeaderRoute />, document.getElementById('root'));
