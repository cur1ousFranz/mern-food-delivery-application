import { createContext, useReducer } from "react";
import orderReducer from "../reducer/orderReducer";

export const OrderContext = createContext()

const OrderContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, {
        orders: []
    })

    return (
        <OrderContext.Provider value={{ ...state, dispatch }}>
            { children }
        </OrderContext.Provider>
    )
}

export default OrderContextProvider