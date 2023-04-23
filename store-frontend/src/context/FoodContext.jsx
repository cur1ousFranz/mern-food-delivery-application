import { createContext, useReducer } from "react";
import foodReducer from "../reducer/foodReducer";

export const FoodContext = createContext()

const FoodContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(foodReducer, {
        foods: []
    })

    return (
        <FoodContext.Provider value={{ ...state, dispatch }}>
            { children }
        </FoodContext.Provider>
    )
}

export default FoodContextProvider