const initial = {
    user: {},
    loggedIn: false,
    loading: false
}

export default (state = initial, action) => {
    switch (action.type) {
        case 'LOGIN_USER_PENDING':
            return {
                ...state,
                loading: true
            }
        case 'LOGIN_USER_FULFILLED':
            return {
                ...state,
                loading: false,
                loggedIn: true,
                user: action.payload
            }
        case 'LOGIN_USER_REJECTED':
            return {
                ...state,
                loading: false
            }
        case 'LOGOUT_USER_PENDING':
            return {
                ...state,
                loading: true
            }
        case 'LOGOUT_USER_FULFILLED':
            return {
                ...state,
                loading: false,
                loggedIn: false,
                user: {}
            }
        case 'LOGOUT_USER_REJECTED':
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
