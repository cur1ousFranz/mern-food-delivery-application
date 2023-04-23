const foodReducer = (state, action) => {
    switch(action.type) {
        case 'SET_FOODS':
            return {
                foods : [...action.payload]
            }
        case 'ADD_FOOD':
            return {
                foods : [action.payload, ...state.foods]
            }
        default:
            return state
    }
}
 
export default foodReducer;