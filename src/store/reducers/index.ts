import { combineReducers } from 'redux'
import photoReducer from './photoReducer'
import settingsReducer from './settingsReducer'

export const rootReducer = combineReducers({
	photos: photoReducer,
	settings: settingsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
