import React from 'react';
import LoginForm from "./LoginForm";
import s from './Login.module.css'
import {authAC} from "../redux/Auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/Store";
import { reset } from 'redux-form';
import ComponentError from "../utils/ComponentError";

export type EventType = {
    login: string,
    password: string
}

enum authData {
    login = 'test@test.org',
    password = 'password'
}

export const Login = () => {
    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, string | null>(state => state.authReducer.error)

    const onSubmit = (formData: EventType) => {
        if (formData.login === authData.login && formData.password === authData.password) {
            dispatch(authAC(true, null))
        } else {
            dispatch(authAC(false, 'Password or Username is not Correct!'))
        }
        dispatch(reset('login'))
    }
    const offError = () => {
      dispatch(authAC(false,null))
    }
    return (
        <div onClick={offError} className={s.wrapperLogin}>
            {error != null && <ComponentError>{error}</ComponentError>}
            <LoginForm onSubmit={onSubmit}/>
        </div>
    );
};


