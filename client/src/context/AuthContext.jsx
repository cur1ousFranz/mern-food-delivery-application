import { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducer/authReducer";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user) {
            dispatch({ type: 'LOGIN', payload: user})
        }

    }, [])

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider 
