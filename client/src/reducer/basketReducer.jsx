const basketReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BASKET':
            return {
                basket: action.payload
            }
        case 'ADD_TO_BASKET':
            return {
                basket: [...state.basket, action.payload]
            }
        case 'REMOVE_TO_BASKET':
            return {
                basket: state.basket.filter((food) => food.uuid !== action.payload.uuid)
            }
        case 'SET_FOOD_QUANTITY':
            return {
                basket: state.basket.filter(food => {
                    if (food.uuid === action.payload.uuid) {
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
