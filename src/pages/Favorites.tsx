import React from 'react'
import Layout from '../components/Layout'
import PhotoList from '../components/PhotoList'

const Favorites: React.FC = () => {
	return (
		<Layout>
			<h1>Favorite Photos</h1>
			<PhotoList isFavoritePage />
		</Layout>
	)
}

export default Favorites
