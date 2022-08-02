const Reducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            }
        case "LOGIN_SUCCESS":
            localStorage.setItem("userData",JSON.stringify(action.payload))
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }   
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload
            }   
        case "FOLLOW":
            let tempUser = {
                ...state.user,
                following:[...state.user.following, action.payload]
            }
            localStorage.setItem("userData",JSON.stringify(tempUser))
            return{
                ...state,
                user: tempUser
            }       
        case "UNFOLLOW":
            let temUser = {
                ...state.user,
                following: state.user.following.filter((f) => f!==action.payload)
            }
            localStorage.setItem("userData",JSON.stringify(temUser))
            return{
                ...state,
                user: temUser
            }              
        default:
            return state    
    }
}

export default Reducer