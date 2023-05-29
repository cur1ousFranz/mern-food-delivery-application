const orderReducer = (state, action) => {
    switch(action.type) {
        case 'SET_ORDERS':
            return {
                orders : [...action.payload]
            }
        case 'ADD_ORDER':
            return {
                orders : [action.payload, ...state.orders]
            }
        default:
            return state
    }
}
 
export default orderReducer;