
import { authConstants } from './../actions/constants';
const initialState = {
    token: null,
    user: {
        firstName: '',
        lasstName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return { ...state, authenticating: true }
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticating: false,
                authenticate: true
            }
        case authConstants.LOGIN_FAILURE:
            return { ...state, authenticating: true }
        case authConstants.LOGOUT_REQUEST:
            return { ...initialState }
        default:
            return state
    }
}

export default authReducer