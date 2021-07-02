import React, {createContext, useReducer} from 'react';
import axios from 'axios';

const initialState = {
    loading: true,
    loaded: false,
    isLoggedIn: null
}

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case "REQUEST_GET_AUTH":
            return{
                ...state,
                loading: true
            };
        case "GET_AUTH_SUCCESS":
            return{
                ...state,
                loading: false,
                loaded: true,
                isLoggedIn: true
            };
        case "GET_AUTH_FAILURE":
            return{
                ...state,
                isLoggedIn: false,
                loading: false,
                loaded: true,
            }
        default:
            throw new Error(`Unknown action type ${action.type}`)
    }
}

const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    )
}

export const getAuth = async (dispatch) => {
    dispatch({
        type: 'REQUEST_GET_AUTH'
    });
    let info = localStorage.getItem('E_com');
    if(info){
        info = JSON.parse(info);
    // console.log(info);
    await axios.post('http://localhost:2000/users/verifyy', {token: info})
    .then(res => {
        if (res.data === "success"){
            dispatch({
                type: 'GET_AUTH_SUCCESS',
                payload: {
                    isLoggedIn: true
                }
            });
        } else {
            dispatch({
                type: 'GET_AUTH_FAILURE'
            });
        }
    })
    .catch( err => {
        dispatch({
            type: 'GET_AUTH_FAILURE'
        });
        // console.log("getAuth wrong");
        console.error(err);
    })
    } else {
        dispatch({
            type: 'GET_AUTH_FAILURE'
        });
    }
}

// export const addOrder = async (dispatch, order) => {
//     dispatch({
//         type: 'REQUEST_ADD_ORDERS'
//     });
//     await axios.get('http://localhost:2000/orders/add', order)
//     .then(res => {
//         dispatch({
//             type: 'ADD_ORDERS_SUCCESS',
//             payload: {
//                 orders: res.data
//             }
//         });
//     })
//     .catch( err => {
//         dispatch({
//             type: 'ADD_ORDERS_FAILURE'
//         });
//         console.error(err);
//     })
// }

export default AuthProvider;