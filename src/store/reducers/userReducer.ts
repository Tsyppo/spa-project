import { UserState, UserAction, UserActionType } from '../../types/user'

const initialState: UserState = {
	currentUser: null,
	loading: false,
	error: null,
	users: [],
}

const userReducer = (state = initialState, action: UserAction): UserState => {
	switch (action.type) {
		case UserActionType.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			}
		case UserActionType.LOGIN_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case UserActionType.LOGIN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				loading: false,
				error: null,
			}
		case UserActionType.LOGIN_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case UserActionType.LOGOUT:
			return {
				...state,
				currentUser: null,
				loading: false,
				error: null,
			}
		default:
			return state
	}
}

export default userReducer
