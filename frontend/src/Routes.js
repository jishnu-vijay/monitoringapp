import * as React from 'react';
import { BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import HomePage from './view/HomePage';
import LoginPage from './view/LoginPage';
import RegisterPage from './view/RegisterPage';
import DashBoard from './view/DashBoard';
import AddUrl from './view/AddUrl';
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();

const Routes = () => {

    return (
        <BrowserRouter history={hist}>
            <Switch>
                <Route exact path = "/" component = {HomePage}/>
                <Route exact path = "/login" component = {LoginPage}/>
                <Route exact path = "/register" component = {RegisterPage}/>
                <Route exact path= "/dashboard" exact component ={DashBoard} />
                <Route exact path= "/addurl" exact component ={AddUrl} />
            </Switch>
        </BrowserRouter>
    );

}

export default Routes;