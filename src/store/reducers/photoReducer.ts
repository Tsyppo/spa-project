// photoReducer.ts

import { PhotoAction, PhotoActionType, PhotoState } from '../../types/photo'

const initialState: PhotoState = {
	photos: [],
	searchTerm: '',
}

const photoReducer = (
	state = initialState,
	action: PhotoAction
): PhotoState => {
	switch (action.type) {
		case PhotoActionType.ADD_PHOTO:
			return {
				...state,
				photos: [...state.photos, action.payload],
			}
		case PhotoActionType.REMOVE_PHOTO:
			return {
				...state,
				photos: state.photos.filter(photo => photo.id !== action.payload),
			}
		case PhotoActionType.TOGGLE_LIKE:
			return {
				...state,
				photos: state.photos.map(photo =>
					photo.id === action.payload
						? { ...photo, liked: !photo.liked }
						: photo
				),
			}
		case PhotoActionType.SET_SEARCH_TERM:
			return {
				...state,
				searchTerm: action.payload,
			}
		default:
			return state
	}
}

export default photoReducer
