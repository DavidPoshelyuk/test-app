import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import { reducer as reduxFormReducer } from 'redux-form'
import {authReducer} from './Auth-reducer';
import {WeatherReducer} from "./Weather-reducer";


const rootReducer = combineReducers({
    WeatherReducer,
    authReducer,
    form:reduxFormReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;
