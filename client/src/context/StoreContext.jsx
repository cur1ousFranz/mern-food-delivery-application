import { createContext, useEffect, useReducer } from "react";
import storeReducer from "../reducer/storeReducer";


export const StoreContext = createContext()

const StoreContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(storeReducer, {
        stores: null
    })

    return (
        <StoreContext.Provider value={{ ...state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider

