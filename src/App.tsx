import React, { useEffect } from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Weather from "./ weather/Weather";
import { Login } from './login/Login';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/Store";
import { useNavigate } from "react-router-dom";


function App() {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.authReducer.isAuth)

    let navigate = useNavigate();
    useEffect(() => {
        if (isAuth){
            return navigate("/weather");
        }
        },[isAuth]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path='weather' element={<Weather/>}/>
                <Route path='login' element={<Login/>}/>
            </Routes>
        </div>

    );
}

export default App;
