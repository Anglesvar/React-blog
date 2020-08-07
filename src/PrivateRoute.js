import {Redirect} from "react-router-dom";
import React from "react";

const Route = require("react-router-dom").Route;
export const PrivateRoute = ({component: Component, ...rest}) => {
    return (<Route {...rest} render={props => (
        localStorage.getItem('token') ? (
            <Component {...props}/>
        ) : (
            <Redirect push to={{
                pathname: '/home/blogs',
                from: props.location
            }}/>
        )
    )}/>)
};

