import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import PhotoItem from './PhotoItem'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useAction'
import { Photo } from '../types/photo'
import Cookies from 'js-cookie'

const PhotoListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`

const PhotoItemWrapper = styled.div`
    width: calc(25% - 10px);
    margin-bottom: 10px;
    padding-right: 0px;

    @media (max-width: 1280px) {
        width: calc(33.33% - 10px);
    }

    @media (max-width: 960px) {
        width: calc(50% - 10px);
    }

    @media (max-width: 680px) {
        width: calc(100% - 10px);
    }
    @media (max-width: 340px) {
        margin-right: 0;
    }
`
interface PhotoListProps {
    isFavoritePage?: boolean
    isSavedPage?: boolean
}

const PhotoList: React.FC<PhotoListProps> = React.memo(
    ({ isFavoritePage = false, isSavedPage = false }) => {
        const { photos, searchTerm } = useTypedSelector((state) => ({
            photos: state.photos.photos,
            searchTerm: state.photos.searchTerm,
        }))
        const { fetchPhotos } = useActions()
        const savedPhotosString = Cookies.get('savedPhotos')
        const savedPhotos = savedPhotosString
            ? JSON.parse(savedPhotosString)
            : []

        useEffect(() => {
            fetchPhotos()
        }, [fetchPhotos])

        const filteredPhotos = useMemo(() => {
            let filtered = photos || []
            if (isFavoritePage) {
                filtered = filtered.filter((photo) => photo.liked)
            }
            if (isSavedPage) {
                filtered = savedPhotos
            }
            if (!photos) {
                return []
            }
            return filtered.filter((photo) =>
                photo.title.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }, [photos, isFavoritePage, isSavedPage, searchTerm])

        if (!photos) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <PhotoListContainer>
                    {filteredPhotos.map((photo) => (
                        <PhotoItemWrapper key={photo.id}>
                            <PhotoItem photo={photo} />
                        </PhotoItemWrapper>
                    ))}
                </PhotoListContainer>
            </div>
        )
    },
)

export default PhotoList
