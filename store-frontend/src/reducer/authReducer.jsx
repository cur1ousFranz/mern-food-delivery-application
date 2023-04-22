const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                store: action.payload
            }
        case 'LOGOUT':
            return {
                store: null
            }
        default:
            return state
    }
}

export default authReducer