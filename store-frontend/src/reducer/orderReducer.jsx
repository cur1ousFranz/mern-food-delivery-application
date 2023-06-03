const orderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                orders: [...action.payload]
            }
        case 'ADD_ORDER':
            return {
                orders: [action.payload, ...state.orders]
            }
        case 'REMOVE_ORDER':
            return {
                orders: state.orders.filter(order => order._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default orderReducer;
