const basketReducer = (state, action) => {
    switch(action.type) {
        case 'SET_BASKET':
            return { 
                basket: action.payload
            }
        case 'ADD_TO_BASKET':
            return { 
                basket: [...state.basket, action.payload]
            }
        case 'REMOVE_TO_BASKET':
            return { basket: state.basket.filter((food) => food._id !== action.payload.id)}
        case 'SET_FOOD_COUNT':

            return { 
                basket : state.basket.filter(food => {
                    if(food._id === action.payload.id){
                        food.foodCount = action.payload.foodCount
                    }

                    return food
                })
            }
        default:
            return state
    }
}

export default basketReducer
 