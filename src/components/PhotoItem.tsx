import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Photo } from '../types/photo'
import { useActions } from '../hooks/useAction'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { englishLocale, russianLocale } from '../theme/locales'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Cookies from 'js-cookie'

const Wrapper = styled.div`
    width: calc(100% - 20px);
    max-width: 285px;
    height: 450px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    transition: 0.3s ease;
    background-color: rgba(0, 0, 0, 0.5);
    padding-bottom: 10px;
    display: inline-block;
`

const Image = styled(LazyLoadImage)`
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
    color: ${(props) => props.theme.text};
    margin-bottom: 10px;
    margin-left: 10px;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

const Button = styled.button`
    align-items: center;
    padding: 0 10px;
    margin: 5px;
    color: black;
    height: 35px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #858585;
    max-width: 45%;
    overflow: hidden;
    word-wrap: break-word;
    white-space: normal;
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
    margin-left: 5px;
    margin-right: auto;
`

const SavedButton = styled(Button)`
    margin-right: 15px;
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

const PhotoItem: React.FC<Props> = React.memo(({ photo }) => {
    const { language } = useTypedSelector((state) => state.settings)
    const locale = language === 'en' ? englishLocale : russianLocale

    const { toggleLike, removePhoto } = useActions()
    const [liked, setLiked] = useState(photo.liked)

    const handleLikeToggle = useCallback(() => {
        toggleLike(photo.id, liked)
        setLiked(!liked)
    }, [photo.id, liked, toggleLike])

    const handleRemove = useCallback(() => {
        removePhoto(photo.id)
    }, [photo.id, removePhoto])

    const handleSave = () => {
        const savedPhotosString = Cookies.get('savedPhotos')
        const savedPhotos = savedPhotosString
            ? JSON.parse(savedPhotosString)
            : []

        const isPhotoAlreadySaved = savedPhotos.some(
            (savedPhoto: { id: string }) => savedPhoto.id === photo.id,
        )

        if (!isPhotoAlreadySaved) {
            savedPhotos.push(photo)
            Cookies.set('savedPhotos', JSON.stringify(savedPhotos))
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            Cookies.remove('savedPhotos')
        }, 60000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <Wrapper>
            <Image
                src={photo.imageUrl}
                alt={photo.title}
                onClick={handleSave}
                title={locale.clickToSave}
            />
            <Title>
                <StyledLink to={`/photos/${photo.id}`}>
                    {photo.title}
                </StyledLink>
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
                <SavedButton onClick={handleSave}>
                    <TitleButton>{locale.clickToSave}</TitleButton>
                </SavedButton>
            </ButtonContainer>
        </Wrapper>
    )
})

export default PhotoItem
