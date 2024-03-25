import React, { useEffect } from 'react'
import styled from 'styled-components'
import PhotoItem from './PhotoItem'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Photo } from '../types/photo'
import { useActions } from '../hooks/useAction'

const PhotoListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
`

const PhotoItemWrapper = styled.div`
	width: calc(25% - 10px);
	margin-bottom: 10px;
`

interface PhotoListProps {
	isFavoritePage?: boolean
}

const PhotoList: React.FC<PhotoListProps> = ({ isFavoritePage = false }) => {
	const { photos, searchTerm } = useTypedSelector(state => ({
		photos: state.photos.photos,
		searchTerm: state.photos.searchTerm,
	}))

	const { fetchPhotos } = useActions()

	useEffect(() => {
		fetchPhotos()
	}, [fetchPhotos])

	let filteredPhotos: Photo[] = photos || []

	if (isFavoritePage) {
		filteredPhotos = filteredPhotos.filter(photo => photo.liked)
	}
	if (!photos) {
		return <div>Loading...</div>
	}

	filteredPhotos = filteredPhotos.filter(photo =>
		photo.title.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div>
			<PhotoListContainer>
				{filteredPhotos.map(photo => (
					<PhotoItemWrapper key={photo.id}>
						<PhotoItem photo={photo} />
					</PhotoItemWrapper>
				))}
			</PhotoListContainer>
		</div>
	)
}

export default React.memo(PhotoList)
