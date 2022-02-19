import {Dispatch} from 'react';
import {Api, dataWeatherType} from "../api/Api";


const initialState = {
    city: ['Minsk', 'Moscow', 'Sofia', 'Paris', 'Kiev', 'Madrid', 'Sochi', 'Washington'],
    isFetching: false,
    weatherData: null,
    error:null,
}

export type weatherStateType = {
    city: Array<string>,
    isFetching: boolean,
    weatherData: dataWeatherType | null,
    error:null|string

}

type setDataACType = ReturnType<typeof setDataAC>
type isFetchingACType = ReturnType<typeof isFetchingAC>
type setErrorType = ReturnType<typeof setErrorAC>
type actionType = setDataACType | isFetchingACType | setErrorType

export const WeatherReducer = (state: weatherStateType = initialState, action: actionType) => {
    switch (action.type) {
        case "SET-DATA":
            return {...state, weatherData: action.data}
        case "SET-FETCHING":
            return {...state, isFetching: action.value}
        case "SET-ERROR":
            return {...state, error:action.error}
        default:
            return state
    }
};

const setDataAC = (data: dataWeatherType) => ({type: 'SET-DATA', data} as const)
const isFetchingAC = (value: boolean) => ({type: 'SET-FETCHING', value} as const)
const setErrorAC = (error: string) => ({type: 'SET-ERROR', error} as const)


export const getWeatherDataCity = (city:string) => {
    return (dispatch: Dispatch<actionType>) => {
        dispatch(isFetchingAC(true))
        Api.getWeatherCity(city).then((res) => {
            dispatch(setDataAC(res.data))
            dispatch(isFetchingAC(false))
        }).catch(rej=> {
            console.warn(rej)
            dispatch(setErrorAC('Some Error'))
        })
    }
}
export const getWeatherDataMyCity = (lat: number,lon:number) => {
    return (dispatch: Dispatch<actionType>) => {
        dispatch(isFetchingAC(true))
        Api.getWeatherMyCity(lat, lon).then((res) => {
            dispatch(setDataAC(res.data))
            dispatch(isFetchingAC(false))
        }).catch(rej=>{
            console.warn(rej)
            dispatch(setErrorAC('Some Error'))
        })
    }
}

