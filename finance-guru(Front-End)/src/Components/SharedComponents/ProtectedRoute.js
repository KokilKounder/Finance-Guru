import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";



//path = "Supplies the route path"
// state = Value that determines if user accessing page is authorized
// exact = Informs whether route will use exact prop or not 
// auth  = Boolean Value determinig if authenticated users or unauthenticated users 
//should have access to the protected content. 

function ProtectedRoute(props) {
    const ctx = useContext(AuthContext);
    if (props.auth) {
        return (
            <Route path={props.path} exact>
                {props.state ? props.children : <Redirect to={"/Login"}></Redirect>}
            </Route>
        )
    }
    else {
        return (
            <Route path={props.path} exact>
                {!props.state ? props.children : <Redirect to={"/Dashboard"}></Redirect>}
            </Route>
        )

    }


}

export default ProtectedRoute