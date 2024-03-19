import React, { useState } from 'react'
import styled from 'styled-components'
import { Photo } from '../types/photo'
import { useActions } from '../hooks/useAction'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
	width: 300px;
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
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
	background-color: ${({ liked }) => (liked ? '#000000' : '#858585')};
	&:hover {
		background-color: ${({ liked }) => (liked ? '#252525' : '#707070')};
	}
`

const RemoveButton = styled(Button)`
	margin-left: 10px;
`
const StyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;

	&:hover {
		color: inherit;
	}

	&:active {
		color: inherit;
	}
`
interface Props {
	photo: Photo
}

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
			<Title>
				<StyledLink to={`/photos/${photo.id}`}>{photo.title}</StyledLink>
			</Title>
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
