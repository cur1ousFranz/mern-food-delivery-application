import { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducer/authReducer";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        store: null
    })

    useEffect(() => {
        const store = JSON.parse(localStorage.getItem('store'))

        if(store) {
            dispatch({ type: 'LOGIN', payload: store})
        }

    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )

}

export default AuthContextProvider