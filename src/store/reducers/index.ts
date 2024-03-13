import { combineReducers } from 'redux'
import photoReducer from './photoReducer'

export const rootReducer = combineReducers({
	photos: photoReducer,
})

export type RootState = ReturnType<typeof rootReducer>
