import React from 'react'
import Layout from '../components/Layout'
import PhotoList from '../components/PhotoList'
import PhotoForm from '../components/PhotoForm'
import { useActions } from '../hooks/useAction'
import { Photo } from '../types/photo'

const Home: React.FC = () => {
	const { addPhoto } = useActions()

	const handleAddPhoto = (photo: Photo) => {
		addPhoto(photo)
	}

	return (
		<Layout>
			<h1>Photo List</h1>
			<PhotoForm onSubmit={handleAddPhoto} />
			<PhotoList />
		</Layout>
	)
}

export default Home
