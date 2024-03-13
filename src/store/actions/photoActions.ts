import { Dispatch } from 'react'
import { PhotoAction, PhotoActionType, Photo } from '../../types/photo'

export const addPhoto = (photo: Photo) => {
	return (dispatch: Dispatch<PhotoAction>) => {
		const photoWithId = { ...photo, id: generateNumericId() }
		dispatch({
			type: PhotoActionType.ADD_PHOTO,
			payload: photoWithId,
		})
	}
}
export const removePhoto = (id: number) => {
	return (dispatch: Dispatch<PhotoAction>) => {
		dispatch({
			type: PhotoActionType.REMOVE_PHOTO,
			payload: id,
		})
	}
}

export const toggleLike = (id: number) => {
	return (dispatch: Dispatch<PhotoAction>) => {
		dispatch({
			type: PhotoActionType.TOGGLE_LIKE,
			payload: id,
		})
	}
}

const generateNumericId = (): number => {
	return Math.floor(Math.random() * 1000000) // Пример генерации id в диапазоне до 1 миллиона
}
