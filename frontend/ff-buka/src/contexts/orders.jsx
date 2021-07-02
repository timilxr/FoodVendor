import React, {createContext, useReducer} from 'react';
import axios from 'axios';

const initialState = {
    loading: true,
    loaded: false,
    orders: []
}

export const OrdersStateContext = createContext();
export const OrdersDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case "REQUEST_GET_ORDERS":
            return{
                ...state,
                loading: true
            };
        case "REQUEST_ADD_ORDER":
            return{
                ...state,
                loading: true
            };
        case "REQUEST_UPDATE_ORDER":
            return{
                ...state,
                loading: true
            };
        case "GET_ORDERS_SUCCESS":
            return{
                ...state,
                loading: false,
                loaded: true,
                orders: action.payload.orders
            };
        case "ADD_ORDER_SUCCESS":
            return{
                ...state,
                loading: false,
                loaded: true,
                orders: [...state.orders, action.payload.orders]
            };
        case "UPDATE_ORDER_SUCCESS":
            return{
                ...state,
                loading: false,
                loaded: true,
                orders: action.payload.orders
            };
        case "GET_ORDERS_FAILURE":
            return{
                ...state,
                orders: null,
                loading: false,
                loaded: true,
            }
        case "ADD_ORDERS_FAILURE":
            return{
                ...state,
                orders: null,
                loading: false,
                loaded: true,
            }
        case "UPDATE_ORDERS_FAILURE":
            return{
                ...state,
                orders: null,
                loading: false,
                loaded: true,
            }
        default:
            throw new Error(`Unknown action type ${action.type}`)
    }
}

const OrdersProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <OrdersDispatchContext.Provider value={dispatch}>
            <OrdersStateContext.Provider value={state}>
                {children}
            </OrdersStateContext.Provider>
        </OrdersDispatchContext.Provider>
    )
}

export const getOrders = async (dispatch) => {
    dispatch({
        type: 'REQUEST_GET_ORDERS'
    });
    await axios.get('http://localhost:2000/orders')
    .then(res => {
        console.log(res.data);
        dispatch({
            type: 'GET_ORDERS_SUCCESS',
            payload: {
                orders: res.data
            }
        });
    })
    .catch( err => {
        dispatch({
            type: 'GET_ORDERS_FAILURE'
        });
        console.log("getOrders wrog");
        console.error(err);
    })
}

export const addOrder = async (dispatch, order) => {
    dispatch({
        type: 'REQUEST_ADD_ORDERS'
    });
    await axios.get('http://localhost:2000/orders/add', order)
    .then(res => {
        dispatch({
            type: 'ADD_ORDERS_SUCCESS',
            payload: {
                orders: res.data
            }
        });
    })
    .catch( err => {
        dispatch({
            type: 'ADD_ORDERS_FAILURE'
        });
        console.error(err);
    })
}

export default OrdersProvider;