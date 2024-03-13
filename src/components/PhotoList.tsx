import React, { useState } from 'react'
import styled from 'styled-components'
import PhotoItem from './PhotoItem'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Input = styled.input`
	flex: 1;
	padding: 8px;
	margin-right: 10px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
`

const PhotoListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
`

const PhotoItemWrapper = styled.div`
	width: calc(25% - 10px);
	margin-bottom: 10px;
`

const PhotoList: React.FC = () => {
	const { photos } = useTypedSelector(state => state.photos)
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const filteredPhotos = photos.filter(photo =>
		photo.title.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div>
			<Input
				type='text'
				placeholder='Search by title...'
				value={searchTerm}
				onChange={handleSearch}
			/>
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
