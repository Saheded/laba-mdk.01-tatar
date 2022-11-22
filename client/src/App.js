import React, {Fragment} from 'react';
import './App.css';

import {BrowserRouter as Router,Route}  from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landng';

const  App = () =>(
    <Fragment>
        <Router>
            <NavBar/>
            <Route exact path='/' component = {Landing}/>
        </Router>
    </Fragment>
)
export default App;
