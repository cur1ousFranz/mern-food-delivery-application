import { createContext, useEffect, useReducer } from "react";
import basketReducer from "../reducer/basketReducer";

export const BasketContext = createContext()

const BasketContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(basketReducer, {
        basket: JSON.parse(localStorage.getItem('basket')) || [],
    })

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(state.basket))

    },[state])

    return (
        <BasketContext.Provider value={{ ...state, dispatch }}>
            { children }
        </BasketContext.Provider>
    )
}

export default BasketContextProvider