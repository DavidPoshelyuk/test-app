import React, {ChangeEvent, useEffect} from 'react';
import s from './Weather.module.css'
import preloader from '../utils/preloader/b4a18bd01aef56149e6cf82e3e9b35b6.gif'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/Store";
import {authAC} from "../redux/Auth-reducer";
import {useNavigate} from "react-router-dom";
import {getWeatherDataCity, getWeatherDataMyCity, weatherStateType} from "../redux/Weather-reducer";
import {getPosition, positionType} from "../utils/Geo";
import {dataWeatherType} from "../api/Api";
import ComponentError from "../utils/ComponentError";

const KELVIN = 273.15

const Weather = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.authReducer.isAuth)
    const state = useSelector<AppRootStateType, weatherStateType>(state => state.WeatherReducer)
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        callback(e.currentTarget.value)
    }
    const callback = (city?: string) => {
        if (!city) {
            getPosition((e: positionType) => e !== null
                ?
                dispatch(getWeatherDataMyCity(e.latitude, e.longitude))
                :
                dispatch(getWeatherDataCity('Minsk')))
        } else {
            dispatch(getWeatherDataCity(city))
        }
    }
    const clickOut = () => {
        dispatch(authAC(false, null))
    }
    useEffect(() => {
        if (!isAuth) {
            return navigate("/login");
        }
        callback()
    }, [isAuth]);

    let isFetching = state.isFetching
    let data: dataWeatherType | null = state.weatherData
    if (!data) {return null}
    return (
        <>
            {state.error !== null && <ComponentError>{state.error}</ComponentError>}
            <div className={s.wrapperWeather}>
                <div className={s.wrapperSelect}>
                    <div className={s.selectItems}>
                        <select disabled={isFetching} onChange={onChange}>
                            {state.city.map((m: string, index) => <option key={index}>{m}</option>)}
                        </select>
                        <button  disabled={isFetching} onClick={() => callback()}>Погода в моем городе</button>
                    </div>
                    <button style={{borderRadius: '8px'}} onClick={clickOut}>Go Out</button>
                </div>
                <div className={s.wrapperContent}>
                    <div className={s.contentItems}>
                        {isFetching
                            ?
                            <img className={s.preloader} src={preloader}/>
                            :
                            <>
                                <h2>{data.name} <span>{Math.round(data.main.temp-KELVIN)} &#8451; &#9729; </span></h2>
                                <span>Давление {data.main.pressure} мм рт. ст.</span>
                                <span>Влажность {data.main.humidity} %</span>
                                <span>Ветер {data.wind.speed} м/с</span>
                                <span>Облачность {data.clouds.all} %</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Weather;