
type authType = ReturnType<typeof authAC>
type initialStateType = {
    isAuth: boolean,
    error: null | string
}


const initialState = {
    isAuth: false,
    error: null
}
export const authReducer = (state: initialStateType = initialState, action: authType) => {
    switch (action.type) {
        case 'SET-AUTH': {return {isAuth: action.isAuth, error: action.error}}
        default:return state
    }

};

export const authAC = (isAuth: boolean, error: null | string) => ({type: 'SET-AUTH', isAuth, error})

