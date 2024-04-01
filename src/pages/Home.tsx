import React, { Suspense } from 'react'
import Layout from '../components/Layout'
import PhotoList from '../components/PhotoList'
import { useActions } from '../hooks/useAction'
import { Photo } from '../types/photo'
import styled from 'styled-components'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { englishLocale, russianLocale } from '../theme/locales'

const Title = styled.h1`
	color: ${props => props.theme.text};
`
const LazyPhotoForm = React.lazy(() => import('../components/PhotoForm'))

const Home: React.FC = () => {
	const { language } = useTypedSelector(state => state.settings)
	const locale = language === 'en' ? englishLocale : russianLocale
	const { addPhoto } = useActions()

	const handleAddPhoto = (photo: Photo) => {
		addPhoto(photo)
	}

	return (
		<Layout>
			<Title>{locale.homeTitle}</Title>
			<Suspense fallback={<div>Loading...</div>}>
				<LazyPhotoForm onSubmit={handleAddPhoto} />
			</Suspense>
			<PhotoList />
		</Layout>
	)
}

export default Home
