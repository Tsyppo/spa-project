import React from 'react'
import { Photo } from '../types/photo'
import { useTypedSelector } from '../hooks/useTypedSelector'
import PhotoItem from '../components/PhotoItem'
import Layout from '../components/Layout'

interface Props {
	photo: Photo
}

const Favorites: React.FC<Props> = ({ photo }) => {
	// Assuming you have a favorites list
	const { photos } = useTypedSelector(state => state.photos)

	const favoritePhotos = photos.filter(photo => photo.liked)

	return (
		<Layout>
			<h2>Favorite Photos</h2>
			{favoritePhotos.map(photo => (
				<PhotoItem key={photo.id} photo={photo} />
			))}
		</Layout>
	)
}

export default Favorites
