import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const initialState = {
    loading: true,
    loaded: false,
    users: []
}

export const UsersStateContext = createContext();
export const UsersDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case "REQUEST_GET_USERS":
            return{
                ...state,
                loading: true
            };
        case "REQUEST_ADD_USER":
            return{
                ...state,
                loading: true
            };
        case "REQUEST_UPDATE_USER":
            return{
                ...state,
                loading: true
            };
        case "GET_USERS_SUCCESS":
            return{
                ...state,
                loading: false,
                loaded: true,
                users: action.payload.users
            };
        case "ADD_USER_SUCCESS":
            return{
                ...state,
                loading: false,
                loaded: true,
                users: [...state.users, action.payload.users]
            };
        case "UPDATE_USER_SUCCESS":
            return{
                ...state,
                loading: false,
                loaded: true,
                users: action.payload.users
            };
        case "GET_USERS_FAILURE":
            return{
                ...state,
                users: null,
                loading: false,
                loaded: true,
            }
        case "ADD_USERS_FAILURE":
            return{
                ...state,
                users: null,
                loading: false,
                loaded: true,
            }
        case "UPDATE_USERS_FAILURE":
            return{
                ...state,
                users: null,
                loading: false,
                loaded: true,
            }
        default:
            throw new Error(`Unknown action type ${action.type}`)
    }
}

const UsersProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return(
        <UsersDispatchContext.Provider value={dispatch}>
            <UsersStateContext.Provider value={state}>
                {children}
            </UsersStateContext.Provider>
        </UsersDispatchContext.Provider>
    )
}

export const getUsers = async (dispatch) =>{
    dispatch({
        type: 'REQUEST_GET_USERS'
    });
    await axios.get('http://localhost:2000/users/')
    .then(res=>{
        console.log(res.data);
        dispatch({
            type: 'GET_USERS_SUCCESS',
            payload: {
                users: res.data
            }
        });
    })
    .catch(err=>{
        dispatch({
            type: 'GET_USERS_FAILURE'
        });
        console.error(`Error: ${err}`)
    });  
}

export const addUser = async (dispatch, user) =>{
    dispatch({
        type: 'REQUEST_ADD_USERS'
    });
    await axios.post('http://localhost:2000/users/add', user)
    .then(res=>{
        dispatch({
            type: 'ADD_USERS_SUCCESS',
            payload: {
                users: res.data
            }
        });
    })
    .catch(err=>{
        dispatch({
            type: 'ADD_USERS_FAILURE'
        });
        console.error(`Error: ${err}`)
    });  
}

export default UsersProvider;