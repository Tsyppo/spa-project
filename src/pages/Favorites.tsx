import React from 'react'
import Layout from '../components/Layout'
import PhotoList from '../components/PhotoList'
import styled from 'styled-components'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { englishLocale, russianLocale } from '../theme/locales'

const Title = styled.h1`
	color: ${props => props.theme.text};
`

const Favorites: React.FC = () => {
	const { language } = useTypedSelector(state => state.settings)
	const locale = language === 'en' ? englishLocale : russianLocale

	return (
		<Layout>
			<Title>{locale.fovoritesTitle}</Title>
			<PhotoList isFavoritePage />
		</Layout>
	)
}

export default Favorites
