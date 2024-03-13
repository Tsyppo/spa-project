import React, { useState } from 'react'
import styled from 'styled-components'
import { Photo } from '../types/photo'
import { useActions } from '../hooks/useAction'

interface Props {
	photo: Photo
}

const Wrapper = styled.div`
	width: 300px; /* Примерная ширина ячейки */
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
`

const Title = styled.h3`
	margin: 0;
`

const Image = styled.img`
	width: 100%;
	height: auto;
	margin-bottom: 10px;
`

const ButtonContainer = styled.div`
	display: flex;
`

const Button = styled.button`
	align-items: center;
	padding: 0 20px;
	margin: 0;
	color: black;
	height: 30px;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	background-color: #858585;

	&:hover {
		background-color: #707070;
	}
`

const UnlikeButton = styled(Button)<{ liked: boolean }>`
	color: ${({ liked }) => (liked ? '#ffffff' : '#000000')};
`

const RemoveButton = styled(Button)`
	margin-left: 10px;
`

const PhotoItem: React.FC<Props> = ({ photo }) => {
	const { toggleLike, removePhoto } = useActions()
	const [liked, setLiked] = useState(photo.liked)

	const handleLikeToggle = () => {
		toggleLike(photo.id)
		setLiked(!liked)
	}

	const handleRemove = () => {
		removePhoto(photo.id)
	}

	return (
		<Wrapper>
			<Title>{photo.title}</Title>
			<Image src={photo.imageUrl} alt={photo.title} />
			<ButtonContainer>
				<UnlikeButton liked={liked} onClick={handleLikeToggle}>
					{liked ? <Title>Like</Title> : <Title>Like</Title>}
				</UnlikeButton>
				<RemoveButton onClick={handleRemove}>
					<Title>Remove</Title>
				</RemoveButton>
			</ButtonContainer>
		</Wrapper>
	)
}

export default React.memo(PhotoItem)
