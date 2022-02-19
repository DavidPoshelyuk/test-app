import React from 'react';
import s from './ComponetError.module.css'

export interface childrenProps  {
    children: React.ReactNode
}

const ComponentError = (props:childrenProps) => {
    return (
        <div className={s.error}>
            {props.children}
        </div>
    );
};

export default ComponentError;