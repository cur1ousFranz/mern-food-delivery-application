const foodReducer = (state, action) => {
    switch(action.type){
        case 'SET_FOODS':
            return { foods: action.payload }
        default:
            return state
    }
    
}

export default foodReducer
 
