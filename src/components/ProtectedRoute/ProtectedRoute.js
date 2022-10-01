import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children}) => {

    const [loggedIn, setLoggedIn] = useState(true);
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        if(!jwt){
            setLoggedIn(false);
        }
    }, [jwt])

    return(
        <Route>
            {() => (loggedIn ? children : <Redirect to="/" />)}
        </Route>
    )
}

export default ProtectedRoute;