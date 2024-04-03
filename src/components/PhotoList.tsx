import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import PhotoItem from './PhotoItem'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useAction'
import Cookies from 'js-cookie'
import { Grid } from 'react-virtualized'

const PhotoListContainer = styled(Grid)`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`

const PhotoItemWrapper = styled.div`
    width: calc(100% - 10px);
    margin-bottom: 40px;
    padding-right: 0px;
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

        useEffect(() => {
            fetchPhotos()
        }, [fetchPhotos])

        const savedPhotosString = Cookies.get('savedPhotos')
        const savedPhotos = savedPhotosString
            ? JSON.parse(savedPhotosString)
            : []

        const [columnCount, setColumnCount] = useState(4)
        const [screenWidth, setScreenWidth] = useState(window.innerWidth)
        let screenHeight = 600

        const handleResize = () => {
            const newScreenWidth = window.innerWidth
            if (newScreenWidth >= 1660) {
                setColumnCount(4)
                setScreenWidth(1400)
            } else if (newScreenWidth >= 1330) {
                setColumnCount(3)
                setScreenWidth(1060)
            } else if (newScreenWidth >= 970) {
                setColumnCount(2)
                setScreenWidth(700)
            } else {
                setColumnCount(1)
                setScreenWidth(303)
            }
        }

        useEffect(() => {
            handleResize()
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }, [])

        const filteredPhotos = useMemo(() => {
            let filtered = photos || []

            if (isFavoritePage) {
                filtered = filtered.filter((photo) => photo.liked)
                screenHeight = 750
            }
            if (isSavedPage) {
                filtered = savedPhotos
                screenHeight = 750
            }
            if (!photos) {
                return []
            }
            return filtered.filter((photo) =>
                photo.title.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }, [photos, isFavoritePage, isSavedPage, searchTerm, savedPhotos])

        if (!photos) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <PhotoListContainer
                    width={screenWidth}
                    height={screenHeight}
                    columnCount={columnCount}
                    columnWidth={350}
                    rowCount={Math.ceil(filteredPhotos.length / columnCount)}
                    rowHeight={500}
                    cellRenderer={({
                        columnIndex,
                        key,
                        rowIndex,
                        style,
                    }: {
                        columnIndex: number
                        key: string
                        rowIndex: number
                        style: React.CSSProperties
                    }) => {
                        const index = rowIndex * columnCount + columnIndex
                        if (index >= filteredPhotos.length) {
                            return null
                        }
                        const photo = filteredPhotos[index]
                        return (
                            <div style={style} key={key}>
                                <PhotoItemWrapper>
                                    <PhotoItem photo={photo} />
                                </PhotoItemWrapper>
                            </div>
                        )
                    }}
                />
            </div>
        )
    },
)

export default PhotoList
