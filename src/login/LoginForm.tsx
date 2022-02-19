import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { EventType } from './Login';
import  s from './Login.module.css'

const LoginForm: React.FC<InjectedFormProps<EventType>>  = (props) => {
    return (
           <form onSubmit={props.handleSubmit} className={s.items}>
                <h1> Log In</h1>
                <Field  autoFocus name='login' component='input' type='text' placeholder='login'/>
                <Field  name='password' component='input' type='password' placeholder='password'/>
                <button>Log In</button>
           </form>

    );
};
export default reduxForm<EventType>({form: 'login'})(LoginForm);






