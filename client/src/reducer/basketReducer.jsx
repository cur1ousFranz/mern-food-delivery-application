const basketReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BASKET':
            return {
                basket: action.payload
            }
        case 'ADD_TO_BASKET':
            const index = state.basket.findIndex(food => food._id === action.payload._id)

            if(index === -1){
                return {
                    basket: [...state.basket, action.payload]
                }
            }

            return {
                basket: state.basket.map(food => {
                    if(food._id === action.payload._id){
                        return {...food, foodQuantity: food.foodQuantity + action.payload.foodQuantity}
                    }

                    return food
                })
            }

        case 'REMOVE_TO_BASKET':
            return { basket: state.basket.filter((food) => food._id !== action.payload.id) }
        case 'SET_FOOD_QUANTITY':
            return {
                basket: state.basket.filter(food => {
                    if (food._id === action.payload.id) {
                        food.foodQuantity = action.payload.foodQuantity
                    }

                    return food
                })
            }
        default:
            return state
    }
}

export default basketReducer
