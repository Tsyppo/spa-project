import React, { useState } from 'react'
import styled from 'styled-components'
import { Photo } from '../types/photo'
import { useActions } from '../hooks/useAction'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { englishLocale, russianLocale } from '../theme/locales'

const Wrapper = styled.div`
	width: 300px;
	height: 400px;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
	transition: 0.3s ease;
	background-color: rgba(0, 0, 0, 0.5);
	padding-bottom: 10px;
`

const Image = styled.img`
	width: 100%;
	height: 80%;
	margin-bottom: 10px;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
	box-shadow: 0 2px 4px rgba(41, 39, 39, 0.1);
	object-fit: cover;
`
const TitleButton = styled.h3`
	margin: 0;
`

const Title = styled(TitleButton)`
	color: white;
	margin-bottom: 10px;
	margin-left: 10px;
`

const ButtonContainer = styled.div`
	display: flex;
`

const Button = styled.button`
	align-items: center;
	padding: 0 20px;
	margin: 0;
	margin-left: 10px;
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
	const { language } = useTypedSelector(state => state.settings)
	const locale = language === 'en' ? englishLocale : russianLocale

	const { toggleLike, removePhoto } = useActions()
	const [liked, setLiked] = useState(photo.liked)

	const handleLikeToggle = () => {
		toggleLike(photo.id, liked)
		setLiked(!liked)
	}

	const handleRemove = () => {
		removePhoto(photo.id)
	}

	return (
		<Wrapper>
			<Image src={photo.imageUrl} alt={photo.title} />
			<Title>
				<StyledLink to={`/photos/${photo.id}`}>{photo.title}</StyledLink>
			</Title>
			<ButtonContainer>
				<UnlikeButton liked={liked} onClick={handleLikeToggle}>
					{liked ? (
						<TitleButton>{locale.buttonLikePhoto}</TitleButton>
					) : (
						<TitleButton>{locale.buttonLikePhoto}</TitleButton>
					)}
				</UnlikeButton>
				<RemoveButton onClick={handleRemove}>
					<TitleButton>{locale.buttonRemovePhoto}</TitleButton>
				</RemoveButton>
			</ButtonContainer>
		</Wrapper>
	)
}

export default React.memo(PhotoItem)
