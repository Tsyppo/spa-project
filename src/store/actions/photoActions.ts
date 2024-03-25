import { Dispatch } from 'react'
import axios from './axiosConfig'
import {
	PhotoAction,
	PhotoActionType,
	Photo,
	FetchPhotosSuccessAction,
} from '../../types/photo'
import { RootState } from '../reducers'

export const fetchPhotosSuccess = (
	photos: Photo[]
): FetchPhotosSuccessAction => ({
	type: PhotoActionType.FETCH_PHOTOS_SUCCESS,
	payload: photos,
})

export const fetchPhotos = () => {
	return async (dispatch: Dispatch<PhotoAction>) => {
		try {
			const response = await axios.get<Photo[]>('/photos')
			dispatch(fetchPhotosSuccess(response.data))
		} catch (error) {
			console.error('Error fetching photos:', error)
		}
	}
}

export const addPhoto = (photo: Photo) => {
	return async (dispatch: Dispatch<PhotoAction>, getState: () => RootState) => {
		try {
			const state = getState()
			const currentMaxId = Math.max(
				...state.photos.photos.map(photo => Number(photo.id))
			)
			const newId = (currentMaxId + 1).toString()
			const photoWithId = {
				...photo,
				id: newId,
				description: photo.description || '',
				liked: photo.liked !== undefined ? photo.liked : false,
			}
			const response = await axios.post<Photo>('/photos', photoWithId)
			dispatch({
				type: PhotoActionType.ADD_PHOTO,
				payload: response.data,
			})
		} catch (error) {
			console.error('Error adding photo:', error)
		}
	}
}

export const removePhoto = (id: string) => {
	return async (dispatch: Dispatch<PhotoAction>) => {
		try {
			await axios.delete(`/photos/${id}`)
			dispatch({
				type: PhotoActionType.REMOVE_PHOTO,
				payload: id,
			})
		} catch (error) {
			console.error('Error removing photo:', error)
		}
	}
}

export const toggleLike = (id: string, liked: boolean) => {
	return async (dispatch: Dispatch<PhotoAction>) => {
		try {
			const response = await axios.patch<Photo>(`/photos/${id}`, {
				liked: !liked,
			})
			dispatch({
				type: PhotoActionType.TOGGLE_LIKE,
				payload: response.data.id,
			})
		} catch (error) {
			console.error('Error toggling like:', error)
		}
	}
}

export const setSearchTerm = (searchTerm: string) => {
	return (dispatch: Dispatch<PhotoAction>) => {
		dispatch({
			type: PhotoActionType.SET_SEARCH_TERM,
			payload: searchTerm,
		})
	}
}
