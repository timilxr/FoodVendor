import React, {useEffect, useContext} from 'react';
import { AuthStateContext, getAuth, AuthDispatchContext } from '../contexts/auth';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {isLoggedIn, loaded} = useContext(AuthStateContext);
    const dispatch = useContext(AuthDispatchContext);
     useEffect(()=>{
         getAuth(dispatch);
     }, [dispatch])

    console.log(isLoggedIn);

    if(loaded){
        return <Route {...rest} render={props => isLoggedIn ? <Component {...props} /> : <Redirect to='/' />}/>
    }
    return <h1>loading...</h1>;
    // return "Hello world";
}

export default ProtectedRoute;