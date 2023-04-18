const storeReducer = (state, action) => {
    switch(action.type){
        case "SET_STORES":
            return { stores: action.payload}
        default:
            return state
    }
}
 
export default storeReducer;