import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const initialState = {
    loading: true,
    loaded: false,
    meals: []
}

export const MealsStateContext = createContext();
export const MealsDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case "REQUEST_GET_MEALS":
            return{
                ...state,
                loading: true
            };
        case "REQUEST_ADD_MEAL":
            return{
                ...state,
                loading: true
            };
        case "REQUEST_UPDATE_MEAL":
            return{
                ...state,
                loading: true
            };
        case "GET_MEALS_SUCCESS":
            return{
                ...state,
                loading: false,
                loaded: true,
                meals: action.payload.meals
            };
        case "ADD_MEAL_SUCCESS":
            return{
                ...state,
                loading: false,
                loaded: true,
                meals: [...state.meals, action.payload.meals]
            };
        case "UPDATE_MEAL_SUCCESS":
            return{
                ...state,
                loading: false,
                loaded: true,
                meals: action.payload.meals
            };
        case "GET_MEALS_FAILURE":
            return{
                ...state,
                meals: null,
                loading: false,
                loaded: true,
            }
        case "ADD_MEALS_FAILURE":
            return{
                ...state,
                meals: null,
                loading: false,
                loaded: true,
            }
        case "UPDATE_MEALS_FAILURE":
            return{
                ...state,
                meals: null,
                loading: false,
                loaded: true,
            }
        default:
            throw new Error(`Unknown action type ${action.type}`)
    }
}

const MealsProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return(
        <MealsDispatchContext.Provider value={dispatch}>
            <MealsStateContext.Provider value={state}>
                {children}
            </MealsStateContext.Provider>
        </MealsDispatchContext.Provider>
    )
}

export const getMeals = async (dispatch) =>{
    dispatch({
        type: 'REQUEST_GET_MEALS'
    });
    await axios.get('http://localhost:2000/meals/')
    .then(res=>{
        console.log(res.data);
        dispatch({
            type: 'GET_MEALS_SUCCESS',
            payload: {
                meals: res.data
            }
        });
    })
    .catch(err=>{
        dispatch({
            type: 'GET_MEALS_FAILURE'
        });
        console.error(`Error: ${err}`)
    });  
}

export const addMeal = async (dispatch, meal) =>{
    dispatch({
        type: 'REQUEST_ADD_MEALS'
    });
    await axios.post('http://localhost:2000/meals/add', meal)
    .then(res=>{
        dispatch({
            type: 'ADD_MEALS_SUCCESS',
            payload: {
                meals: res.data
            }
        });
    })
    .catch(err=>{
        dispatch({
            type: 'ADD_MEALS_FAILURE'
        });
        console.error(`Error: ${err}`)
    });  
}

export default MealsProvider;