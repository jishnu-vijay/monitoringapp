import React from 'react';
import { BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import HomePage from './view/HomePage';
import LoginPage from './view/LoginPage';
import RegisterPage from './view/RegisterPage';
import DashBoard from './view/DashBoard';

const Routes = () => {

    return (

        <BrowserRouter >
            <Switch>
                <Route exact path = "/" component = {HomePage}/>
                <Route exact path = "/login" component = {LoginPage}/>
                <Route exact path = "/register" component = {RegisterPage}/>
                <Route path= "/dashboard" exact component ={DashBoard} />
            </Switch>
        </BrowserRouter>
    );

}

export default Routes;