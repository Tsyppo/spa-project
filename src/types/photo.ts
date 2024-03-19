export interface Photo {
	id: number
	title: string
	description: string
	imageUrl: string
	liked: boolean
}

export interface PhotoState {
	photos: Photo[]
	searchTerm: string
}

export enum PhotoActionType {
	ADD_PHOTO = 'ADD_PHOTO',
	REMOVE_PHOTO = 'REMOVE_PHOTO',
	TOGGLE_LIKE = 'TOGGLE_LIKE',
	SET_SEARCH_TERM = 'SET_SEARCH_TERM',
}

export interface AddPhotoAction {
	type: PhotoActionType.ADD_PHOTO
	payload: Photo
}

export interface RemovePhotoAction {
	type: PhotoActionType.REMOVE_PHOTO
	payload: number
}

export interface ToggleLikeAction {
	type: PhotoActionType.TOGGLE_LIKE
	payload: number
}
export interface SetSearchTermAction {
	type: PhotoActionType.SET_SEARCH_TERM
	payload: string
}
export type PhotoAction =
	| AddPhotoAction
	| RemovePhotoAction
	| ToggleLikeAction
	| SetSearchTermAction
