import React from 'react'
import Layout from '../components/Layout'
import PhotoList from '../components/PhotoList'
import PhotoForm from '../components/PhotoForm'
import { useActions } from '../hooks/useAction'
import { Photo } from '../types/photo'
import styled from 'styled-components'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { englishLocale, russianLocale } from '../theme/locales'

const Title = styled.h1`
	color: ${props => props.theme.text};
`

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
			<PhotoForm onSubmit={handleAddPhoto} />
			<PhotoList />
		</Layout>
	)
}

export default Home
