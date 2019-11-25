import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import * as serviceWorker from './Javascript/serviceWorker';

//include Components
import Home from './Javascript/Pages/Home';
import Description from './Javascript/Pages/Description'
import './Stylesheet/index.css';


const PathManager = () => (
    <Switch>
        <Route exact path={"/"} component={Home}/>
        <Route exact path={'/:id'} component={Description}/>
    </Switch>
);


ReactDOM.render(
    <BrowserRouter>
        <PathManager/>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
